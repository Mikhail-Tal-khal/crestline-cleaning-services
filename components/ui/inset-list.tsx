import Link from "next/link";
import { cn } from "@/lib/cn";
import { ChevronRightIcon } from "@/components/icons";

/**
 * iOS "inset grouped list": a white rounded card with hairline-divided rows.
 * Used for FAQs, service conditions, contact rows, quote summaries and more.
 */
export function InsetGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "divide-y divide-navy/[0.06] overflow-hidden rounded-[20px] bg-white shadow-card dark:divide-white/[0.08] dark:bg-white/[0.06]",
        className
      )}
    >
      {children}
    </div>
  );
}

type InsetRowProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  /** Right-side slot. Defaults to a chevron for rows that navigate or act. */
  accessory?: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
};

export function InsetRow({
  title,
  subtitle,
  icon,
  accessory,
  href,
  external,
  onClick,
  ariaLabel,
  className,
}: InsetRowProps) {
  const inner = (
    <>
      {icon && (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal/10 text-royal dark:bg-bright/15 dark:text-bright"
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium leading-6 text-charcoal dark:text-white">
          {title}
        </span>
        {subtitle && (
          <span className="mt-0.5 block text-[13px] leading-5 text-slate-500 dark:text-silver/80">
            {subtitle}
          </span>
        )}
      </span>
      {accessory}
      {(href || onClick) && accessory === undefined && (
        <ChevronRightIcon
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-slate-400 dark:text-silver/60"
        />
      )}
    </>
  );

  const classes = cn(
    "flex w-full items-center gap-3.5 px-4 py-3 text-left",
    (href || onClick) &&
      "cursor-pointer transition-colors duration-150 hover:bg-soft/70 active:bg-soft dark:hover:bg-white/[0.05] dark:active:bg-white/[0.08]",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
        {inner}
      </button>
    );
  }
  return <div className={classes}>{inner}</div>;
}
