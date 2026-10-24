"use client";

import { useEffect } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { setCompactTitle } from "@/lib/compact-title";
import { cn } from "@/lib/cn";
import { CrestMark } from "@/components/ui/section-heading";
import Reveal from "@/components/reveal";

/**
 * iOS large-title header for inner pages. The big title sits in the content;
 * as it scrolls away, the nav bar picks up a compact version of it.
 */
export default function CompactHeader({
  eyebrow,
  title,
  lede,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCompactTitle(latest > 150 ? title : null);
  });
  useEffect(() => {
    return () => setCompactTitle(null);
  }, []);

  return (
    <section className={cn("container-site pb-8 pt-10 sm:pt-14", className)}>
      <Reveal>
        <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-royal dark:text-bright">
          <CrestMark />
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-sans text-[2.1rem] font-bold leading-[1.12] tracking-[-0.02em] text-charcoal text-balance dark:text-white sm:text-[2.6rem]">
          {title}
        </h1>
        {lede && (
          <p className="mt-4 max-w-2xl text-[17px] leading-7 text-slate-600 dark:text-silver">
            {lede}
          </p>
        )}
        {children}
      </Reveal>
    </section>
  );
}
