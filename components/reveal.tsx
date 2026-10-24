"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Gentle scroll reveal (fade + small rise, once). With the global
 * MotionConfig, visitors who prefer reduced motion get a simple fade.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
