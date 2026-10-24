"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-colors duration-150";

const sizes = {
  sm: "min-h-9 px-4 text-[13px]",
  md: "px-5 text-[15px]",
  lg: "min-h-12 px-6 text-[16px]",
} as const;

export const buttonVariants = {
  /** Solid royal-blue pill with a subtle gradient — the primary action. */
  primary:
    "bg-[linear-gradient(180deg,#1173DE_0%,#075FCB_55%,#054A9C_100%)] text-white shadow-[0_4px_16px_rgba(7,95,203,0.35)] hover:brightness-110",
  /** Bright blue — primary action on deep navy surfaces. */
  bright:
    "bg-[linear-gradient(180deg,#4FBCF8_0%,#27A9F5_55%,#1E93DD_100%)] text-navy shadow-[0_4px_16px_rgba(39,169,245,0.35)] hover:brightness-110",
  /** Filled soft — quiet primary on grouped backgrounds. */
  filled:
    "bg-charcoal text-white hover:bg-navy dark:bg-white dark:text-charcoal dark:hover:bg-silver",
  /** Light outline — secondary action on navy surfaces. */
  outlineLight:
    "border-[0.5px] border-white/35 text-white hover:border-white/70 hover:bg-white/10",
  /** Dark outline — secondary action on light surfaces. */
  outlineDark:
    "border-[0.5px] border-navy/25 text-charcoal hover:border-navy/60 hover:bg-white dark:border-white/25 dark:text-white dark:hover:bg-white/10",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof sizes;

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
) {
  return cn(base, sizes[size], buttonVariants[variant], className);
}

const springRelease = { type: "spring", stiffness: 600, damping: 32 } as const;

/**
 * DOM handlers that framer-motion overrides with its own signatures — omit
 * them so the spread types check cleanly.
 */
type MotionConflicting =
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDragStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragOver"
  | "onDrop"
  | "onPointerDown"
  | "onPointerUp"
  | "onPointerCancel"
  | "onPointerEnter"
  | "onPointerLeave"
  | "onPointerMove"
  | "style"
  | "ref"
  | "children";

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflicting> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
};

const MotionLink = motion.create(Link);

export function ButtonLink({ href, variant, size, className, ...props }: ButtonLinkProps) {
  return (
    <MotionLink
      href={href}
      className={buttonClasses(variant, size, className)}
      whileTap={{ scale: 0.97 }}
      transition={springRelease}
      {...props}
    />
  );
}

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflicting> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
};

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return (
    <motion.button
      type={type}
      className={buttonClasses(variant, size, className)}
      whileTap={{ scale: 0.97 }}
      transition={springRelease}
      {...props}
    />
  );
}
