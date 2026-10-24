import { cn } from "@/lib/cn";

/**
 * Typographic wordmark used until the official emblem file is added to
 * /public/brand/crestline-logo.png. Text-first by design: the official
 * emblem is never redrawn or imitated. Carries the one-time metallic
 * shimmer on first load.
 */
export default function BrandLockup({ onDark = true }: { onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={cn(
          "logo-shimmer flex h-9 w-9 items-center justify-center rounded-[12px] border",
          onDark
            ? "border-white/25 bg-white/10"
            : "border-navy/15 bg-white shadow-card dark:border-white/20 dark:bg-white/10"
        )}
      >
        <span className={cn("block h-2 w-2 rotate-45", onDark ? "bg-bright" : "bg-royal")} />
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-sans text-[16px] font-extrabold uppercase leading-none tracking-[0.16em]",
            onDark ? "text-white" : "text-charcoal dark:text-white"
          )}
        >
          Crestline
        </span>
        <span
          className={cn(
            "mt-1 text-[9px] font-semibold uppercase leading-none tracking-[0.3em]",
            onDark ? "text-bright" : "text-royal dark:text-bright"
          )}
        >
          Cleaning Services
        </span>
      </span>
    </span>
  );
}
