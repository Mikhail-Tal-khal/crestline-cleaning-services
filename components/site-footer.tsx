import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import type { BrandAsset } from "@/lib/brand";
import BrandLockup from "@/components/brand-lockup";
import CurrentYear from "@/components/current-year";
import { SocialButtons } from "@/components/social-buttons";
import { MailIcon, MapPinIcon } from "@/components/icons";

const serviceLinks = [
  { href: "/services#sofa", label: "Sofa and upholstery cleaning" },
  { href: "/services#carpet", label: "Carpet and rug cleaning" },
  { href: "/services#mattress", label: "Mattress cleaning" },
  { href: "/services#standard-house", label: "Standard house cleaning" },
  { href: "/services#deep-house", label: "Deep house cleaning" },
  { href: "/services#airbnb", label: "Airbnb turnover cleaning" },
  { href: "/services#move-in-out", label: "Move-in and move-out cleaning" },
  { href: "/services#office-commercial", label: "Office and commercial cleaning" },
];

const companyLinks = [
  { href: "/about", label: "About Crestline" },
  { href: "/commercial-cleaning", label: "Commercial cleaning" },
  { href: "/packages", label: "Packages and pricing" },
  { href: "/request-a-quote", label: "Request a quote" },
  { href: "/contact", label: "Contact and FAQ" },
  { href: "/privacy", label: "Privacy notice" },
];

export default function SiteFooter({ logo }: { logo: BrandAsset }) {
  return (
    <footer className="border-t-[0.5px] border-navy/[0.08] bg-white dark:border-white/[0.08] dark:bg-[#0B0E14]">
      <div className="container-site py-14">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Crestline Cleaning Services — home"
            >
              {logo.exists ? (
                <span className="logo-shimmer block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brand/crestline-logo.png"
                    alt="Crestline Cleaning Services"
                    className="h-12 w-auto rounded-[10px]"
                  />
                </span>
              ) : (
                <BrandLockup onDark={false} />
              )}
            </Link>
            <p className="mt-5 font-sans text-[17px] font-bold text-charcoal dark:text-white">
              {siteConfig.tagline}
            </p>
            <div className="mt-5 space-y-2.5 text-sm text-slate-600 dark:text-silver/90">
              <p className="flex items-center gap-2.5">
                <MapPinIcon className="h-4 w-4 shrink-0 text-royal dark:text-bright" />
                {siteConfig.location}
              </p>
              <p className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 shrink-0 text-royal dark:text-bright" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all rounded underline-offset-4 transition-colors duration-150 hover:text-royal hover:underline dark:hover:text-bright"
                >
                  {siteConfig.email}
                </a>
              </p>
            </div>
            <div className="mt-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-silver/80">
                Follow Crestline
              </p>
              <SocialButtons className="mt-3" />
            </div>
          </div>

          <nav aria-label="Services">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-charcoal dark:text-white">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded text-sm text-slate-600 underline-offset-4 transition-colors duration-150 hover:text-royal hover:underline dark:text-silver dark:hover:text-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-charcoal dark:text-white">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded text-sm text-slate-600 underline-offset-4 transition-colors duration-150 hover:text-royal hover:underline dark:text-silver dark:hover:text-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t-[0.5px] border-navy/[0.08] pt-7 dark:border-white/[0.08]">
          <p className="font-sans text-sm font-semibold text-slate-600 dark:text-silver">
            Crestline Cleaning Services — {siteConfig.parentLine}
          </p>
          <p className="mt-2.5 text-[13px] leading-5 text-slate-500 dark:text-silver/70">
            © <CurrentYear /> {siteConfig.parentCompany}. All rights reserved.
          </p>
          <p className="mt-1.5 text-[13px] leading-5 text-slate-500 dark:text-silver/70">
            {siteConfig.website} · Site imagery is illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
