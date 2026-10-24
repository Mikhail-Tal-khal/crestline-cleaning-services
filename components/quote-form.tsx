"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitQuoteRequest, type FormActionResult } from "@/app/actions";
import { services, type ServiceId } from "@/lib/services";
import { mattressSizes, type MattressSizeId } from "@/lib/pricing";
import { photoLimits, videoLimits } from "@/lib/validation";
import { cn } from "@/lib/cn";
import Stepper from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import BottomSheet from "@/components/ui/bottom-sheet";
import {
  DateField,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/field";
import FormOutcome from "@/components/form-outcome";
import {
  AlertIcon,
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
  ServiceIcon,
  UploadIcon,
  VideoIcon,
} from "@/components/icons";

type StepId = 0 | 1 | 2 | 3 | 4;

const STEPS: { title: string; blurb: string }[] = [
  { title: "Your details", blurb: "So we know who to reply to." },
  { title: "Services", blurb: "What needs cleaning?" },
  { title: "Scope", blurb: "Sizes and details for an accurate price." },
  { title: "Evidence & notes", blurb: "Photos help us quote right." },
  { title: "Review", blurb: "One last look before sending." },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  area: string;
  locationPin: string;
  serviceIds: string[];
  sofaSeats: number;
  mattresses: Record<MattressSizeId, number>;
  carpetLength: string;
  carpetWidth: string;
  bedrooms: number;
  cleaningType: "none" | "standard" | "deep";
  commercialArea: string;
  propertyType: string;
  frequency: "one-time" | "recurring";
  waterAvailability: "yes" | "unsure";
  electricityAvailability: "yes" | "unsure";
  preferredDate: string;
  conditionNotes: string;
  accessConsiderations: string;
  fabricDetails: string;
};

type Seed = {
  serviceIds: string[];
  sofaSeats: number;
  mattresses: Record<MattressSizeId, number>;
  carpetLength: number;
  carpetWidth: number;
  bedrooms: number;
  cleaningType: "none" | "standard" | "deep";
};

const initialState = (seed?: Seed): FormState => ({
  name: "",
  email: "",
  phone: "",
  contactMethod: "email",
  area: "",
  locationPin: "",
  serviceIds: seed?.serviceIds ?? [],
  sofaSeats: seed?.sofaSeats ?? 0,
  mattresses: seed?.mattresses ?? { single: 0, "4x6": 0, "5x6": 0, "6x6": 0 },
  carpetLength: seed?.carpetLength ? String(seed.carpetLength) : "",
  carpetWidth: seed?.carpetWidth ? String(seed.carpetWidth) : "",
  bedrooms: seed?.bedrooms ?? 0,
  cleaningType: seed?.cleaningType ?? "none",
  commercialArea: "",
  propertyType: "house",
  frequency: "one-time",
  waterAvailability: "unsure",
  electricityAvailability: "unsure",
  preferredDate: "",
  conditionNotes: "",
  accessConsiderations: "",
  fabricDetails: "",
});

const serviceOptions: { id: string; name: string; short: string }[] = [
  ...services.map((s) => ({ id: s.id, name: s.name, short: s.short })),
  { id: "other", name: "Other", short: "Something else — tell us in the notes." },
];

const HOUSE_SERVICES = ["standard-house", "deep-house"];
const AREA_SERVICES = ["office-commercial", "move-in-out", "airbnb", "post-construction"];

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

const pushVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 72 : -72, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -72 : 72, opacity: 0 }),
};

