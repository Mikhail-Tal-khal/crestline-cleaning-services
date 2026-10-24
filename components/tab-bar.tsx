"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";
import BottomSheet from "@/components/ui/bottom-sheet";
import { InsetGroup, InsetRow } from "@/components/ui/inset-list";
import { SocialButtons } from "@/components/social-buttons";
import {
  BuildingIcon,
  ClipboardIcon,
  HomeIcon,
  InfoIcon,
  LayersIcon,
  MailIcon,
  SendIcon,
  ShieldIcon,
} from "@/components/icons";

const tabs = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/services", label: "Services", Icon: ClipboardIcon },
  { href: "/packages", label: "Packages", Icon: LayersIcon },
];

/**
 * Floating iOS-style bottom tab bar (mobile only). The centre action is the
 * quotation request; "More" opens a bottom sheet with the remaining pages
 * and the social buttons.
 */
export default function TabBar() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-tab-safe z-[60] mx-auto w-[min(26rem,calc(100%-2rem))] md:hidden"
      >
        <div className="flex items-end justify-around rounded-[24px] border-[0.5px] border-white/40 bg-white/85 px-2 pb-1.5 pt-1 shadow-tab backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#12161D]/85">
          {tabs.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className="flex min-h-[52px] min-w-[56px] flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-1.5 transition-colors duration-150"
              >
                <Icon
                  className={cn(
                    "h-[22px] w-[22px] transition-colors duration-150",
                    active ? "text-royal dark:text-bright" : "text-slate-400 dark:text-silver/70"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-semibold tracking-[0.02em]",
                    active ? "text-royal dark:text-bright" : "text-slate-500 dark:text-silver/70"
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Centre action — Request a Quote */}
          <Link
            href="/request-a-quote"
            aria-current={isActive("/request-a-quote") ? "page" : undefined}
            aria-label="Request a quote"
            className="relative -mt-6 flex min-h-[52px] min-w-[64px] flex-col items-center justify-start"
          >
            <motion.span
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 600, damping: 28 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(180deg,#1173DE_0%,#075FCB_55%,#054A9C_100%)] text-white shadow-[0_8px_24px_rgba(7,95,203,0.45)] ring-4 ring-white dark:ring-[#12161D]"
            >
              <SendIcon className="h-6 w-6" />
            </motion.span>
            <span
              className={cn(
                "mt-0.5 text-[10px] font-semibold",
                isActive("/request-a-quote")
                  ? "text-royal dark:text-bright"
                  : "text-slate-500 dark:text-silver/70"
              )}
            >
              Quote
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={moreOpen}
            className="flex min-h-[52px] min-w-[56px] flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-1.5"
          >
            <span
              aria-hidden="true"
              className="flex h-[22px] w-[22px] flex-col items-center justify-center gap-[3px]"
            >
              <span className="h-[2px] w-[16px] rounded-full bg-slate-400 dark:bg-silver/70" />
              <span className="h-[2px] w-[16px] rounded-full bg-slate-400 dark:bg-silver/70" />
              <span className="h-[2px] w-[16px] rounded-full bg-slate-400 dark:bg-silver/70" />
            </span>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-silver/70">
              More
            </span>
          </button>
        </div>
      </nav>

      <BottomSheet open={moreOpen} onClose={() => setMoreOpen(false)} title="More">
        <InsetGroup>
          <InsetRow
            href="/about"
            icon={<InfoIcon className="h-5 w-5" />}
            title="About Crestline"
            subtitle="Who we are and how we work"
          />
          <InsetRow
            href="/commercial-cleaning"
            icon={<BuildingIcon className="h-5 w-5" />}
            title="Commercial cleaning"
            subtitle="Offices, hotels and property managers"
          />
          <InsetRow
            href="/contact"
            icon={<MailIcon className="h-5 w-5" />}
            title="Contact and FAQ"
            subtitle="Reach us any of these ways"
          />
          <InsetRow
            href="/privacy"
            icon={<ShieldIcon className="h-5 w-5" />}
            title="Privacy notice"
          />
        </InsetGroup>

        <p className="mt-5 px-1 text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-silver/80">
          Follow Crestline
        </p>
        <SocialButtons size="lg" className="mt-3" />

        <p className="mt-5 px-1 text-[12px] leading-5 text-slate-500 dark:text-silver/70">
          {siteConfig.location} · {siteConfig.tagline}
        </p>
      </BottomSheet>
    </>
  );
}
