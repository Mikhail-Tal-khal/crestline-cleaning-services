"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/lib/siteConfig";
import { useCompactTitle } from "@/lib/compact-title";
import { cn } from "@/lib/cn";
import BrandLockup from "@/components/brand-lockup";
import { buttonClasses } from "@/components/ui/button";

/**
 * Translucent iOS-style navigation bar. On the homepage it starts transparent
 * over the navy hero and gains blur + a hairline on scroll; on inner pages it
 * shows the page's compact title once the large title scrolls away.
 */
export default function NavBar({ hasLogo }: { hasLogo: boolean }) {
  const pathname = usePathname();
  const scrolled = useScrolled(pathname === "/" ? 32 : 8);
  const compactTitle = useCompactTitle();
  const overlay = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        overlay
          ? "bg-transparent"
          : "border-b-[0.5px] border-navy/[0.08] bg-white/80 shadow-[0_1px_12px_rgba(16,24,40,0.04)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0B0E14]/80"
      )}
    >
      <div className="relative container-site flex h-[4.25rem] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-full"
          aria-label="Crestline Cleaning Services — home"
        >
          {hasLogo ? (
            // Plain <img> on purpose: the official emblem must always render
            // at its intrinsic proportions (fixed height, automatic width),
            // with a one-time metallic shimmer on first load.
            <span className="logo-shimmer block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/crestline-logo.png"
                alt="Crestline Cleaning Services"
                className="h-11 w-auto rounded-[10px] sm:h-12"
              />
            </span>
          ) : (
            <BrandLockup onDark={overlay} />
          )}
        </Link>

        {/* Compact iOS title, shown when the large title scrolls away. */}
        <div className="pointer-events-none absolute inset-x-0 flex justify-center">
          <AnimatePresence>
            {compactTitle && (
              <motion.span
                key="compact-title"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 480, damping: 38 }}
                className="max-w-[55%] truncate rounded-full bg-white/70 px-4 py-1.5 text-[15px] font-semibold text-charcoal shadow-card backdrop-blur dark:bg-white/[0.12] dark:text-white"
              >
                {compactTitle}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation
              .filter((item) => item.href !== "/")
              .map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-full px-4 text-[14px] font-medium transition-colors duration-150",
                        active
                          ? "bg-royal/10 text-royal dark:bg-white/[0.1] dark:text-bright"
                          : overlay
                            ? "text-white/85 hover:bg-white/10 hover:text-white"
                            : "text-slate-600 hover:bg-navy/[0.05] hover:text-charcoal dark:text-silver dark:hover:bg-white/[0.07] dark:hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        <Link
          href="/request-a-quote"
          className={buttonClasses(overlay ? "bright" : "primary", "sm", "shrink-0")}
        >
          Request a Quote
        </Link>
      </div>
    </header>
  );
}

function useScrolled(threshold: number) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}
