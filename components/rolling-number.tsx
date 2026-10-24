"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ksh } from "@/lib/format";

/**
 * Rolling KSh counter for the quote calculator. Screen readers get the final
 * value immediately via a visually-hidden span; the animation is decorative.
 */
export default function RollingNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const spring = useSpring(value, { stiffness: 130, damping: 26 });
  const display = useTransform(spring, (v) => ksh(Math.round(v)));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <span className={className}>
      <span className="sr-only">{ksh(value)}</span>
      <motion.span aria-hidden="true" className="tabular-nums">
        {display}
      </motion.span>
    </span>
  );
}
