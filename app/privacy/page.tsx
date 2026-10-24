import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import CompactHeader from "@/components/compact-header";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Crestline Cleaning Services handles the information you share through quotation requests, site assessments and enquiries.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    id: "who",
    title: "1. Who we are",
    body: (
      <>
        {siteConfig.name} is the professional cleaning division of{" "}
        {siteConfig.parentCompany}, based in {siteConfig.location}. For any privacy
        question, contact us at{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-medium text-royal underline underline-offset-4 dark:text-bright"
        >
          {siteConfig.email}
        </a>
        .
      </>
    ),
  },
  {
    id: "collect",
    title: "2. What we collect",
    list: [
      "Contact details you enter: name, email address, phone number and preferred contact method.",
      "Property details: neighbourhood or area, an optional location pin link, property type and approximate size.",
      "Service details: selected services, measurements, quantities, access and condition notes.",
      "Photos or a short video, if you choose to attach them for assessment.",
      "Any other information you include in a message or notes field.",
    ],
  },
  {
    id: "use",
    title: "3. How we use it",
    body: (
      <>
        We use your information only to respond to your enquiry, prepare a quotation,
        arrange and carry out the agreed service, and keep records of the work we have
        quoted or completed. We don&apos;t sell your information, and we don&apos;t add
        you to marketing lists.
      </>
    ),
  },
  {
    id: "delivery",
    title: "4. How submissions are delivered",
    body: (
      <>
        When an email delivery service is configured for the website, your submission
        is sent to Crestline through that service. When no service is configured, the
        website does not store your submission: a prepared email opens in{" "}
        <em>your own</em> email application, and the message is only sent when you
        choose to send it. In that case, please attach any photos or video to that
        email yourself.
      </>
    ),
  },
  {
    id: "files",
    title: "5. Photos and videos",
    body: (
      <>
        Files you attach are checked for type and size and are never published on the
        website or made publicly accessible. They are used only to assess the items you
        want cleaned.
      </>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies, analytics and third parties",
    body: (
      <>
        The website doesn&apos;t set tracking cookies and doesn&apos;t run third-party
        analytics or advertising scripts. Fonts are served from the website itself
        rather than from a third-party font service. The contact page embeds a general
        map from OpenStreetMap, which loads from openstreetmap.org when you view that
        page and is subject to OpenStreetMap&apos;s own privacy terms.
      </>
    ),
  },
  {
    id: "retention",
    title: "7. Retention and your choices",
    body: (
      <>
        Quotation and enquiry records are kept only as long as needed to quote and
        deliver the service. You can ask us to correct or delete the information you
        have shared by emailing{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-medium text-royal underline underline-offset-4 dark:text-bright"
        >
          {siteConfig.email}
        </a>
        . We&apos;ll respond within a reasonable time.
      </>
    ),
  },
  {
    id: "changes",
    title: "8. Changes to this notice",
    body: (
      <>
        If this notice changes, the updated version will be published on this page with
        a new date.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <CompactHeader
        eyebrow="Privacy"
        title="Privacy notice"
        lede="How Crestline Cleaning Services handles the information you share with us — in plain language."
      />

      <article className="container-site max-w-3xl space-y-5 pb-16 sm:pb-24">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-silver/60">
            Last updated: October 2026
          </p>
        </Reveal>

        {sections.map((section) => (
          <Reveal key={section.id}>
            <section
              aria-labelledby={section.id}
              className="rounded-[22px] bg-white p-6 shadow-card dark:bg-white/[0.06] sm:p-7"
            >
              <h2 id={section.id} className="font-sans text-[18px] font-bold text-charcoal dark:text-white">
                {section.title}
              </h2>
              {"body" in section && section.body && (
                <p className="mt-3 text-[15px] leading-7 text-slate-700 dark:text-silver/95">
                  {section.body}
                </p>
              )}
              {"list" in section && section.list && (
                <ul className="mt-3 space-y-2.5 text-[15px] leading-7 text-slate-700 dark:text-silver/95">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}

        <Reveal>
          <p className="border-t-[0.5px] border-navy/[0.08] pt-8 text-[14px] leading-6 text-slate-600 dark:border-white/[0.08] dark:text-silver/90">
            Read also our{" "}
            <Link
              href="/packages#service-conditions"
              className="font-medium text-royal underline underline-offset-4 dark:text-bright"
            >
              service conditions
            </Link>
            .
          </p>
        </Reveal>
      </article>
    </>
  );
}
