"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global motion settings. `reducedMotion="user"` makes every transform and
 * layout animation fall back to simple opacity fades for visitors who prefer
 * reduced motion — the whole site honours the system setting by default.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
