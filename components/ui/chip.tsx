"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Pill chip for multi-select choices (quote form services).
 */
export function Chip({
  selected,
  onClick,
  children,
  className,
  ariaLabel,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[14px] font-semibold transition-colors duration-150",
        selected
          ? "border-transparent bg-royal text-white shadow-[0_4px_14px_rgba(7,95,203,0.30)] dark:bg-bright dark:text-navy"
          : "border-navy/15 bg-white text-charcoal hover:border-navy/40 dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:hover:border-white/40",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
