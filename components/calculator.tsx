"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  calculateEstimate,
  commercialOptions,
  estimateToSearchParams,
  emptyMattresses,
  type CommercialServiceId,
  type EstimateInput,
} from "@/lib/quote";
import { houseCleaningTiers, mattressSizes, type MattressSizeId } from "@/lib/pricing";
import Stepper from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ButtonLink } from "@/components/ui/button";
import RollingNumber from "@/components/rolling-number";
import { cn } from "@/lib/cn";

type CalcState = {
  sofaOn: boolean;
  sofaSeats: number;
  mattressesOn: boolean;
  mattresses: Record<MattressSizeId, number>;
  carpetOn: boolean;
  carpetLength: string;
  carpetWidth: string;
  cleaningType: "none" | "standard" | "deep";
  bedrooms: number;
  commercial: CommercialServiceId;
  postConstructionArea: string;
};

const initialState: CalcState = {
  sofaOn: false,
  sofaSeats: 1,
  mattressesOn: false,
  mattresses: { ...emptyMattresses },
  carpetOn: false,
  carpetLength: "",
  carpetWidth: "",
  cleaningType: "none",
  bedrooms: 2,
  commercial: "none",
  postConstructionArea: "",
};

function toInput(state: CalcState): EstimateInput {
  const length = Number.parseFloat(state.carpetLength);
  const width = Number.parseFloat(state.carpetWidth);
  const area = Number.parseFloat(state.postConstructionArea);
  return {
    sofaSeats: state.sofaOn ? state.sofaSeats : 0,
    mattresses: state.mattressesOn ? state.mattresses : { ...emptyMattresses },
    carpetLength: state.carpetOn && Number.isFinite(length) ? length : 0,
    carpetWidth: state.carpetOn && Number.isFinite(width) ? width : 0,
    bedrooms: state.cleaningType === "none" ? 0 : state.bedrooms,
    cleaningType: state.cleaningType,
    commercial: state.commercial,
    postConstructionArea:
      state.commercial === "post-construction" && Number.isFinite(area) ? area : 0,
  };
}

function parseDecimal(value: string, max: number): number {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(cleaned);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.min(max, Math.round(parsed * 100) / 100);
}

/**
 * iOS-style quotation estimator: grouped rows with toggles, steppers and a
 * segmented control; a sticky estimated-total bar on mobile; rolling number
 * transitions; a discount badge that pops in when a package unlocks.
 */
