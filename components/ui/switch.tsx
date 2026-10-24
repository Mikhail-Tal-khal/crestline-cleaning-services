"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * iOS-style toggle switch with a small tick animation on change.
 * Labelled via aria-label; the visual label sits next to it.
 */
export function Switch({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-[31px] w-[51px] shrink-0 rounded-full transition-colors duration-200",
        checked
          ? "bg-bright"
          : "bg-slate-300 dark:bg-white/[0.18]",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-[2px] top-[2px] h-[27px] w-[27px] rounded-full bg-white shadow-[0_2px_6px_rgba(16,24,40,0.25)]"
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 550, damping: 32 }}
      />
    </button>
  );
}