export default function QuoteForm({ seed }: { seed?: Seed }) {
  const [step, setStep] = useState<StepId>(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormState>(() => initialState(seed));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [summaryShown, setSummaryShown] = useState(false);
  const [pending, setPending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [result, setResult] = useState<FormActionResult | null>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const has = (id: string) => form.serviceIds.includes(id);
  const wantsHouse = HOUSE_SERVICES.some(has);
  const wantsArea = AREA_SERVICES.some(has);

  /* --- Validation ---------------------------------------------------------- */

  const validateField = (key: string): string | undefined => {
    switch (key) {
      case "name":
        return form.name.trim().length >= 2 ? undefined : "Please tell us your name.";
      case "email": {
        if (!form.email.trim()) return "We'll need your email to send the quote.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
          return "That email looks a little off — mind checking it?";
        return undefined;
      }
      case "phone": {
        if (!form.phone.trim() && form.contactMethod !== "email")
          return "Add a phone number, or choose email instead.";
        if (form.phone.trim() && !/^\+?[0-9()\-\s]{7,20}$/.test(form.phone.trim()))
          return "That phone number looks off — mind checking it?";
        return undefined;
      }
      case "locationPin": {
        if (!form.locationPin.trim()) return undefined;
        try {
          const url = new URL(form.locationPin.trim());
          if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error();
          return undefined;
        } catch {
          return "That link doesn't look right — it should start with http:// or https://.";
        }
      }
      case "services":
        return form.serviceIds.length > 0
          ? undefined
          : "Choose at least one service so we know where to start.";
      case "sofaSeats":
        return has("sofa") && form.sofaSeats < 1
          ? "How many seats should we clean?"
          : undefined;
      case "mattresses":
        return has("mattress") && mattressSizes.every((size) => form.mattresses[size.id] < 1)
          ? "Add at least one mattress."
          : undefined;
      case "carpet": {
        if (!has("carpet")) return undefined;
        const length = Number.parseFloat(form.carpetLength);
        const width = Number.parseFloat(form.carpetWidth);
        if (!Number.isFinite(length) || length <= 0)
          return "Add the carpet's length in metres.";
        if (!Number.isFinite(width) || width <= 0)
          return "Add the carpet's width in metres.";
        return undefined;
      }
      case "cleaningType":
        return wantsHouse && form.cleaningType === "none"
          ? "Standard or deep — which one is it?"
          : undefined;
      default:
        return undefined;
    }
  };

  const stepFields: Record<StepId, string[]> = {
    0: ["name", "email", "phone", "locationPin"],
    1: ["services"],
    2: ["sofaSeats", "mattresses", "carpet", "cleaningType"],
    3: [],
    4: [],
  };

  const setFieldError = (key: string, message?: string) =>
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[key] = message;
      else delete next[key];
      return next;
    });

  const runFieldValidation = (key: string) => setFieldError(key, validateField(key));

  const focusField = (key: string) => {
    const field = formRef.current?.querySelector<HTMLElement>(`[name="${key}"]`);
    field?.focus();
  };

  const validateStep = (current: StepId): boolean => {
    const fields = stepFields[current];
    const nextErrors: Record<string, string> = {};
    for (const field of fields) {
      const message = validateField(field);
      if (message) nextErrors[field] = message;
    }
    setErrors((prev) => {
      const rest = { ...prev };
      for (const field of fields) delete rest[field];
      return { ...rest, ...nextErrors };
    });
    const ok = Object.keys(nextErrors).length === 0;
    setSummaryShown(!ok);
    return ok;
  };

  const goToStep = (next: StepId, validateCurrent = true) => {
    if (validateCurrent && !validateStep(step)) return;
    setDirection(next > step ? 1 : -1);
    setStep(next);
    setSummaryShown(false);
    window.setTimeout(() => headingRef.current?.focus(), 80);
  };

  /* --- Files --------------------------------------------------------------- */

  const addPhotos = (fileList: FileList | null) => {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    const accepted: File[] = [];
    const problems: string[] = [];
    for (const file of incoming) {
      if (!photoLimits.types.includes(file.type as (typeof photoLimits.types)[number])) {
        problems.push(`"${file.name}" isn't a JPG, PNG or WebP image.`);
      } else if (file.size > photoLimits.maxSizeBytes) {
        problems.push(`"${file.name}" is over ${photoLimits.maxSizeMB} MB.`);
      } else {
        accepted.push(file);
      }
    }
    const merged = [...photos, ...accepted].slice(0, photoLimits.maxCount);
    if (photos.length + accepted.length > photoLimits.maxCount) {
      problems.push(`You can attach up to ${photoLimits.maxCount} photos.`);
    }
    setPhotos(merged);
    setFieldError("files", problems.length > 0 ? problems.join(" ") : undefined);
  };

  const addVideo = (file: File | null) => {
    if (!file) {
      setVideo(null);
      return;
    }
    if (!videoLimits.types.includes(file.type as (typeof videoLimits.types)[number])) {
      setFieldError("files", `"${file.name}" isn't an MP4, MOV or WebM video.`);
      return;
    }
    if (file.size > videoLimits.maxSizeBytes) {
      setFieldError("files", `"${file.name}" is over ${videoLimits.maxSizeMB} MB.`);
      return;
    }
    setFieldError("files", undefined);
    setVideo(file);
  };

  /* --- Submit -------------------------------------------------------------- */

  const buildFormData = (): FormData => {
    const fd = new FormData();
    fd.set("name", form.name);
    fd.set("email", form.email);
    fd.set("phone", form.phone);
    fd.set("contactMethod", form.contactMethod);
    fd.set("area", form.area);
    fd.set("locationPin", form.locationPin);
    fd.set(
      "services",
      form.serviceIds
        .map((id) => serviceOptions.find((option) => option.id === id)?.name ?? id)
        .join(", ")
    );
    fd.set("sofaSeats", String(form.sofaSeats));
    fd.set("mattresses", JSON.stringify(form.mattresses));
    fd.set("carpetLength", form.carpetLength || "0");
    fd.set("carpetWidth", form.carpetWidth || "0");
    fd.set("bedrooms", String(form.bedrooms));
    fd.set("cleaningType", form.cleaningType);
    fd.set("commercialArea", form.commercialArea || "0");
    fd.set("propertyType", form.propertyType);
    fd.set("frequency", form.frequency);
    fd.set("waterAvailability", form.waterAvailability);
    fd.set("electricityAvailability", form.electricityAvailability);
    fd.set("preferredDate", form.preferredDate);
    fd.set("conditionNotes", form.conditionNotes);
    fd.set("accessConsiderations", form.accessConsiderations);
    fd.set("fabricDetails", form.fabricDetails);
    photos.forEach((photo) => fd.append("photos", photo));
    if (video) fd.append("video", video);
    fd.set("startedAt", String(startedAt));
    fd.set("website", "");
    return fd;
  };

  const sendRequest = async () => {
    if (pending) return;
    setPending(true);
    const actionResult = await submitQuoteRequest(buildFormData());
    setPending(false);
    setConfirmOpen(false);
    setResult(actionResult);

    if (actionResult.status === "error" && actionResult.fieldErrors) {
      setErrors(actionResult.fieldErrors);
      for (const s of [0, 1, 2, 3] as StepId[]) {
        const fields = stepFields[s];
        const fileStepHit = s === 3 && actionResult.fieldErrors.files;
        if (fields.some((field) => actionResult.fieldErrors?.[field]) || fileStepHit) {
          setDirection(s < step ? -1 : 1);
          setStep(s);
          setSummaryShown(true);
          break;
        }
      }
    }
    window.setTimeout(() => resultRef.current?.scrollIntoView({ block: "start" }), 80);
  };

  const reset = () => {
    setForm(initialState());
    setPhotos([]);
    setVideo(null);
    setErrors({});
    setDirection(-1);
    setStep(0);
    setResult(null);
    setConfirmOpen(false);
    setStartedAt(Date.now());
  };

  const stepErrorList = useMemo(
    () =>
      stepFields[step]
        .map((field) => ({ key: field, message: errors[field] }))
        .filter((item): item is { key: string; message: string } => Boolean(item.message)),
    [errors, step]
  );

  if (result && result.status !== "error") {
    return (
      <div ref={resultRef}>
        <FormOutcome result={result} onReset={reset} />
      </div>
    );
  }

  return (
    <div ref={resultRef} className="scroll-mt-24">
      {/* Progress */}
      <div>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={5}
          aria-valuenow={step + 1}
          aria-label={`Step ${step + 1} of 5`}
          className="h-1 overflow-hidden rounded-full bg-navy/[0.08] dark:bg-white/[0.1]"
        >
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,#075FCB,#27A9F5)]"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-charcoal dark:text-white">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="text-[13px] text-slate-500 dark:text-silver/80">
            {STEPS[step].blurb}
          </p>
        </div>
      </div>

      <form ref={formRef} onSubmit={(e) => e.preventDefault()} noValidate className="mt-6">
        {/* Spam guards */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Website (leave empty)</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {result?.status === "error" && (
          <div className="mb-8">
            <FormOutcome result={result} />
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={pushVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            {/* Step 1 — Customer details */}
            {step === 0 && (
              <div>
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className="focus:outline-none font-sans text-[22px] font-bold tracking-[-0.02em] text-charcoal dark:text-white"
                >
                  Your details
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <TextField
                    label="Full name"
                    name="name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(value) => update("name", value)}
                    onBlur={() => runFieldValidation("name")}
                    error={errors.name}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(value) => update("email", value)}
                    onBlur={() => runFieldValidation("email")}
                    error={errors.email}
                  />
                  <TextField
                    label="Phone number"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(value) => update("phone", value)}
                    onBlur={() => runFieldValidation("phone")}
                    error={errors.phone}
                    hint="Only needed if you prefer a call, SMS or WhatsApp."
                  />
                  <SelectField
                    label="Preferred contact method"
                    name="contactMethod"
                    value={form.contactMethod}
                    onChange={(value) => update("contactMethod", value)}
                    options={[
                      { value: "email", label: "Email" },
                      { value: "phone-call", label: "Phone call" },
                      { value: "sms", label: "SMS" },
                      { value: "whatsapp", label: "WhatsApp" },
                    ]}
                  />
                  <TextField
                    label="Neighbourhood or area"
                    name="area"
                    value={form.area}
                    onChange={(value) => update("area", value)}
                    hint="Nyali, Bamburi, Tudor — anywhere in Mombasa."
                  />
                  <TextField
                    label="Location pin link"
                    name="locationPin"
                    type="url"
                    inputMode="url"
                    value={form.locationPin}
                    onChange={(value) => update("locationPin", value)}
                    onBlur={() => runFieldValidation("locationPin")}
                    error={errors.locationPin}
                    hint="Optional — a Google Maps pin helps us find you."
                  />
                </div>
              </div>
            )}

            {/* Step 2 — Services */}
            {step === 1 && (
              <div>
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className="focus:outline-none font-sans text-[22px] font-bold tracking-[-0.02em] text-charcoal dark:text-white"
                >
                  What needs cleaning?
                </h2>
                <p id="services-hint" className="mt-2 text-[14px] leading-6 text-slate-600 dark:text-silver/90">
                  Pick everything that applies — you can combine services freely.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {serviceOptions.map((option) => {
                    const selected = has(option.id);
                    return (
                      <Chip
                        key={option.id}
                        selected={selected}
                        ariaLabel={`${option.name}${selected ? ", selected" : ""}`}
                        onClick={() =>
                          update(
                            "serviceIds",
                            selected
                              ? form.serviceIds.filter((id) => id !== option.id)
                              : [...form.serviceIds, option.id]
                          )
                        }
                      >
                        {selected && <CheckIcon className="h-4 w-4" />}
                        {option.id !== "other" && !selected && (
                          <ServiceIcon id={option.id as ServiceId} className="h-4 w-4" />
                        )}
                        {option.name}
                      </Chip>
                    );
                  })}
                </div>
                {errors.services && (
                  <p role="alert" className="field-error">
                    <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{errors.services}</span>
                  </p>
                )}
                <p className="mt-5 rounded-[16px] bg-white p-4 text-[13px] leading-5 text-slate-500 shadow-card dark:bg-white/[0.06] dark:text-silver/80">
                  Not sure what you need? Pick the closest one and describe it in the
                  notes — we&apos;ll figure it out together.
                </p>
              </div>
            )}

            {/* Step 3 — Scope */}
            {step === 2 && (
              <div>
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className="focus:outline-none font-sans text-[22px] font-bold tracking-[-0.02em] text-charcoal dark:text-white"
                >
                  Sizes and details
                </h2>
                <div className="mt-6 space-y-5">
                  {has("sofa") && (
                    <div className="rounded-[22px] bg-white p-5 shadow-card dark:bg-white/[0.06]">
                      <Stepper
                        label="Sofa seats"
                        value={form.sofaSeats}
                        onChange={(value) => {
                          update("sofaSeats", value);
                          if (errors.sofaSeats) runFieldValidation("sofaSeats");
                        }}
                        min={1}
                        max={30}
                        hint="Standard seat equivalents"
                      />
                      {errors.sofaSeats && (
                        <p role="alert" className="field-error">
                          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{errors.sofaSeats}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {has("mattress") && (
                    <div className="rounded-[22px] bg-white p-5 shadow-card dark:bg-white/[0.06]">
                      <div className="grid gap-5 sm:grid-cols-2">
                        {mattressSizes.map((size) => (
                          <Stepper
                            key={size.id}
                            label={size.label}
                            value={form.mattresses[size.id]}
                            onChange={(value) =>
                              update("mattresses", { ...form.mattresses, [size.id]: value })
                            }
                            max={20}
                          />
                        ))}
                      </div>
                      {errors.mattresses && (
                        <p role="alert" className="field-error">
                          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{errors.mattresses}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {has("carpet") && (
                    <div className="rounded-[22px] bg-white p-5 shadow-card dark:bg-white/[0.06]">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <TextField
                          label="Carpet length (m)"
                          name="carpetLength"
                          inputMode="decimal"
                          value={form.carpetLength}
                          onChange={(value) => update("carpetLength", value)}
                          onBlur={() => runFieldValidation("carpet")}
                          error={errors.carpet}
                        />
                        <TextField
                          label="Carpet width (m)"
                          name="carpetWidth"
                          inputMode="decimal"
                          value={form.carpetWidth}
                          onChange={(value) => update("carpetWidth", value)}
                          onBlur={() => runFieldValidation("carpet")}
                          error={errors.carpet}
                        />
                      </div>
                    </div>
                  )}

                  <div className="rounded-[22px] bg-white p-5 shadow-card dark:bg-white/[0.06]">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <SelectField
                        label="Property type"
                        name="propertyType"
                        value={form.propertyType}
                        onChange={(value) => update("propertyType", value)}
                        options={[
                          { value: "house", label: "House" },
                          { value: "apartment", label: "Apartment" },
                          { value: "office", label: "Office" },
                          { value: "commercial", label: "Commercial premises" },
                          { value: "airbnb", label: "Airbnb unit" },
                          { value: "other", label: "Other" },
                        ]}
                      />
                      <div>
                        <span className="field-label" id="quote-frequency-label">
                          How often?
                        </span>
                        <SegmentedControl
                          label="Service frequency"
                          options={[
                            { value: "one-time", label: "One-time" },
                            { value: "recurring", label: "Recurring" },
                          ]}
                          value={form.frequency}
                          onChange={(value) => update("frequency", value)}
                          className="mt-2"
                        />
                      </div>
                      {wantsHouse && (
                        <>
                          <SelectField
                            label="Bedrooms"
                            name="bedrooms"
                            value={String(form.bedrooms)}
                            onChange={(value) => update("bedrooms", Number.parseInt(value, 10))}
                            options={[
                              { value: "1", label: "1 bedroom" },
                              { value: "2", label: "2 bedrooms" },
                              { value: "3", label: "3 bedrooms" },
                              { value: "4", label: "4 bedrooms" },
                              { value: "5", label: "5+ bedrooms or villa" },
                            ]}
                          />
                          <div>
                            <span className="field-label" id="quote-cleaning-type-label">
                              Cleaning type
                              <span className="text-royal dark:text-bright" aria-hidden="true"> *</span>
                            </span>
                            <SegmentedControl
                              label="Cleaning type"
                              options={[
                                { value: "standard", label: "Standard" },
                                { value: "deep", label: "Deep" },
                              ]}
                              value={form.cleaningType === "none" ? "standard" : form.cleaningType}
                              onChange={(value) => {
                                update("cleaningType", value);
                                setFieldError("cleaningType", undefined);
                              }}
                              className="mt-2"
                            />
                            {errors.cleaningType && (
                              <p role="alert" className="field-error">
                                <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>{errors.cleaningType}</span>
                              </p>
                            )}
                          </div>
                        </>
                      )}
                      {wantsArea && (
                        <TextField
                          label="Approximate floor area (m²)"
                          name="commercialArea"
                          inputMode="decimal"
                          value={form.commercialArea}
                          onChange={(value) => update("commercialArea", value)}
                          hint="Optional, but it helps us quote accurately."
                        />
                      )}
                      <DateField
                        label="Preferred service date"
                        name="preferredDate"
                        value={form.preferredDate}
                        onChange={(value) => update("preferredDate", value)}
                        hint="Optional — we confirm the date with you."
                      />
                    </div>
                  </div>

                  <div className="rounded-[22px] bg-white p-5 shadow-card dark:bg-white/[0.06]">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-silver/80">
                      On the day
                    </p>
                    <div className="mt-3 space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[15px] font-medium text-charcoal dark:text-white">
                            Water available on site
                          </p>
                          <p className="text-[13px] text-slate-500 dark:text-silver/80">
                            {form.waterAvailability === "yes"
                              ? "Yes — water is available."
                              : "Not sure yet? We'll confirm during booking."}
                          </p>
                        </div>
                        <Switch
                          label="Water available on site"
                          checked={form.waterAvailability === "yes"}
                          onChange={(on) => update("waterAvailability", on ? "yes" : "unsure")}
                        />
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t-[0.5px] border-navy/[0.06] pt-4 dark:border-white/[0.08]">
                        <div>
                          <p className="text-[15px] font-medium text-charcoal dark:text-white">
                            Electricity available on site
                          </p>
                          <p className="text-[13px] text-slate-500 dark:text-silver/80">
                            {form.electricityAvailability === "yes"
                              ? "Yes — electricity is available."
                              : "Not sure yet? We'll confirm during booking."}
                          </p>
                        </div>
                        <Switch
                          label="Electricity available on site"
                          checked={form.electricityAvailability === "yes"}
                          onChange={(on) =>
                            update("electricityAvailability", on ? "yes" : "unsure")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 — Evidence and notes */}
            {step === 3 && (
              <div>
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className="focus:outline-none font-sans text-[22px] font-bold tracking-[-0.02em] text-charcoal dark:text-white"
                >
                  Photos and notes
                </h2>
                <div className="mt-6 space-y-5">
                  <div className="rounded-[22px] bg-white p-5 shadow-card dark:bg-white/[0.06]">
                    <label htmlFor="photos" className="text-[15px] font-semibold text-charcoal dark:text-white">
                      Photos
                    </label>
                    <p id="photos-hint" className="field-hint">
                      Up to {photoLimits.maxCount} images · JPG, PNG or WebP · max{" "}
                      {photoLimits.maxSizeMB} MB each. A few clear photos help us quote
                      right the first time.
                    </p>
                    <input
                      id="photos"
                      type="file"
                      multiple
                      accept={photoLimits.accept}
                      onChange={(event) => addPhotos(event.target.files)}
                      aria-describedby="photos-hint"
                      className="mt-3 block w-full cursor-pointer text-sm text-slate-600 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-royal/10 file:px-4 file:py-2.5 file:font-sans file:text-sm file:font-semibold file:text-royal hover:file:bg-royal/20 dark:text-silver dark:file:bg-bright/15 dark:file:text-bright"
                    />
                    {photos.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2.5">
                        {photos.map((photo, index) => (
                          <motion.li
                            key={`${photo.name}-${index}`}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-2.5 rounded-full bg-soft px-3.5 py-2 dark:bg-white/[0.08]"
                          >
                            <UploadIcon className="h-4 w-4 text-royal dark:text-bright" />
                            <span className="max-w-40 truncate text-[13px] font-medium text-charcoal dark:text-white">
                              {photo.name}
                            </span>
                            <span className="text-xs tabular-nums text-slate-500 dark:text-silver/70">
                              {formatBytes(photo.size)}
                            </span>
                            <button
                              type="button"
                              onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== index))}
                              aria-label={`Remove ${photo.name}`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors duration-150 hover:bg-navy/5 hover:text-charcoal dark:hover:bg-white/10 dark:hover:text-white"
                            >
                              <CloseIcon className="h-4 w-4" />
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="rounded-[22px] bg-white p-5 shadow-card dark:bg-white/[0.06]">
                    <label htmlFor="video" className="text-[15px] font-semibold text-charcoal dark:text-white">
                      Short video
                    </label>
                    <p id="video-hint" className="field-hint">
                      One video · MP4, MOV or WebM · max {videoLimits.maxSizeMB} MB.
                    </p>
                    <input
                      id="video"
                      type="file"
                      accept={videoLimits.accept}
                      onChange={(event) => addVideo(event.target.files?.[0] ?? null)}
                      aria-describedby="video-hint"
                      className="mt-3 block w-full cursor-pointer text-sm text-slate-600 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-royal/10 file:px-4 file:py-2.5 file:font-sans file:text-sm file:font-semibold file:text-royal hover:file:bg-royal/20 dark:text-silver dark:file:bg-bright/15 dark:file:text-bright"
                    />
                    {video && (
                      <motion.p
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 flex items-center gap-2.5 rounded-full bg-soft px-3.5 py-2 text-[13px] font-medium text-charcoal dark:bg-white/[0.08] dark:text-white"
                      >
                        <VideoIcon className="h-4 w-4 text-royal dark:text-bright" />
                        <span className="max-w-40 truncate">{video.name}</span>
                        <span className="text-xs tabular-nums text-slate-500 dark:text-silver/70">
                          {formatBytes(video.size)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setVideo(null)}
                          aria-label={`Remove ${video.name}`}
                          className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors duration-150 hover:bg-navy/5 hover:text-charcoal dark:hover:bg-white/10 dark:hover:text-white"
                        >
                          <CloseIcon className="h-4 w-4" />
                        </button>
                      </motion.p>
                    )}
                    {errors.files && (
                      <p role="alert" className="field-error">
                        <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{errors.files}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid gap-5">
                    <TextAreaField
                      label="Anything we should know about the condition?"
                      name="conditionNotes"
                      value={form.conditionNotes}
                      onChange={(value) => update("conditionNotes", value)}
                      hint="Heavy soiling, stains, pets, when it was last cleaned — that kind of thing."
                    />
                    <TextAreaField
                      label="Access details"
                      name="accessConsiderations"
                      value={form.accessConsiderations}
                      onChange={(value) => update("accessConsiderations", value)}
                      hint="Lift or stairs, parking, security gates, which floor."
                    />
                    <TextAreaField
                      label="Special fabrics or surfaces"
                      name="fabricDetails"
                      value={form.fabricDetails}
                      onChange={(value) => update("fabricDetails", value)}
                      hint="Delicate fabric, leather, suede, oversized pieces — anything unusual."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 — Review */}
            {step === 4 && (
              <div>
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className="focus:outline-none font-sans text-[22px] font-bold tracking-[-0.02em] text-charcoal dark:text-white"
                >
                  One last look
                </h2>
                <ReviewSummary form={form} photos={photos} video={video} onEdit={(s) => goToStep(s, false)} />
                <p className="mt-6 rounded-[16px] bg-white p-4 text-[13px] leading-6 text-slate-600 shadow-card dark:bg-white/[0.06] dark:text-silver/90">
                  Your details are only used to prepare your quotation — the{" "}
                  <a href="/privacy" className="font-medium text-royal underline underline-offset-4 dark:text-bright">
                    privacy notice
                  </a>{" "}
                  explains exactly how. Sending this doesn&apos;t lock in a booking yet.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Error summary for the current step */}
        {summaryShown && stepErrorList.length > 0 && (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="group"
            aria-labelledby="error-summary-title"
            className="mt-8 rounded-[20px] border-[0.5px] border-red-500/30 bg-red-50/70 p-5 focus:outline-none dark:bg-red-500/10"
          >
            <h3 id="error-summary-title" className="font-sans text-sm font-bold text-charcoal dark:text-white">
              {stepErrorList.length === 1
                ? "One small thing to fix"
                : `${stepErrorList.length} small things to fix`}{" "}
              before we continue
            </h3>
            <ul className="mt-2.5 space-y-1.5">
              {stepErrorList.map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => focusField(item.key)}
                    className="rounded text-left text-sm text-red-600 underline underline-offset-2 dark:text-red-400"
                  >
                    {item.message}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Step navigation */}
        <div className="mt-10 flex flex-col-reverse gap-3 border-t-[0.5px] border-navy/[0.08] pt-7 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08]">
          {step > 0 ? (
            <Button
              variant="outlineDark"
              onClick={() => goToStep((step - 1) as StepId, false)}
            >
              Back
            </Button>
          ) : (
            <span aria-hidden="true" />
          )}

          {step < 4 ? (
            <Button onClick={() => goToStep((step + 1) as StepId)}>
              Continue
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => setConfirmOpen(true)} className="min-w-52">
              Send request
            </Button>
          )}
        </div>
      </form>

      {/* Action-sheet confirmation */}
      <BottomSheet
        open={confirmOpen}
        onClose={() => !pending && setConfirmOpen(false)}
        title="Send this request?"
      >
        <p className="px-1 text-center text-[14px] leading-6 text-slate-600 dark:text-silver/90">
          You can still edit anything before it goes. Crestline will reply using{" "}
          {form.contactMethod === "email" ? "email" : "your preferred contact method"}.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={sendRequest} disabled={pending} className="w-full">
            {pending ? "Sending…" : "Yes, send it"}
          </Button>
          <Button
            variant="outlineDark"
            onClick={() => setConfirmOpen(false)}
            disabled={pending}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </BottomSheet>

      <noscript>
        <p className="mt-6 rounded-[16px] bg-soft p-5 text-sm leading-6 text-slate-600 dark:bg-white/[0.06] dark:text-silver/90">
          This form needs JavaScript to run. Without it, please email your request
          directly to{" "}
          <a
            href="mailto:cleaning.services.crestline@gmail.com"
            className="font-medium text-royal underline underline-offset-4 dark:text-bright"
          >
            cleaning.services.crestline@gmail.com
          </a>
          .
        </p>
      </noscript>
    </div>
  );
}

function ReviewSummary({
  form,
  photos,
  video,
  onEdit,
}: {
  form: FormState;
  photos: File[];
  video: File | null;
  onEdit: (step: StepId) => void;
}) {
  const mattressSummary = mattressSizes
    .filter((size) => form.mattresses[size.id] > 0)
    .map((size) => `${form.mattresses[size.id]} × ${size.label}`)
    .join(", ");

  const groups: { step: StepId; title: string; lines: string[] }[] = [
    {
      step: 0,
      title: "Your details",
      lines: [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.phone ? `Phone: ${form.phone}` : "",
        `Preferred contact: ${form.contactMethod}`,
        form.area ? `Neighbourhood or area: ${form.area}` : "",
        form.locationPin ? "Location pin: provided" : "",
      ].filter(Boolean),
    },
    {
      step: 1,
      title: "Services",
      lines: form.serviceIds.map(
        (id) => serviceOptions.find((option) => option.id === id)?.name ?? id
      ),
    },
    {
      step: 2,
      title: "Scope",
      lines: [
        form.sofaSeats > 0 ? `Sofa seats: ${form.sofaSeats}` : "",
        mattressSummary ? `Mattresses: ${mattressSummary}` : "",
        form.carpetLength && form.carpetWidth
          ? `Carpet: ${form.carpetLength} m × ${form.carpetWidth} m`
          : "",
        form.bedrooms > 0 ? `Bedrooms: ${form.bedrooms}` : "",
        form.cleaningType !== "none"
          ? `Cleaning type: ${form.cleaningType === "deep" ? "Deep" : "Standard"}`
          : "",
        `Property type: ${form.propertyType}`,
        form.commercialArea ? `Approximate floor area: ${form.commercialArea} m²` : "",
        `Frequency: ${form.frequency === "recurring" ? "Recurring" : "One-time"}`,
        `Water on site: ${form.waterAvailability === "yes" ? "Yes" : "To confirm"}`,
        `Electricity on site: ${form.electricityAvailability === "yes" ? "Yes" : "To confirm"}`,
        form.preferredDate ? `Preferred date: ${form.preferredDate}` : "",
      ].filter(Boolean),
    },
    {
      step: 3,
      title: "Photos and notes",
      lines: [
        photos.length > 0 ? `Photos: ${photos.map((p) => p.name).join(", ")}` : "Photos: none",
        video ? `Video: ${video.name}` : "Video: none",
        form.conditionNotes ? `Condition: ${form.conditionNotes}` : "",
        form.accessConsiderations ? `Access: ${form.accessConsiderations}` : "",
        form.fabricDetails ? `Fabrics: ${form.fabricDetails}` : "",
      ].filter(Boolean),
    },
  ];

  return (
    <div className="mt-6 space-y-4">
      {groups.map((group) => (
        <div key={group.title} className="rounded-[22px] bg-white p-5 shadow-card dark:bg-white/[0.06]">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-charcoal dark:text-white">
              {group.title}
            </h3>
            <Button variant="outlineDark" onClick={() => onEdit(group.step)} className="px-4 py-1.5 min-h-9 text-[13px]">
              Edit
            </Button>
          </div>
          <ul className="mt-3.5 space-y-1.5">
            {group.lines.map((line, index) => (
              <li key={index} className="text-[14px] leading-6 text-slate-600 dark:text-silver/90">
                {line}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