export default function QuoteCalculator() {
  const [state, setState] = useState<CalcState>(initialState);
  const update = <K extends keyof CalcState>(key: K, value: CalcState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const input = useMemo(() => toInput(state), [state]);
  const estimate = useMemo(() => calculateEstimate(input), [input]);
  const quoteHref = `/request-a-quote?${estimateToSearchParams(input)}`;

  const mattressTotal = mattressSizes.reduce(
    (sum, size) => sum + state.mattresses[size.id],
    0
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
      {/* --- Inputs ------------------------------------------------------------ */}
      <div className="space-y-5">
        <section
          aria-labelledby="calc-fabric-title"
          className="rounded-[24px] bg-white p-5 shadow-card dark:bg-white/[0.06] sm:p-6"
        >
          <h3 id="calc-fabric-title" className="font-sans text-[16px] font-bold text-charcoal dark:text-white">
            Fabric services
          </h3>
          <div className="mt-4 divide-y divide-navy/[0.06] dark:divide-white/[0.08]">
            {/* Sofa */}
            <div className="py-4">
              <Switch
                label="Sofa cleaning"
                checked={state.sofaOn}
                onChange={(on) => {
                  if (on && state.sofaSeats < 1) update("sofaSeats", 1);
                  update("sofaOn", on);
                }}
              />
              <AnimatePresence initial={false}>
                {state.sofaOn && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <Stepper
                        label="Sofa seats"
                        value={state.sofaSeats}
                        onChange={(v) => update("sofaSeats", v)}
                        min={1}
                        max={30}
                        hint="Standard seat equivalents at KSh 600 each"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mattresses */}
            <div className="py-4">
              <Switch
                label="Mattress cleaning"
                checked={state.mattressesOn}
                onChange={(on) => {
                  if (on && mattressTotal === 0) {
                    update("mattresses", { ...state.mattresses, single: 1 });
                  }
                  update("mattressesOn", on);
                }}
              />
              <AnimatePresence initial={false}>
                {state.mattressesOn && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-4 pt-4 sm:grid-cols-2">
                      {mattressSizes.map((size) => (
                        <Stepper
                          key={size.id}
                          label={size.label}
                          value={state.mattresses[size.id]}
                          onChange={(v) =>
                            update("mattresses", { ...state.mattresses, [size.id]: v })
                          }
                          max={20}
                          hint="One face plus edges"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Carpet */}
            <div className="py-4">
              <Switch
                label="Carpet or rug cleaning"
                checked={state.carpetOn}
                onChange={(on) => update("carpetOn", on)}
              />
              <AnimatePresence initial={false}>
                {state.carpetOn && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-4 pt-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="calc-carpet-length" className="field-label">
                          Length (m)
                        </label>
                        <input
                          id="calc-carpet-length"
                          inputMode="decimal"
                          value={state.carpetLength}
                          onChange={(e) => update("carpetLength", e.target.value)}
                          placeholder="e.g. 3"
                          className="field-input mt-1.5"
                        />
                      </div>
                      <div>
                        <label htmlFor="calc-carpet-width" className="field-label">
                          Width (m)
                        </label>
                        <input
                          id="calc-carpet-width"
                          inputMode="decimal"
                          value={state.carpetWidth}
                          onChange={(e) => update("carpetWidth", e.target.value)}
                          placeholder="e.g. 2"
                          className="field-input mt-1.5"
                        />
                      </div>
                    </div>
                    <p className="mt-2.5 text-[13px] leading-5 text-slate-500 dark:text-silver/80">
                      Standard fabric at KSh 250 per m² · minimum charge KSh 1,500.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="calc-home-title"
          className="rounded-[24px] bg-white p-5 shadow-card dark:bg-white/[0.06] sm:p-6"
        >
          <h3 id="calc-home-title" className="font-sans text-[16px] font-bold text-charcoal dark:text-white">
            House cleaning
          </h3>
          <div className="mt-4">
            <SegmentedControl
              label="Cleaning type"
              options={[
                { value: "none", label: "None" },
                { value: "standard", label: "Standard" },
                { value: "deep", label: "Deep" },
              ]}
              value={state.cleaningType}
              onChange={(value) => update("cleaningType", value)}
            />
            {state.cleaningType !== "none" && (
              <div className="mt-4">
                <label htmlFor="calc-house-size" className="field-label">
                  House size
                </label>
                <select
                  id="calc-house-size"
                  value={String(state.bedrooms)}
                  onChange={(e) => update("bedrooms", Number.parseInt(e.target.value, 10))}
                  className="field-static mt-1.5"
                >
                  {houseCleaningTiers.map((tier) => (
                    <option key={tier.bedrooms} value={String(tier.bedrooms)}>
                      {tier.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-[13px] leading-5 text-slate-500 dark:text-silver/80">
                  5+ bedrooms and villas are priced by written quotation.
                </p>
              </div>
            )}
          </div>
        </section>

        <section
          aria-labelledby="calc-commercial-title"
          className="rounded-[24px] bg-white p-5 shadow-card dark:bg-white/[0.06] sm:p-6"
        >
          <h3 id="calc-commercial-title" className="font-sans text-[16px] font-bold text-charcoal dark:text-white">
            Commercial service
          </h3>
          <div className="mt-4">
            <label htmlFor="calc-commercial" className="field-label">
              Optional service
            </label>
            <select
              id="calc-commercial"
              value={state.commercial}
              onChange={(e) => update("commercial", e.target.value as CommercialServiceId)}
              className="field-static mt-1.5"
            >
              {commercialOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            {state.commercial === "post-construction" && (
              <div className="mt-4 max-w-xs">
                <label htmlFor="calc-pca" className="field-label">
                  Floor area (m²)
                </label>
                <input
                  id="calc-pca"
                  inputMode="decimal"
                  value={state.postConstructionArea}
                  onChange={(e) => update("postConstructionArea", e.target.value)}
                  placeholder="e.g. 120"
                  className="field-input mt-1.5"
                />
                <p className="mt-1.5 text-[13px] text-slate-500 dark:text-silver/80">
                  From KSh 90 per m², minimum KSh 7,000.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* --- Summary panel (desktop sticky) ------------------------------------ */}
      <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
        <EstimatePanel estimate={estimate} quoteHref={quoteHref} />
      </div>

      {/* --- Sticky total bar (mobile, above the tab bar) ---------------------- */}
      {!estimate.isEmpty && (
        <div className="sticky bottom-[calc(env(safe-area-inset-bottom)+5.6rem)] z-30 lg:hidden">
          <div className="flex items-center justify-between gap-3 rounded-[20px] bg-navy px-5 py-3 shadow-tab">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-silver/80">
                Estimated total
              </p>
              {estimate.estimatedTotal !== null ? (
                <RollingNumber
                  value={estimate.estimatedTotal}
                  className="font-sans text-[20px] font-bold text-white"
                />
              ) : (
                <p className="font-sans text-[15px] font-bold text-white">By quotation</p>
              )}
            </div>
            <ButtonLink href={quoteHref} variant="bright" size="sm">
              Request This Quote
            </ButtonLink>
          </div>
        </div>
      )}

      {/* --- Summary panel (mobile, inline after inputs) ----------------------- */}
      <div className="lg:hidden">
        <EstimatePanel estimate={estimate} quoteHref={quoteHref} />
      </div>
    </div>
  );
}

function EstimatePanel({
  estimate,
  quoteHref,
}: {
  estimate: ReturnType<typeof calculateEstimate>;
  quoteHref: string;
}) {
  return (
    <div className="on-navy mt-8 rounded-[24px] bg-navy p-6 shadow-frame lg:mt-0">
      <h3 className="font-sans text-[17px] font-bold text-white">Your estimate</h3>

      {estimate.isEmpty ? (
        <p className="mt-4 text-sm leading-6 text-silver">
          Toggle what you need and your itemised estimate will appear here.
        </p>
      ) : (
        <>
          <ul className="mt-4 divide-y divide-white/10">
            <AnimatePresence initial={false}>
              {estimate.lines.map((line) => (
                <motion.li
                  key={line.label}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-5 text-white">{line.label}</p>
                    {line.detail && (
                      <p className="mt-0.5 text-xs leading-5 text-silver/80">{line.detail}</p>
                    )}
                  </div>
                  <p className="whitespace-nowrap font-sans text-sm font-bold tabular-nums text-silver">
                    {line.amount === null ? "Quotation" : `KSh ${line.amount.toLocaleString("en-US")}`}
                  </p>
                </motion.li>
              ))}
              {estimate.minimumAdjustment && (
                <motion.li
                  key="min"
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start justify-between gap-4 py-3"
                >
                  <p className="text-sm leading-5 text-silver/80">
                    {estimate.minimumAdjustment.label}
                  </p>
                  <p className="whitespace-nowrap font-sans text-sm font-bold tabular-nums text-silver">
                    {`KSh ${estimate.minimumAdjustment.amount.toLocaleString("en-US")}`}
                  </p>
                </motion.li>
              )}
            </AnimatePresence>
          </ul>

          <AnimatePresence>
            {estimate.discount && (
              <motion.p
                key="discount"
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                className="mt-4 flex items-start justify-between gap-4 rounded-[16px] bg-bright/15 px-4 py-3 text-sm text-bright"
              >
                <span>{estimate.discount.label}</span>
                <span className="whitespace-nowrap font-sans font-bold tabular-nums">
                  −
                  {`KSh ${estimate.discount.amount.toLocaleString("en-US")}`}
                </span>
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-5 border-t-[0.5px] border-white/15 pt-5">
            {estimate.estimatedTotal !== null ? (
              <div className="flex items-end justify-between gap-4">
                <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-silver">
                  Estimated total
                </span>
                <RollingNumber
                  value={estimate.estimatedTotal}
                  className="font-sans text-[2rem] font-extrabold leading-none text-white"
                />
              </div>
            ) : (
              <p className="text-sm leading-6 text-silver">
                Some items are priced by written quotation. The services above total{" "}
                <strong className="font-semibold text-white">
                  {`KSh ${estimate.subtotal.toLocaleString("en-US")}`}
                </strong>{" "}
                before those.
              </p>
            )}
          </div>

          <div className="mt-7">
            <ButtonLink href={quoteHref} variant="bright" size="lg" className="w-full">
              Request This Quote
            </ButtonLink>
            <p className="mt-3 text-center text-xs leading-5 text-silver/70">
              Estimate only — it doesn&apos;t confirm a booking.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
