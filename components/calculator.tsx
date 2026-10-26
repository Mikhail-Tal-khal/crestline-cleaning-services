"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  calculateEstimate,
  commercialOptions,
  emptyMattresses,
  estimateToSearchParams,
  type CommercialServiceId,
  type EstimateInput,
} from "@/lib/quote";
import { carpetSizes, houseCleaningTiers, mattressSizes, type MattressSizeId } from "@/lib/pricing";
import { ksh } from "@/lib/format";
import Stepper from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ButtonLink } from "@/components/ui/button";
import RollingNumber from "@/components/rolling-number";

type CalcState = {
  sofaOn: boolean;
  sofaSeats: number;
  leatherOn: boolean;
  leatherSeats: number;
  chairsOn: boolean;
  chairCount: number;
  mattressesOn: boolean;
  mattresses: Record<MattressSizeId, number>;
  carpetsOn: boolean;
  carpetMedium: number;
  carpetLarge: number;
  cleaningType: "none" | "standard" | "deep";
  bedrooms: number;
  commercial: CommercialServiceId;
  postConstructionArea: string;
};

const initialState: CalcState = {
  sofaOn: false,
  sofaSeats: 1,
  leatherOn: false,
  leatherSeats: 1,
  chairsOn: false,
  chairCount: 1,
  mattressesOn: false,
  mattresses: { ...emptyMattresses },
  carpetsOn: false,
  carpetMedium: 1,
  carpetLarge: 0,
  cleaningType: "none",
  bedrooms: 2,
  commercial: "none",
  postConstructionArea: "",
};

function toInput(state: CalcState): EstimateInput {
  const area = Number.parseFloat(state.postConstructionArea);
  return {
    sofaSeats: state.sofaOn ? state.sofaSeats : 0,
    leatherSeats: state.leatherOn ? state.leatherSeats : 0,
    chairCount: state.chairsOn ? state.chairCount : 0,
    mattresses: state.mattressesOn ? state.mattresses : { ...emptyMattresses },
    carpetMedium: state.carpetsOn ? state.carpetMedium : 0,
    carpetLarge: state.carpetsOn ? state.carpetLarge : 0,
    bedrooms: state.cleaningType === "none" ? 0 : state.bedrooms,
    cleaningType: state.cleaningType,
    commercial: state.commercial,
    postConstructionArea:
      state.commercial === "post-construction" && Number.isFinite(area) ? area : 0,
  };
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

  const mattressTotal = mattressSizes.reduce((sum, size) => sum + state.mattresses[size.id], 0);

  const expand = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
    className: "overflow-hidden",
  };

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
            {/* Standard sofa */}
            <div className="py-4">
              <Switch
                label="Sofa cleaning (standard fabric)"
                checked={state.sofaOn}
                onChange={(on) => {
                  if (on && state.sofaSeats < 1) update("sofaSeats", 1);
                  update("sofaOn", on);
                }}
              />
              <AnimatePresence initial={false}>
                {state.sofaOn && (
                  <motion.div {...expand}>
                    <div className="pt-4">
                      <Stepper
                        label="Sofa seats"
                        value={state.sofaSeats}
                        onChange={(v) => update("sofaSeats", v)}
                        min={1}
                        max={30}
                        hint="KSh 500 per seat"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Leather */}
            <div className="py-4">
              <Switch
                label="Leather sofa or couch set"
                checked={state.leatherOn}
                onChange={(on) => {
                  if (on && state.leatherSeats < 1) update("leatherSeats", 1);
                  update("leatherOn", on);
                }}
              />
              <AnimatePresence initial={false}>
                {state.leatherOn && (
                  <motion.div {...expand}>
                    <div className="pt-4">
                      <Stepper
                        label="Leather seats"
                        value={state.leatherSeats}
                        onChange={(v) => update("leatherSeats", v)}
                        min={1}
                        max={30}
                        hint="KSh 550 per seat"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chairs */}
            <div className="py-4">
              <Switch
                label="Dining or office chairs"
                checked={state.chairsOn}
                onChange={(on) => {
                  if (on && state.chairCount < 1) update("chairCount", 1);
                  update("chairsOn", on);
                }}
              />
              <AnimatePresence initial={false}>
                {state.chairsOn && (
                  <motion.div {...expand}>
                    <div className="pt-4">
                      <Stepper
                        label="Chairs"
                        value={state.chairCount}
                        onChange={(v) => update("chairCount", v)}
                        min={1}
                        max={40}
                        hint="KSh 450 per chair"
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
                    update("mattresses", { ...state.mattresses, "3x6": 1 });
                  }
                  update("mattressesOn", on);
                }}
              />
              <AnimatePresence initial={false}>
                {state.mattressesOn && (
                  <motion.div {...expand}>
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
                          hint={ksh(size.price)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Carpets */}
            <div className="py-4">
              <Switch
                label="Carpet or rug cleaning"
                checked={state.carpetsOn}
                onChange={(on) => update("carpetsOn", on)}
              />
              <AnimatePresence initial={false}>
                {state.carpetsOn && (
                  <motion.div {...expand}>
                    <div className="grid gap-4 pt-4 sm:grid-cols-2">
                      {carpetSizes.map((size) => (
                        <Stepper
                          key={size.id}
                          label={size.label}
                          value={
                            size.id === "medium" ? state.carpetMedium : state.carpetLarge
                          }
                          onChange={(v) =>
                            update(size.id === "medium" ? "carpetMedium" : "carpetLarge", v)
                          }
                          max={20}
                          hint={`${ksh(size.price)} · ${size.detail}`}
                        />
                      ))}
                    </div>
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
                    {line.amount === null ? "Quotation" : ksh(line.amount)}
                  </p>
                </motion.li>
              ))}
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
                  −{ksh(estimate.discount.amount)}
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
                <strong className="font-semibold text-white">{ksh(estimate.subtotal)}</strong>{" "}
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
