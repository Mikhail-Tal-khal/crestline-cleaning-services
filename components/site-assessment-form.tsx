"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { submitSiteAssessment, type FormActionResult } from "@/app/actions";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { SegmentedControl } from "@/components/ui/segmented-control";
import BottomSheet from "@/components/ui/bottom-sheet";
import { DateField, SelectField, TextAreaField, TextField } from "@/components/ui/field";
import FormOutcome from "@/components/form-outcome";
import { AlertIcon, CheckIcon } from "@/components/icons";

const serviceOptions = [
  "Office cleaning",
  "Hotel and hospitality cleaning",
  "Airbnb turnover cleaning",
  "Move-in or move-out cleaning",
  "Post-construction cleaning",
  "Recurring scheduled cleaning",
  "General cleaning personnel",
  "On-demand home cleaning",
];

type FormState = {
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  propertyType: string;
  location: string;
  squareMetres: string;
  services: string[];
  frequency: "one-time" | "recurring";
  preferredDate: string;
  notes: string;
};

const initialState: FormState = {
  contactName: "",
  companyName: "",
  email: "",
  phone: "",
  propertyType: "office",
  location: "",
  squareMetres: "",
  services: [],
  frequency: "one-time",
  preferredDate: "",
  notes: "",
};

export default function SiteAssessmentForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [result, setResult] = useState<FormActionResult | null>(null);
  const [startedAt, setStartedAt] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateField = (key: string): string | undefined => {
    switch (key) {
      case "contactName":
        return form.contactName.trim().length >= 2 ? undefined : "Please tell us your name.";
      case "companyName":
        return form.companyName.trim().length >= 2
          ? undefined
          : "Which company or organisation is this for?";
      case "email": {
        if (!form.email.trim()) return "We'll need an email to reply to.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
          return "That email looks a little off — mind checking it?";
        return undefined;
      }
      case "phone":
        if (form.phone.trim() && !/^\+?[0-9()\-\s]{7,20}$/.test(form.phone.trim()))
          return "That phone number looks off — mind checking it?";
        return undefined;
      case "location":
        return form.location.trim().length >= 2
          ? undefined
          : "Where is the property? Even a neighbourhood helps.";
      case "services":
        return form.services.length > 0
          ? undefined
          : "Pick at least one service — we'll confirm the rest together.";
      default:
        return undefined;
    }
  };

  const runFieldValidation = (key: string) =>
    setErrors((prev) => {
      const next = { ...prev };
      const message = validateField(key);
      if (message) next[key] = message;
      else delete next[key];
      return next;
    });

  const validateAll = (): boolean => {
    const keys = ["contactName", "companyName", "email", "phone", "location", "services"];
    const nextErrors: Record<string, string> = {};
    for (const key of keys) {
      const message = validateField(key);
      if (message) nextErrors[key] = message;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const send = async () => {
    if (pending || !formRef.current) return;
    if (!validateAll()) {
      setConfirmOpen(false);
      window.setTimeout(() => summaryRef.current?.focus(), 60);
      return;
    }
    const formData = new FormData(formRef.current);
    formData.set("services", form.services.join(", "));
    formData.set("startedAt", String(startedAt));
    formData.set("website", "");

    setPending(true);
    const actionResult = await submitSiteAssessment(formData);
    setPending(false);
    setConfirmOpen(false);
    setResult(actionResult);

    if (actionResult.status === "error" && actionResult.fieldErrors) {
      setErrors(actionResult.fieldErrors);
      window.setTimeout(() => summaryRef.current?.focus(), 60);
    }
    window.setTimeout(() => resultRef.current?.scrollIntoView({ block: "start" }), 80);
  };

  const errorList = useMemo(() => Object.entries(errors), [errors]);

  if (result && result.status !== "error") {
    return (
      <div ref={resultRef}>
        <FormOutcome
          result={result}
          onReset={() => {
            setResult(null);
            setForm(initialState);
            setErrors({});
            setStartedAt(Date.now());
          }}
        />
      </div>
    );
  }

  return (
    <div ref={resultRef} className="scroll-mt-24">
      <form ref={formRef} onSubmit={(e) => e.preventDefault()} noValidate className="grid gap-5 sm:grid-cols-2">
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="assessment-website">Website (leave empty)</label>
          <input
            id="assessment-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {result?.status === "error" && (
          <div className="sm:col-span-2">
            <FormOutcome result={result} />
          </div>
        )}

        <TextField
          label="Contact name"
          name="contactName"
          required
          autoComplete="name"
          value={form.contactName}
          onChange={(value) => update("contactName", value)}
          onBlur={() => runFieldValidation("contactName")}
          error={errors.contactName}
        />
        <TextField
          label="Company name"
          name="companyName"
          required
          autoComplete="organization"
          value={form.companyName}
          onChange={(value) => update("companyName", value)}
          onBlur={() => runFieldValidation("companyName")}
          error={errors.companyName}
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
          hint="Optional"
        />
        <SelectField
          label="Property type"
          name="propertyType"
          required
          value={form.propertyType}
          onChange={(value) => update("propertyType", value)}
          options={[
            { value: "office", label: "Office" },
            { value: "hotel", label: "Hotel or hospitality property" },
            { value: "airbnb", label: "Airbnb units" },
            { value: "residential-development", label: "Residential development" },
            { value: "property-portfolio", label: "Property portfolio or property managers" },
            { value: "construction", label: "Construction or renovation project" },
            { value: "other", label: "Other" },
          ]}
        />
        <TextField
          label="Location"
          name="location"
          required
          value={form.location}
          onChange={(value) => update("location", value)}
          onBlur={() => runFieldValidation("location")}
          error={errors.location}
          hint="Neighbourhood or area in Mombasa."
        />
        <TextField
          label="Approximate square metres"
          name="squareMetres"
          inputMode="decimal"
          value={form.squareMetres}
          onChange={(value) => update("squareMetres", value)}
          hint="Optional"
        />
        <DateField
          label="Preferred date"
          name="preferredDate"
          value={form.preferredDate}
          onChange={(value) => update("preferredDate", value)}
          hint="Optional — we confirm scheduling with you."
        />

        <fieldset className="sm:col-span-2">
          <legend className="field-label">
            Required services
            <span className="text-royal dark:text-bright" aria-hidden="true"> *</span>
          </legend>
          <p id="assessment-services-hint" className="field-hint">
            Pick everything that applies — the site visit confirms the details.
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {serviceOptions.map((service) => {
              const selected = form.services.includes(service);
              return (
                <Chip
                  key={service}
                  selected={selected}
                  ariaLabel={`${service}${selected ? ", selected" : ""}`}
                  onClick={() => {
                    update(
                      "services",
                      selected
                        ? form.services.filter((item) => item !== service)
                        : [...form.services, service]
                    );
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.services;
                      return next;
                    });
                  }}
                >
                  {selected && <CheckIcon className="h-4 w-4" />}
                  {service}
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
        </fieldset>

        <fieldset className="sm:col-span-2">
          <legend className="field-label">How often?</legend>
          <div className="mt-2 max-w-md">
            <SegmentedControl
              label="Service frequency"
              options={[
                { value: "one-time", label: "One-time" },
                { value: "recurring", label: "Recurring" },
              ]}
              value={form.frequency}
              onChange={(value) => update("frequency", value)}
            />
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <TextAreaField
            label="Anything else we should know?"
            name="notes"
            value={form.notes}
            onChange={(value) => update("notes", value)}
            hint="Access, scheduling, surfaces, reporting needs — whatever helps."
            rows={4}
          />
        </div>

        {errorList.length > 0 && (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="group"
            aria-labelledby="assessment-error-title"
            className={cn(
              "rounded-[20px] border-[0.5px] border-red-500/30 bg-red-50/70 p-5 focus:outline-none sm:col-span-2 dark:bg-red-500/10"
            )}
          >
            <h3 id="assessment-error-title" className="font-sans text-sm font-bold text-charcoal dark:text-white">
              {errorList.length === 1
                ? "One small thing to fix"
                : `${errorList.length} small things to fix`}
            </h3>
            <ul className="mt-2.5 space-y-1.5">
              {errorList.map(([key, message]) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() =>
                      formRef.current
                        ?.querySelector<HTMLElement>(`[name="${key}"]`)
                        ?.focus()
                    }
                    className="rounded text-left text-sm text-red-600 underline underline-offset-2 dark:text-red-400"
                  >
                    {message}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] leading-5 text-slate-500 dark:text-silver/80">
            We read every request and come back to you to discuss scope and timing.
          </p>
          <Button
            onClick={() => {
              if (validateAll()) setConfirmOpen(true);
              else window.setTimeout(() => summaryRef.current?.focus(), 40);
            }}
            disabled={pending}
            className="min-w-56"
          >
            Request site assessment
          </Button>
        </div>
      </form>

      <BottomSheet
        open={confirmOpen}
        onClose={() => !pending && setConfirmOpen(false)}
        title="Send this request?"
      >
        <p className="px-1 text-center text-[14px] leading-6 text-slate-600 dark:text-silver/90">
          We&apos;ll review {form.companyName || "your property"} and get back to you to
          arrange the assessment.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={send} disabled={pending} className="w-full">
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
    </div>
  );
}
