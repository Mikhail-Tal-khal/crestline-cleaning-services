"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "@/components/icons";

/**
 * iOS-style FAQ rows: tap to expand, smooth height animation.
 */
export default function FaqList({
  items,
}: {
  items: ReadonlyArray<{ q: string; a: string }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-navy/[0.06] overflow-hidden rounded-[20px] bg-white shadow-card dark:divide-white/[0.08] dark:bg-white/[0.06]">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.q}>
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-[15px] font-semibold leading-6 text-charcoal dark:text-white">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  aria-hidden="true"
                >
                  <ChevronDownIcon className="h-5 w-5 shrink-0 text-royal dark:text-bright" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`faq-panel-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={cn("overflow-hidden")}
                >
                  <p className="px-5 pb-5 pr-10 text-[14px] leading-7 text-slate-600 dark:text-silver/90">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
