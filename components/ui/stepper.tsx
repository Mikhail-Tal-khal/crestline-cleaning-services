"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { MinusIcon, PlusIcon } from "@/components/icons";

/**
 * iOS-style − / + stepper with 44px touch targets and a spring press.
 */
export default function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = 60,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  hint?: string;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const tap = { scale: 0.9 };
  const release = { type: "spring" as const, stiffness: 600, damping: 30 };

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-[15px] font-medium text-charcoal dark:text-white">
          {label}
        </label>
        {hint && (
          <p id={hintId} className="mt-0.5 text-[13px] leading-5 text-slate-500 dark:text-silver/80">
            {hint}
          </p>
        )}
      </div>
      <div className="inline-flex items-center gap-1 rounded-full bg-soft p-1 dark:bg-white/[0.08]">
        <motion.button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= min}
          whileTap={value > min ? tap : undefined}
          transition={release}
          aria-label={`Decrease ${label}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-charcoal shadow-card transition-colors duration-150 hover:text-royal disabled:opacity-40 disabled:hover:text-charcoal dark:bg-white/[0.14] dark:text-white"
        >
          <MinusIcon className="h-4 w-4" />
        </motion.button>
        <input
          id={id}
          inputMode="numeric"
          pattern="[0-9]*"
          value={String(value)}
          aria-describedby={hint ? hintId : undefined}
          onChange={(event) => {
            const digits = event.target.value.replace(/[^0-9]/g, "");
            onChange(digits === "" ? 0 : clamp(Number.parseInt(digits, 10)));
          }}
          className="w-11 bg-transparent text-center font-sans text-[16px] font-semibold tabular-nums text-charcoal focus:outline-none dark:text-white"
        />
        <motion.button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= max}
          whileTap={value < max ? tap : undefined}
          transition={release}
          aria-label={`Increase ${label}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-charcoal shadow-card transition-colors duration-150 hover:text-royal disabled:opacity-40 disabled:hover:text-charcoal dark:bg-white/[0.14] dark:text-white"
        >
          <PlusIcon className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
