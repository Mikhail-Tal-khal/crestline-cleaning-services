"use client";

import { motion } from "framer-motion";
import { InstagramIcon, FacebookIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

type Platform = {
  id: string;
  label: string;
  handle?: string;
  href: string | null;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  hoverClass: string;
};

function buildPlatforms(): Platform[] {
  const wa = siteConfig.social.whatsapp;
  const ig = siteConfig.social.instagram;
  const fb = siteConfig.social.facebook;
  const tt = siteConfig.social.tiktok;

  return [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: wa.number
        ? `https://wa.me/${wa.number}?text=${encodeURIComponent(wa.prefilledMessage || "")}`
        : null,
      Icon: WhatsAppIcon,
      hoverClass: "hover:bg-[#25D366] hover:text-white",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: ig.handle,
      href: ig.url || null,
      Icon: InstagramIcon,
      hoverClass: "hover:bg-[linear-gradient(45deg,#F58529,#DD2A7B_55%,#8134AF)] hover:text-white",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: fb.url || null,
      Icon: FacebookIcon,
      hoverClass: "hover:bg-[#1877F2] hover:text-white",
    },
    {
      id: "tiktok",
      label: "TikTok",
      handle: tt.handle,
      href: tt.url || null,
      Icon: TikTokIcon,
      hoverClass: "hover:bg-charcoal hover:text-white",
    },
  ];
}

/**
 * The four Crestline social platforms. While a value in siteConfig is empty,
 * the tile renders as a calm, non-interactive "Coming soon" state; adding a
 * real value makes it live with no code changes.
 */
export function SocialButtons({
  size = "md",
  className,
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const platforms = buildPlatforms();

  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {platforms.map(({ id, label, handle, href, Icon, hoverClass }) => (
        <li key={id}>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={handle ? `${label} (@${handle})` : `Crestline on ${label}`}
              className={cn(
                "inline-flex items-center justify-center rounded-[16px] bg-royal/10 text-royal transition-all duration-200 hover:-translate-y-0.5 hover:text-white dark:bg-white/[0.08] dark:text-bright",
                size === "lg" ? "h-14 w-14" : "h-11 w-11 rounded-full",
                hoverClass
              )}
            >
              <Icon className={size === "lg" ? "h-6 w-6" : "h-5 w-5"} />
            </a>
          ) : (
            <span
              aria-disabled="true"
              title="Coming soon"
              className={cn(
                "inline-flex cursor-not-allowed items-center justify-center rounded-[16px] bg-slate-200/80 text-slate-400 dark:bg-white/[0.06] dark:text-silver/50",
                size === "lg" ? "h-14 w-14" : "h-11 w-11 rounded-full"
              )}
            >
              <Icon className={size === "lg" ? "h-6 w-6" : "h-5 w-5"} aria-hidden="true" />
              <span className="sr-only">{label}, coming soon</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** True when at least one social channel is configured. */
export function hasLiveSocial(): boolean {
  return buildPlatforms().some((p) => p.href !== null);
}

/** WhatsApp link only when configured, else null. */
export function whatsappLink(): string | null {
  const wa = siteConfig.social.whatsapp;
  if (!wa.number) return null;
  return `https://wa.me/${wa.number}?text=${encodeURIComponent(wa.prefilledMessage || "")}`;
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return <WhatsAppIcon className={className} />;
}
