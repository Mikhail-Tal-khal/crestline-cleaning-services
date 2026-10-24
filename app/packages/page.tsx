import type { Metadata } from "next";
import { pricingDisclaimer } from "@/lib/pricing";
import CompactHeader from "@/components/compact-header";
import PackagesBrowser from "@/components/packages-browser";
import QuoteCalculator from "@/components/calculator";
import Reveal from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { InfoIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Packages and Prices — Cleaning Rates in Mombasa",
  description:
    "Crestline cleaning prices in Mombasa: sofa cleaning from KSh 600 per seat, carpets from KSh 250 per m², house cleaning from KSh 2,800 and fabric packages with up to 12% off. Estimate your quote online.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Packages and Prices — Crestline Cleaning Services",
    description:
      "Transparent service guides for sofa, mattress, carpet and house cleaning in Mombasa — plus an interactive quotation estimator.",
    url: "/packages",
  },
};

export default function PackagesPage() {
  return (
    <>
      <CompactHeader
        eyebrow="Packages and pricing"
        title="Honest prices, clear quotes."
        lede="These figures are guides. Your final price depends on the fabric, condition, access and the actual work — and we confirm it with you before anything starts."
      />

      <div className="container-site">
        <Reveal>
          <p className="flex items-start gap-3 rounded-[20px] bg-white p-4 text-[13.5px] leading-6 text-slate-600 shadow-card dark:bg-white/[0.06] dark:text-silver/90">
            <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-royal dark:text-bright" />
            {pricingDisclaimer} Final pricing is approved by you before work begins.
          </p>
        </Reveal>
      </div>

      <div className="pt-14">
        <PackagesBrowser />
      </div>

      <section id="calculator" aria-labelledby="calculator-title" className="scroll-mt-24">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Quotation estimator"
              title="Estimate your quote."
              lede="Toggle what you need — seats, mattresses, carpets, a house clean, a commercial extra — and watch the estimate build. Then carry it straight into a quotation request."
            />
          </Reveal>
          <div className="mt-10 pb-20">
            <QuoteCalculator />
          </div>
        </div>
      </section>
    </>
  );
}
