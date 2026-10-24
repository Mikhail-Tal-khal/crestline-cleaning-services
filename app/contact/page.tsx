import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { faqs } from "@/lib/faqs";
import CompactHeader from "@/components/compact-header";
import EnquiryForm from "@/components/enquiry-form";
import FaqList from "@/components/faq-list";
import Reveal from "@/components/reveal";
import { InsetGroup, InsetRow } from "@/components/ui/inset-list";
import { SocialButtons } from "@/components/social-buttons";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppGlyph } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Crestline Cleaning Services — Mombasa, Kenya",
  description:
    "Contact Crestline Cleaning Services in Mombasa, Kenya. Email cleaning.services.crestline@gmail.com or send a message — serving customers across Mombasa and surrounding locations by quotation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Crestline Cleaning Services",
    description:
      "Serving customers across Mombasa, Kenya. Email cleaning.services.crestline@gmail.com.",
    url: "/contact",
  },
};

export default function ContactPage() {
  const wa = siteConfig.social.whatsapp;
  const waLink = wa.number
    ? `https://wa.me/${wa.number}?text=${encodeURIComponent(wa.prefilledMessage || "")}`
    : null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <CompactHeader
        eyebrow="Contact"
        title="Karibu — how can we help?"
        lede="A real person reads every message. Reach us any of the ways below, or send the form and we'll come back to you."
      />

      <section className="container-site pb-16 sm:pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <Reveal>
            <InsetGroup>
              <InsetRow
                icon={<MapPinIcon className="h-5 w-5" />}
                title={siteConfig.location}
                subtitle={siteConfig.parentLine}
              />
              <InsetRow
                href={`mailto:${siteConfig.email}`}
                external
                icon={<MailIcon className="h-5 w-5" />}
                title={siteConfig.email}
                subtitle="We reply within one working day."
                ariaLabel={`Email ${siteConfig.email}`}
              />
              {siteConfig.phone && (
                <InsetRow
                  href={`tel:${siteConfig.phone}`}
                  icon={<PhoneIcon className="h-5 w-5" />}
                  title={siteConfig.phone}
                  subtitle="Call or SMS."
                  ariaLabel={`Call ${siteConfig.phone}`}
                />
              )}
              {waLink && (
                <InsetRow
                  href={waLink}
                  external
                  icon={<WhatsAppGlyph className="h-5 w-5 text-[#25D366]" />}
                  title="WhatsApp"
                  subtitle="Quick questions — we're happy to chat."
                  ariaLabel="Chat with Crestline on WhatsApp"
                />
              )}
              <InsetRow
                href={`https://${siteConfig.website}`}
                external
                title={siteConfig.website}
                subtitle="Crestline Strategies Limited"
                ariaLabel={`Visit ${siteConfig.website}`}
              />
            </InsetGroup>

            <div className="mt-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-silver/80">
                Follow Crestline
              </p>
              <SocialButtons className="mt-3" />
            </div>

            <p className="mt-6 text-[14px] leading-6 text-slate-600 dark:text-silver/90">
              We serve customers across Mombasa, and we&apos;ll happily consider
              surrounding locations by quotation — distance, access and the project
              itself can affect the final price.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/request-a-quote"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(180deg,#1173DE_0%,#075FCB_55%,#054A9C_100%)] px-5 py-2.5 font-sans text-[15px] font-semibold text-white shadow-[0_4px_16px_rgba(7,95,203,0.35)] transition-all duration-150 hover:brightness-110"
              >
                Request a Quote
              </Link>
              <Link
                href="/commercial-cleaning"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-[0.5px] border-navy/25 px-5 py-2.5 font-sans text-[15px] font-semibold text-charcoal transition-colors duration-150 hover:border-navy/60 dark:border-white/25 dark:text-white"
              >
                Commercial assessments
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-[26px] bg-white p-6 shadow-card dark:bg-white/[0.06] sm:p-8">
              <h2 className="font-sans text-[19px] font-bold text-charcoal dark:text-white">
                Send a message
              </h2>
              <p className="mt-1.5 text-[14px] leading-6 text-slate-600 dark:text-silver/90">
                Need a detailed quote? The{" "}
                <Link
                  href="/request-a-quote"
                  className="font-medium text-royal underline underline-offset-4 dark:text-bright"
                >
                  quotation form
                </Link>{" "}
                lets you add sizes and photos.
              </p>
              <div className="mt-6">
                <EnquiryForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map — general Mombasa area only, no street marker */}
      <section aria-labelledby="map-title" className="container-site pb-16 sm:pb-20">
        <Reveal>
          <h2 id="map-title" className="font-sans text-[19px] font-bold text-charcoal dark:text-white">
            Where we work
          </h2>
          <p className="mt-1.5 max-w-2xl text-[14.5px] leading-6 text-slate-600 dark:text-silver/90">
            Crestline is a mobile service — we come to your home, office, rental
            property or commercial premises. The map shows the general Mombasa area;
            we don&apos;t publish a street address.
          </p>
          <div className="mt-6 overflow-hidden rounded-[24px] bg-white shadow-card dark:bg-white/[0.06]">
            <iframe
              title="General map of Mombasa, Kenya"
              src="https://www.openstreetmap.org/export/embed.html?bbox=39.56%2C-4.14%2C39.82%2C-3.94&layer=mapnik"
              className="h-[320px] w-full sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t-[0.5px] border-navy/[0.08] px-5 py-4 dark:border-white/[0.08]">
              <p className="text-[13px] leading-5 text-slate-600 dark:text-silver/90">
                General area map — no precise marker, on purpose.
              </p>
              <a
                href="https://www.openstreetmap.org/relation/3436847"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-semibold text-royal underline underline-offset-4 dark:text-bright"
              >
                View Mombasa on OpenStreetMap
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="container-site pb-20 sm:pb-24">
        <Reveal>
          <h2 id="faq-title" className="font-sans text-[19px] font-bold text-charcoal dark:text-white">
            Questions people ask before booking
          </h2>
          <p className="mt-1.5 max-w-2xl text-[14.5px] leading-6 text-slate-600 dark:text-silver/90">
            Straight answers — so you know exactly what to expect.
          </p>
          <div className="mt-6 max-w-3xl">
            <FaqList items={faqs} />
          </div>
        </Reveal>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
