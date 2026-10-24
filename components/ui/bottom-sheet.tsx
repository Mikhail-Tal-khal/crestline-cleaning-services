"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * iOS bottom sheet: springs up, drag-to-dismiss, dimmed backdrop, rounded top
 * corners and a drag handle. Focus is moved into the sheet on open, Escape
 * closes it, and focus returns to the trigger on dismiss.
 */
export default function BottomSheet({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 60);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      // Light focus trap: wrap Tab at the sheet's edges.
      if (event.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-navy-900/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.8 }}
            transition={{ type: "spring", stiffness: 380, damping: 40 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.55 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 700) onClose();
            }}
            className={cn(
              "relative w-full max-w-md rounded-t-[28px] bg-white pb-[calc(env(safe-area-inset-bottom)+1.25rem)] shadow-sheet outline-none dark:bg-[#171B24] sm:rounded-[28px] sm:pb-6",
              className
            )}
          >
            <div className="flex justify-center pt-3" aria-hidden="true">
              <span className="h-[5px] w-10 rounded-full bg-slate-300 dark:bg-white/25" />
            </div>
            {title && (
              <h2 className="px-6 pt-3 text-center font-sans text-[17px] font-bold text-charcoal dark:text-white">
                {title}
              </h2>
            )}
            <div className="px-5 pt-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
