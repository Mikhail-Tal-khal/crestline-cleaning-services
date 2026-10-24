"use client";

import { useEffect, useRef, useState } from "react";
import { submitEnquiry, type FormActionResult } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { TextAreaField, TextField } from "@/components/ui/field";
import FormOutcome from "@/components/form-outcome";
import { AlertIcon, SendIcon } from "@/components/icons";

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<FormActionResult | null>(null);
  const [startedAt, setStartedAt] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const validateField = (key: string): string | undefined => {
    switch (key) {
      case "name":
        return name.trim().length >= 2 ? undefined : "Please tell us your name.";
      case "email": {
        if (!email.trim()) return "We'll need an email to reply to.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
          return "That email looks a little off — mind checking it?";
        return undefined;
      }
      case "message":
        return message.trim().length >= 10
          ? undefined
          : "A sentence or two is plenty to get us started.";
      default:
        return undefined;
    }
  };

  const runFieldValidation = (key: string) =>
    setErrors((prev) => {
      const next = { ...prev };
      const msg = validateField(key);
      if (msg) next[key] = msg;
      else delete next[key];
      return next;
    });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    for (const key of ["name", "email", "message"]) {
      const msg = validateField(key);
      if (msg) nextErrors[key] = msg;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !formRef.current) {
      window.setTimeout(() => summaryRef.current?.focus(), 40);
      return;
    }

    const formData = new FormData(formRef.current);
    formData.set("startedAt", String(startedAt));
    formData.set("website", "");

    setPending(true);
    const actionResult = await submitEnquiry(formData);
    setPending(false);
    setResult(actionResult);

    if (actionResult.status === "error" && actionResult.fieldErrors) {
      setErrors(actionResult.fieldErrors);
      window.setTimeout(() => summaryRef.current?.focus(), 40);
    }
    window.setTimeout(() => resultRef.current?.scrollIntoView({ block: "start" }), 60);
  };

  if (result && result.status !== "error") {
    return (
      <div ref={resultRef}>
        <FormOutcome
          result={result}
          onReset={() => {
            setResult(null);
            setName("");
            setEmail("");
            setMessage("");
            setErrors({});
            setStartedAt(Date.now());
          }}
          resetLabel="Send another message"
        />
      </div>
    );
  }

  return (
    <div ref={resultRef}>
      <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-5">
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="enquiry-website">Website (leave empty)</label>
          <input
            id="enquiry-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {result?.status === "error" && <FormOutcome result={result} />}

        <TextField
          label="Your name"
          name="name"
          required
          autoComplete="name"
          value={name}
          onChange={setName}
          onBlur={() => runFieldValidation("name")}
          error={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={setEmail}
          onBlur={() => runFieldValidation("email")}
          error={errors.email}
        />
        <TextAreaField
          label="Your message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={setMessage}
          onBlur={() => runFieldValidation("message")}
          error={errors.message}
          hint="For a detailed quote, the quotation form is the better place — you can add sizes and photos there."
        />

        {Object.keys(errors).length > 0 && (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="group"
            aria-labelledby="enquiry-error-title"
            className="rounded-[20px] border-[0.5px] border-red-500/30 bg-red-50/70 p-5 focus:outline-none dark:bg-red-500/10"
          >
            <h3 id="enquiry-error-title" className="font-sans text-sm font-bold text-charcoal dark:text-white">
              Quick check
            </h3>
            <ul className="mt-2.5 space-y-1.5">
              {Object.entries(errors).map(([key, msg]) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() =>
                      formRef.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus()
                    }
                    className="rounded text-left text-sm text-red-600 underline underline-offset-2 dark:text-red-400"
                  >
                    {msg}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="flex items-start gap-2 text-[13px] leading-5 text-slate-500 dark:text-silver/80">
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-royal dark:text-bright" />
            We only use your message to reply.
          </p>
          <Button type="submit" disabled={pending} className="min-w-40">
            {pending ? "Sending…" : "Send message"}
            {!pending && <SendIcon className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
