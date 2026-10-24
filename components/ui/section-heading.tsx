import { cn } from "@/lib/cn";

/** The fine "crest line" motif used with eyebrow labels across the site. */
export function CrestMark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="h-px w-6 bg-current opacity-50" />
      <span className="block h-1.5 w-1.5 rotate-45 bg-current" />
    </span>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lede?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em]",
            align === "center" && "justify-center",
            tone === "dark" ? "text-bright" : "text-royal dark:text-bright"
          )}
        >
          <CrestMark />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-4 font-sans text-[1.7rem] font-bold leading-[1.15] tracking-[-0.02em] text-balance sm:text-[2rem]",
          tone === "dark" ? "text-white" : "text-charcoal dark:text-white"
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-4 text-[16.5px] leading-7",
            tone === "dark" ? "text-silver" : "text-slate-600 dark:text-silver/90"
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
