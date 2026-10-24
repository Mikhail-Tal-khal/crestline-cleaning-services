"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FormActionResult } from "@/app/actions";
import { whatsappLink } from "@/components/social-buttons";
import { Button } from "@/components/ui/button";
import { AlertIcon, InfoIcon, SendIcon, WhatsAppGlyph } from "@/components/icons";

/**
 * Post-submission panel shared by all forms.
 * The checkmark draws itself in; "delivered" only appears when the configured
 * email service actually accepted the submission — never as an unverified
 * claim. The warm line under the required wording is presentation only.
 */
export default function FormOutcome({
  result,
  onReset,
  resetLabel = "Send another request",
}: {
  result: FormActionResult;
  onReset?: () => void;
  resetLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const wa = whatsappLink();

  const copySummary = async () => {
    if (!result.summaryText) return;
    try {
      await navigator.clipboard.writeText(result.summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  if (result.status === "delivered") {
    return (
      <div
        role="status"
        className="rounded-[24px] bg-white p-7 text-center shadow-card dark:bg-white/[0.06] sm:p-10"
      >
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-royal/10 dark:bg-bright/15"
        >
          <svg viewBox="0 0 52 52" className="h-9 w-9 text-royal dark:text-bright" aria-hidden="true">
            <motion.circle
              cx="26"
              cy="26"
              r="23"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
              d="M15 27.5l7.5 7.5L37 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.4, ease: "easeOut" }}
            />
          </svg>
        </motion.span>
        <p className="mx-auto mt-5 max-w-md font-sans text-[17px] font-bold leading-snug text-charcoal dark:text-white">
          {result.message}
        </p>
        <p className="mx-auto mt-2.5 max-w-md text-[14px] leading-6 text-slate-600 dark:text-silver/90">
          Thank you for trusting us with your space — we&apos;ll be in touch soon.
        </p>
        {(wa || onReset) && (
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-sans text-[15px] font-semibold text-white transition-colors duration-150 hover:brightness-105"
              >
                <WhatsAppGlyph className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            )}
            {onReset && (
              <Button variant="outlineDark" onClick={onReset}>
                {resetLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }

  if (result.status === "fallback") {
    return (
      <div className="rounded-[24px] bg-white p-7 shadow-card dark:bg-white/[0.06] sm:p-10">
        <p className="flex items-center gap-2.5 font-sans text-[17px] font-bold text-charcoal dark:text-white">
          <InfoIcon className="h-6 w-6 text-royal dark:text-bright" />
          Your request is ready to send
        </p>
        <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-600 dark:text-silver/90">
          {result.message}
        </p>
        <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-600 dark:text-silver/90">
          Your email app will open with the request addressed to{" "}
          <a
            href={`mailto:cleaning.services.crestline@gmail.com`}
            className="font-medium text-royal underline underline-offset-4 dark:text-bright"
          >
            cleaning.services.crestline@gmail.com
          </a>
          . If you selected photos or a video, please attach them to that email.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {result.mailtoHref && (
            <a
              href={result.mailtoHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#1173DE_0%,#075FCB_55%,#054A9C_100%)] px-5 py-2.5 font-sans text-[15px] font-semibold text-white shadow-[0_4px_16px_rgba(7,95,203,0.35)] transition-all duration-150 hover:brightness-110"
            >
              <SendIcon className="h-4 w-4" />
              Open your email app
            </a>
          )}
          {result.summaryText && (
            <Button variant="outlineDark" onClick={copySummary}>
              {copied ? "Summary copied" : "Copy summary"}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="rounded-[24px] border-[0.5px] border-red-500/30 bg-red-50/70 p-7 dark:bg-red-500/10 sm:p-10"
    >
      <p className="flex items-center gap-2.5 font-sans text-[17px] font-bold text-charcoal dark:text-white">
        <AlertIcon className="h-6 w-6 text-red-500" />
        Not sent yet
      </p>
      <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-700 dark:text-silver/90">
        {result.message}
      </p>
      {result.mailtoHref && (
        <p className="mt-5">
          <a
            href={result.mailtoHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border-[0.5px] border-navy/25 px-5 py-2.5 font-sans text-sm font-semibold text-charcoal transition-colors duration-150 hover:bg-white dark:border-white/25 dark:text-white dark:hover:bg-white/10"
          >
            <SendIcon className="h-4 w-4" />
            Send it by email instead
          </a>
        </p>
      )}
    </div>
  );
}
