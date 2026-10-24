import type { Metadata } from "next";
import { services } from "@/lib/services";
import CompactHeader from "@/components/compact-header";
import ServiceAccordion from "@/components/service-accordion";
import CtaSection from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Cleaning Services in Mombasa — Sofa, Carpet, Mattress & House Cleaning",
  description:
    "Professional cleaning services in Mombasa: sofa and upholstery, carpet and rug, mattress, house, deep, office, Airbnb turnover, move-in and post-construction cleaning by Crestline.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Cleaning Services in Mombasa — Crestline Cleaning Services",
    description:
      "Sofa, carpet, mattress, house, office and post-construction cleaning in Mombasa — careful assessment, professional equipment, transparent quotations.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <CompactHeader
        eyebrow="Services"
        title="Cleaning services in Mombasa."
        lede="Tell us what needs cleaning and we'll quote for your space — not someone else's. Tap any service to see how we work, what's included, and what it costs."
      />
      <div className="container-site pb-16 sm:pb-24">
        <ServiceAccordion services={services} />
      </div>
      <CtaSection />
    </>
  );
}
