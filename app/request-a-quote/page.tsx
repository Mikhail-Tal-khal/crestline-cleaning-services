import type { Metadata } from "next";
import CompactHeader from "@/components/compact-header";
import QuoteForm from "@/components/quote-form";
import {
  estimateToServiceIds,
  parseEstimateSearchParams,
} from "@/lib/quote";

export const metadata: Metadata = {
  title: "Request a Cleaning Quote in Mombasa",
  description:
    "Request a transparent cleaning quotation in Mombasa. Share your property details, measurements and photos — Crestline calculates the actual scope of work and explains the price before booking.",
  alternates: { canonical: "/request-a-quote" },
  openGraph: {
    title: "Request a Cleaning Quote — Crestline Cleaning Services",
    description:
      "Share your property details, measurements and photos and receive a clear quotation from Crestline.",
    url: "/request-a-quote",
  },
};

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const hasParams = Object.keys(params).length > 0;
  const input = parseEstimateSearchParams(params);

  return (
    <>
      <CompactHeader
        eyebrow="Request a quote"
        title="Tell us what needs cleaning."
        lede="Five quick steps and a clear price — built around your actual space, with zero pressure to book."
      />
      <div className="container-site pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl">
          <QuoteForm
            seed={
              hasParams
                ? {
                    serviceIds: estimateToServiceIds(input),
                    sofaSeats: input.sofaSeats,
                    leatherSeats: input.leatherSeats,
                    chairCount: input.chairCount,
                    mattresses: input.mattresses,
                    carpetMedium: input.carpetMedium,
                    carpetLarge: input.carpetLarge,
                    bedrooms: input.bedrooms,
                    cleaningType: input.cleaningType,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </>
  );
}
