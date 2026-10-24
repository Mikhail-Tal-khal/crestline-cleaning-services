import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import CompactHeader from "@/components/compact-header";
import CtaSection from "@/components/home/cta";
import Reveal from "@/components/reveal";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Crestline Cleaning Services — A Division of Crestline Strategies Limited",
  description:
    "Crestline Cleaning Services is the professional cleaning division of Crestline Strategies Limited, based in Mombasa, Kenya. Dependable cleaning, careful workmanship and a premium customer experience.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Crestline Cleaning Services",
    description:
      "The professional cleaning division of Crestline Strategies Limited, based in Mombasa, Kenya.",
    url: "/about",
  },
};

const values = [
  "Professionalism",
  "Dependability",
  "Precision",
  "Respect",
  "Transparency",
  "Care",
  "Continuous improvement",
];

export default function AboutPage() {
  return (
    <>
      <CompactHeader
        eyebrow="About"
        title="About Crestline Cleaning Services."
        lede={siteConfig.parentLine}
      />

      <section className="container-site pb-16 sm:pb-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-[16px] leading-7 text-slate-700 dark:text-silver">
              <p>
                Crestline is the cleaning arm of {siteConfig.parentCompany}, right here
                in Mombasa. We started Crestline for a simple reason: people deserve
                cleaning that is done properly, priced clearly, and delivered with
                respect — for homes, offices, rental properties and businesses alike.
              </p>
              <p>
                We believe a clean space isn&apos;t only about how it looks. A properly
                cared-for room feels calmer, comfier, more welcoming — better ready for
                the people who use it. That feeling is the real work.
              </p>
              <p>
                So we look before we clean, measure before we quote, and treat your
                space like it&apos;s ours. No forcing every home into the same package —
                your quotation is built around your property and what it actually needs.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] shadow-frame">
                <Image
                  src="/images/team-preparing.jpg"
                  alt="Two Crestline-style cleaning professionals in royal-blue uniforms preparing equipment, seen from behind"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-silver/60">
                Illustrative service imagery
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-site pb-16 sm:pb-20">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] bg-white p-7 shadow-card dark:bg-white/[0.06] sm:p-9">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-royal dark:text-bright">
                Mission
              </h2>
              <p className="mt-4 text-[16px] leading-7 text-slate-700 dark:text-silver">
                To deliver dependable, meticulous and professionally managed cleaning
                services that restore comfort, presentation and confidence in the spaces
                our customers value.
              </p>
            </div>
            <div className="rounded-[24px] bg-white p-7 shadow-card dark:bg-white/[0.06] sm:p-9">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-royal dark:text-bright">
                Vision
              </h2>
              <p className="mt-4 text-[16px] leading-7 text-slate-700 dark:text-silver">
                To build Crestline into one of Kenya&apos;s most trusted professional
                cleaning brands through disciplined service, transparent customer care
                and consistently high standards.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12">
            <h2 className="font-sans text-[19px] font-bold text-charcoal dark:text-white">
              What we hold ourselves to
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {values.map((value) => (
                <li
                  key={value}
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-charcoal shadow-card dark:bg-white/[0.06] dark:text-white"
                >
                  <CheckIcon className="h-4 w-4 text-royal dark:text-bright" />
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="container-site pb-16 sm:pb-20">
        <Reveal>
          <div className="on-navy relative overflow-hidden rounded-[28px] bg-navy px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_0%,rgba(39,169,245,0.16),transparent_70%)]"
            />
            <div className="relative mx-auto max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-bright">
                Brand promise
              </p>
              <p className="mt-5 font-sans text-[1.55rem] font-bold leading-snug tracking-[-0.02em] text-white text-balance sm:text-[2rem]">
                Crestline does not simply clean spaces. Crestline restores the feeling
                of a space.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaSection />
    </>
  );
}
