"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Option<T extends string> = { value: T; label: string };

/**
 * iOS-style segmented control. Keyboard-operable as a radiogroup; the active
 * pill slides between segments with a spring.
 */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: ReadonlyArray<Option<T>>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  const groupId = useId();

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "flex rounded-full bg-slate-200/70 p-1 dark:bg-white/[0.08]",
        className
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className="relative min-h-11 flex-1 rounded-full px-3 py-2 text-[14px] font-semibold transition-colors duration-150"
          >
            {active && (
              <motion.span
                layoutId={groupId}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-white shadow-card dark:bg-white/[0.18]"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <span
              className={cn(
                "relative z-10",
                active
                  ? "text-charcoal dark:text-white"
                  : "text-slate-500 dark:text-silver/80"
              )}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
