import type { Metadata } from "next";
import Link from "next/link";
import CompactHeader from "@/components/compact-header";
import SiteAssessmentForm from "@/components/site-assessment-form";
import Reveal from "@/components/reveal";
import { SocialButtons } from "@/components/social-buttons";
import {
  BoxIcon,
  BuildingIcon,
  CalendarIcon,
  ClipboardIcon,
  HardHatIcon,
  HomeIcon,
  CheckIcon,
  KeyIcon,
  UsersIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Office and Commercial Cleaning in Mombasa",
  description:
    "Office cleaning Mombasa, hotel and hospitality cleaning, Airbnb turnovers, property manager and post-construction cleaning by Crestline — scheduled, supervised and quoted in writing. Request a site assessment.",
  alternates: { canonical: "/commercial-cleaning" },
  openGraph: {
    title: "Office and Commercial Cleaning in Mombasa — Crestline",
    description:
      "Scheduled office, hospitality, Airbnb and post-construction cleaning in Mombasa with supervised teams and written quotations.",
    url: "/commercial-cleaning",
  },
};

const audiences = [
  { icon: BuildingIcon, title: "Offices", copy: "Desks, floors, pantries, washrooms and reception — on a schedule that suits your team." },
  { icon: KeyIcon, title: "Hotels and hospitality", copy: "Hospitality cleaning by written quotation, with the scope agreed well in advance." },
  { icon: HomeIcon, title: "Airbnb units", copy: "Turnover cleaning and a proper reset between guests." },
  { icon: ClipboardIcon, title: "Property managers", copy: "Recurring cleaning for managed units and shared spaces." },
  { icon: UsersIcon, title: "Residential developments", copy: "Common areas and agreed residential duties, handled with care." },
  { icon: BoxIcon, title: "Move-in and move-out", copy: "Readiness cleaning for vacant or transitioning properties." },
  { icon: HardHatIcon, title: "Post-construction projects", copy: "Fine-dust removal and presentation cleaning after the builders leave." },
  { icon: CalendarIcon, title: "Recurring schedules", copy: "Daily, weekly or custom — with supervised teams that show up." },
  { icon: UsersIcon, title: "General cleaning personnel", copy: "Assigned cleaners for agreed duties, hours and supervision." },
];

const capabilities = [
  "Desks and accessible surfaces",
  "Floors",
  "Pantry areas",
  "Washrooms",
  "Reception spaces",
  "Scheduled office cleaning",
  "Hotel and hospitality cleaning by written quotation",
  "Recurring cleaning schedules",
  "Supervised cleaning teams",
];

const steps = [
  "Share the property details, rough size and the services you need.",
  "We go through it together and arrange a site assessment where it helps.",
  "You get a written quotation covering scope, schedule and supervision.",
  "Work starts once you approve it — pricing confirmed before anything begins.",
];

export default function CommercialCleaningPage() {
  return (
    <>
      <CompactHeader
        eyebrow="Commercial cleaning"
        title="Office and commercial cleaning in Mombasa."
        lede="Offices, hotels, Airbnbs and property managers across Mombasa — cleaned on a schedule you set, by teams that show up prepared. Written quotes, no surprises."
      />

      <section className="container-site pb-16 sm:pb-20">
        <Reveal>
          <h2 className="font-sans text-[19px] font-bold text-charcoal dark:text-white">
            Who we work with
          </h2>
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => (
            <li key={audience.title}>
              <Reveal delay={(index % 3) * 60} className="h-full">
                <div className="flex h-full flex-col rounded-[22px] bg-white p-5 shadow-card dark:bg-white/[0.06]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-royal/10 text-royal dark:bg-bright/15 dark:text-bright">
                    <audience.icon className="h-[22px] w-[22px]" />
                  </span>
                  <h3 className="mt-4 font-sans text-[15px] font-bold text-charcoal dark:text-white">
                    {audience.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-6 text-slate-600 dark:text-silver/90">
                    {audience.copy}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-site pb-16 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-sans text-[19px] font-bold text-charcoal dark:text-white">
              What commercial cleaning covers
            </h2>
            <p className="mt-2 text-[14.5px] leading-6 text-slate-600 dark:text-silver/90">
              Scope is agreed in writing for each property — this is the standard
              coverage quotations are built from.
            </p>
            <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {capabilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[14.5px] leading-6 text-charcoal dark:text-silver"
                >
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-royal dark:text-bright" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[24px] bg-white p-7 shadow-card dark:bg-white/[0.06] sm:p-8">
              <h3 className="font-sans text-[17px] font-bold text-charcoal dark:text-white">
                How commercial quoting works
              </h3>
              <ol className="mt-5 space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-3.5">
                    <span className="font-sans text-sm font-extrabold text-bright">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14.5px] leading-6 text-slate-600 dark:text-silver/90">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 rounded-[16px] bg-soft p-4 text-[13px] leading-5 text-slate-600 dark:bg-white/[0.05] dark:text-silver/90">
                We don&apos;t promise instant availability. Every request is read by a
                person, and scheduling is confirmed when we come back to you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-site pb-16 sm:pb-20">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-[24px] bg-white p-7 shadow-card dark:bg-white/[0.06] sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-sans text-[17px] font-bold text-charcoal dark:text-white">
                Follow our commercial work
              </h2>
              <p className="mt-1.5 text-[14px] leading-6 text-slate-600 dark:text-silver/90">
                Real projects and team moments, as they happen.
              </p>
            </div>
            <SocialButtons size="lg" />
          </div>
        </Reveal>
      </section>

      <section id="site-assessment" className="container-site scroll-mt-24 pb-16 sm:pb-24">
        <Reveal>
          <h2 className="font-sans text-[22px] font-bold tracking-[-0.02em] text-charcoal dark:text-white sm:text-[26px]">
            Request a site assessment.
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-7 text-slate-600 dark:text-silver/90">
            Tell us about the property and what you need. We&apos;ll go through it with
            you and prepare a written quotation — no obligation.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 rounded-[26px] bg-white p-6 shadow-card dark:bg-white/[0.06] sm:p-8">
            <SiteAssessmentForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
