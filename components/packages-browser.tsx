"use client";

import { useEffect, useRef, useState } from "react";
import {
  carpetPricing,
  fabricPackages,
  houseCleaningTiers,
  mattressPricingNote,
  mattressSizes,
  packageRulesNote,
  pricingDisclaimer,
  propertyCommercialPricing,
  serviceConditions,
  sofaPricing,
  totalHomeCare,
} from "@/lib/pricing";
import { ksh } from "@/lib/format";
import { cn } from "@/lib/cn";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { InsetGroup, InsetRow } from "@/components/ui/inset-list";
import Reveal from "@/components/reveal";
import { CheckIcon, InfoIcon, LayersIcon } from "@/components/icons";

type Segment = "fabric" | "house" | "property";

const segmentOptions = [
  { value: "fabric" as const, label: "Fabric" },
  { value: "house" as const, label: "House" },
  { value: "property" as const, label: "Property" },
];

const hashToSegment: Record<string, Segment> = {
  sofa: "fabric",
  mattress: "fabric",
  carpet: "fabric",
  "fabric-packages": "fabric",
  "house-cleaning": "house",
  "total-home-care": "house",
  "property-commercial": "property",
};

type TableColumn = { label: string; align?: "left" | "right" };
type TableRow = { cells: string[]; emphasis?: boolean };

function PriceTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: TableColumn[];
  rows: TableRow[];
}) {
  return (
    <div className="overflow-x-auto rounded-[20px] bg-white shadow-card dark:bg-white/[0.06]">
      <table className="w-full min-w-[24rem] text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b-[0.5px] border-navy/10 dark:border-white/10">
            {columns.map((column) => (
              <th
                key={column.label}
                scope="col"
                className={cn(
                  "px-5 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-silver/80",
                  column.align === "right" ? "text-right" : "text-left"
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-navy/[0.06] dark:divide-white/[0.07]">
          {rows.map((row) => (
            <tr key={row.cells.join("-")} className={row.emphasis ? "bg-soft/70 dark:bg-white/[0.03]" : undefined}>
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cn(
                    "px-5 py-3.5",
                    columns[cellIndex]?.align === "right"
                      ? "text-right font-semibold tabular-nums text-charcoal dark:text-white"
                      : "text-charcoal dark:text-silver"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PanelHeading({ title, note }: { title: string; note?: string }) {
  return (
    <div>
      <h3 className="font-sans text-[19px] font-bold text-charcoal dark:text-white">{title}</h3>
      {note && <p className="mt-1 text-[14px] leading-6 text-slate-600 dark:text-silver/90">{note}</p>}
    </div>
  );
}

export default function PackagesBrowser() {
  const [segment, setSegment] = useState<Segment>("fabric");
  const [activeCard, setActiveCard] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Anchor links (e.g. /packages#house-cleaning) switch the segment first.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const target = hashToSegment[hash];
    if (target) {
      setSegment(target);
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  const changeSegment = (next: Segment) => {
    setSegment(next);
    const anchor = next === "fabric" ? "fabric-packages" : next === "house" ? "house-cleaning" : "property-commercial";
    window.history.replaceState(null, "", `#${anchor}`);
  };

  const onCardsScroll = () => {
    const track = cardsRef.current;
    if (!track) return;
    const cardWidth = track.scrollWidth / 3;
    setActiveCard(Math.min(2, Math.round(track.scrollLeft / cardWidth)));
  };

  const goToCard = (index: number) => {
    const track = cardsRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="container-site space-y-16 pb-16 sm:pb-20">
      {/* Swipeable package cards */}
      <Reveal>
        <section aria-labelledby="packages-cards-title">
          <h2 id="packages-cards-title" className="sr-only">
            Package discounts
          </h2>
          <div
            ref={cardsRef}
            onScroll={onCardsScroll}
            className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Package discounts — swipe to browse"
          >
            {fabricPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="w-[82%] shrink-0 snap-center rounded-[24px] bg-white p-6 shadow-card dark:bg-white/[0.06] sm:w-[52%] lg:w-[31.5%]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2.5 font-sans text-[17px] font-bold text-charcoal dark:text-white">
                    <LayersIcon className="h-5 w-5 text-royal dark:text-bright" />
                    {pkg.name}
                  </p>
                  <span className="rounded-full bg-royal/10 px-3 py-1 text-[12px] font-bold text-royal dark:bg-bright/15 dark:text-bright">
                    {Math.round(pkg.discount * 100)}% off
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-6 text-slate-600 dark:text-silver/90">
                  {pkg.description}
                </p>
              </div>
            ))}
            <div className="w-[82%] shrink-0 snap-center rounded-[24px] bg-white p-6 shadow-card dark:bg-white/[0.06] sm:w-[52%] lg:w-[31.5%]">
              <p className="flex items-center gap-2.5 font-sans text-[17px] font-bold text-charcoal dark:text-white">
                <LayersIcon className="h-5 w-5 text-royal dark:text-bright" />
                Total Home Care
              </p>
              <ul className="mt-3 space-y-1.5">
                {totalHomeCare.map((tier) => (
                  <li key={tier.label} className="flex items-start justify-between gap-3 text-[13px] leading-5">
                    <span className="text-slate-600 dark:text-silver/90">{tier.label}</span>
                    <span className="shrink-0 font-bold text-royal dark:text-bright">{tier.discount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToCard(index)}
                aria-label={`Show package card ${index + 1}`}
                aria-current={activeCard === index}
                className={cn(
                  "h-2 rounded-full transition-all duration-200",
                  activeCard === index
                    ? "w-6 bg-royal dark:bg-bright"
                    : "w-2 bg-navy/20 hover:bg-navy/40 dark:bg-white/25"
                )}
              />
            ))}
          </div>
          <p className="mt-3 text-center text-[12.5px] text-slate-500 dark:text-silver/70">
            {packageRulesNote}.
          </p>
        </section>
      </Reveal>

      {/* Segmented pricing views */}
      <Reveal>
        <section aria-label="Pricing tables">
          <div className="mx-auto max-w-md">
            <SegmentedControl
              label="Pricing category"
              options={segmentOptions}
              value={segment}
              onChange={changeSegment}
            />
          </div>

          {/* Fabric pricing (crawlable — kept in DOM, hidden when inactive) */}
          <div hidden={segment !== "fabric"} className="space-y-10 pt-10">
            <div id="sofa" className="scroll-mt-24 space-y-4">
              <PanelHeading
                title="Sofa cleaning"
                note={`KSh ${sofaPricing.pricePerSeat} per standard seat equivalent, with a minimum standalone extraction visit of ${ksh(sofaPricing.minimumExtractionVisit)}. Multiple sofas are counted together; shape, construction and condition can change the final seat-equivalent assessment.`}
              />
              <PriceTable
                caption="Sofa cleaning prices by seat count"
                columns={[{ label: "Seats" }, { label: "Guide price", align: "right" }]}
                rows={sofaPricing.seatExamples.map((example) => ({
                  cells: [`${example.seats} seats`, ksh(example.price)],
                }))}
              />
            </div>
            <div id="mattress" className="scroll-mt-24 space-y-4">
              <PanelHeading title="Mattress cleaning" note={mattressPricingNote} />
              <PriceTable
                caption="Mattress cleaning prices by size"
                columns={[{ label: "Mattress size" }, { label: "Guide price", align: "right" }]}
                rows={mattressSizes.map((size) => ({ cells: [size.label, ksh(size.price)] }))}
              />
            </div>
            <div id="carpet" className="scroll-mt-24 space-y-4">
              <PanelHeading
                title="Carpet and rug cleaning"
                note={`Standard fabric at ${ksh(carpetPricing.pricePerSquareMetre)} per m², with a minimum carpet charge of ${ksh(carpetPricing.minimumCharge)}. Specialty rugs and delicate fibres are assessed individually.`}
              />
              <PriceTable
                caption="Carpet cleaning example prices by area"
                columns={[{ label: "Carpet area" }, { label: "Guide price", align: "right" }]}
                rows={carpetPricing.examples.map((example) => ({
                  cells: [`${example.area} m²`, ksh(example.price)],
                }))}
              />
            </div>
          </div>

          {/* House pricing */}
          <div hidden={segment !== "house"} className="space-y-10 pt-10">
            <div id="house-cleaning" className="scroll-mt-24 space-y-4">
              <PanelHeading
                title="House cleaning"
                note="Standard or deep, by house size. Five bedrooms and villas are quoted in writing — every home is a little different."
              />
              <PriceTable
                caption="House cleaning prices by size and type"
                columns={[
                  { label: "House size" },
                  { label: "Standard clean", align: "right" },
                  { label: "Deep clean", align: "right" },
                ]}
                rows={houseCleaningTiers.map((tier) => ({
                  cells: [
                    tier.label,
                    tier.standard === null ? "Quotation" : ksh(tier.standard),
                    tier.deep === null ? "Quotation" : ksh(tier.deep),
                  ],
                  emphasis: tier.standard === null,
                }))}
              />
            </div>
            <div id="total-home-care" className="scroll-mt-24 space-y-4">
              <PanelHeading
                title="Total Home Care"
                note="Combine a house clean with the fabric services actually present in your home — one discount, applied once."
              />
              <PriceTable
                caption="Total Home Care discounts"
                columns={[{ label: "Combination" }, { label: "Discount", align: "right" }]}
                rows={totalHomeCare.map((tier) => ({ cells: [tier.label, tier.discount] }))}
              />
            </div>
          </div>

          {/* Property pricing */}
          <div hidden={segment !== "property"} className="space-y-4 pt-10">
            <div id="property-commercial" className="scroll-mt-24 space-y-4">
              <PanelHeading
                title="Property and commercial"
                note="Move-outs, Airbnb turnovers, offices and more — recurring work is quoted in writing."
              />
              <PriceTable
                caption="Property and commercial pricing"
                columns={[{ label: "Service" }, { label: "Guide price", align: "right" }]}
                rows={propertyCommercialPricing.map((item) => ({ cells: [item.label, item.price] }))}
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Service conditions */}
      <Reveal>
        <section id="service-conditions" aria-labelledby="service-conditions-title" className="scroll-mt-24">
          <h2 id="service-conditions-title" className="font-sans text-[19px] font-bold text-charcoal dark:text-white">
            The conditions behind every price
          </h2>
          <p className="mt-1 text-[14px] leading-6 text-slate-600 dark:text-silver/90">
            {pricingDisclaimer}
          </p>
          <InsetGroup className="mt-6">
            {serviceConditions.map((condition) => (
              <InsetRow
                key={condition}
                title={<span className="text-[13.5px] font-normal leading-5">{condition}</span>}
                icon={<CheckIcon className="h-[18px] w-[18px]" />}
              />
            ))}
          </InsetGroup>
        </section>
      </Reveal>
    </div>
  );
}
