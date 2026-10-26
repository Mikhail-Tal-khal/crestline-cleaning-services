import {
  carpetSizes,
  houseCleaningTiers,
  mattressSizes,
  seatingPricing,
  type MattressSizeId,
} from "./pricing";
import { roundTo100 } from "./format";

/**
 * Shared quotation estimator used by the packages calculator and understood
 * by the request-a-quote form. It produces an *estimate*, never a booking.
 *
 * Pricing model (October 2026 sheet): seating is per seat (standard fabric,
 * leather, dining/office chair), mattresses by size, carpets by rug size.
 */
export type CommercialServiceId =
  | "none"
  | "office-small"
  | "move-in-out"
  | "airbnb-turnover"
  | "post-construction"
  | "recurring"
  | "general-cleaners"
  | "on-demand";

export const commercialOptions: { id: CommercialServiceId; label: string }[] = [
  { id: "none", label: "No commercial service" },
  { id: "office-small", label: "Small office cleaning (up to 100 m²) — from KSh 4,500" },
  { id: "move-in-out", label: "Move-in or move-out cleaning — from KSh 6,800" },
  { id: "airbnb-turnover", label: "Airbnb turnover cleaning — from KSh 3,500" },
  { id: "post-construction", label: "Post-construction cleaning — from KSh 90 per m²" },
  { id: "recurring", label: "Recurring office or hotel cleaning — written quotation" },
  { id: "general-cleaners", label: "General cleaners for hire — quotation" },
  { id: "on-demand", label: "On-demand home cleaning — quotation" },
];

export type EstimateInput = {
  /** Standard fabric sofa seats. */
  sofaSeats: number;
  /** Leather sofa or couch-set seats. */
  leatherSeats: number;
  /** Dining or office chairs. */
  chairCount: number;
  mattresses: Record<MattressSizeId, number>;
  carpetMedium: number;
  carpetLarge: number;
  bedrooms: number; // 0 = none, 5 = "5+"
  cleaningType: "none" | "standard" | "deep";
  commercial: CommercialServiceId;
  postConstructionArea: number;
};

export const emptyMattresses: Record<MattressSizeId, number> = {
  "3x6": 0,
  "4x6": 0,
  "5x6": 0,
  "6x6": 0,
};

export const emptyEstimateInput: EstimateInput = {
  sofaSeats: 0,
  leatherSeats: 0,
  chairCount: 0,
  mattresses: { ...emptyMattresses },
  carpetMedium: 0,
  carpetLarge: 0,
  bedrooms: 0,
  cleaningType: "none",
  commercial: "none",
  postConstructionArea: 0,
};

export type EstimateLine = {
  label: string;
  detail?: string;
  amount: number | null; // null = priced by written quotation
};

export type Estimate = {
  lines: EstimateLine[];
  discount: { label: string; amount: number } | null;
  subtotal: number;
  estimatedTotal: number | null;
  quotationItems: string[];
  isEmpty: boolean;
};

function num(v: number): number {
  return Number.isFinite(v) && v > 0 ? v : 0;
}

export function mattressCount(input: EstimateInput): number {
  return mattressSizes.reduce((sum, size) => sum + num(input.mattresses[size.id]), 0);
}

export function carpetCount(input: EstimateInput): number {
  return num(input.carpetMedium) + num(input.carpetLarge);
}

export function seatingCount(input: EstimateInput): number {
  return num(input.sofaSeats) + num(input.leatherSeats) + num(input.chairCount);
}

/** Fabric categories present: seating, mattress, carpet. */
export function fabricCategoryCount(input: EstimateInput): number {
  let count = 0;
  if (seatingCount(input) > 0) count += 1;
  if (mattressCount(input) > 0) count += 1;
  if (carpetCount(input) > 0) count += 1;
  return count;
}

export function calculateEstimate(input: EstimateInput): Estimate {
  const lines: EstimateLine[] = [];
  const quotationItems: string[] = [];

  // --- Seating -------------------------------------------------------------
  let seatingSubtotal = 0;

  const standardSeats = Math.floor(num(input.sofaSeats));
  if (standardSeats > 0) {
    const amount = standardSeats * seatingPricing.standard.pricePerSeat;
    seatingSubtotal += amount;
    lines.push({
      label: `Sofa cleaning — ${standardSeats} seat${standardSeats === 1 ? "" : "s"}`,
      detail: `${standardSeats} × KSh ${seatingPricing.standard.pricePerSeat} per seat`,
      amount,
    });
  }

  const leatherSeats = Math.floor(num(input.leatherSeats));
  if (leatherSeats > 0) {
    const amount = leatherSeats * seatingPricing.leather.pricePerSeat;
    seatingSubtotal += amount;
    lines.push({
      label: `Leather sofa cleaning — ${leatherSeats} seat${leatherSeats === 1 ? "" : "s"}`,
      detail: `${leatherSeats} × KSh ${seatingPricing.leather.pricePerSeat} per seat`,
      amount,
    });
  }

  const chairs = Math.floor(num(input.chairCount));
  if (chairs > 0) {
    const amount = chairs * seatingPricing.chair.pricePerSeat;
    seatingSubtotal += amount;
    lines.push({
      label: `${chairs} dining or office chair${chairs === 1 ? "" : "s"}`,
      detail: `${chairs} × KSh ${seatingPricing.chair.pricePerSeat} per chair`,
      amount,
    });
  }

  // --- Mattresses ----------------------------------------------------------
  let mattressSubtotal = 0;
  const mCount = mattressCount(input);
  if (mCount > 0) {
    const detail = mattressSizes
      .filter((s) => num(input.mattresses[s.id]) > 0)
      .map((s) => `${input.mattresses[s.id]} × ${s.label}`)
      .join(", ");
    mattressSubtotal = mattressSizes.reduce(
      (sum, s) => sum + num(input.mattresses[s.id]) * s.price,
      0
    );
    lines.push({
      label: `Mattress cleaning — ${mCount} mattress${mCount === 1 ? "" : "es"}`,
      detail: `${detail} (one face plus accessible edges)`,
      amount: mattressSubtotal,
    });
  }

  // --- Carpets -------------------------------------------------------------
  let carpetSubtotal = 0;

  const mediumRugs = Math.floor(num(input.carpetMedium));
  if (mediumRugs > 0) {
    const size = carpetSizes.find((s) => s.id === "medium")!;
    const amount = mediumRugs * size.price;
    carpetSubtotal += amount;
    lines.push({
      label: `Carpet cleaning — ${mediumRugs} medium rug${mediumRugs === 1 ? "" : "s"}`,
      detail: `${mediumRugs} × KSh ${size.price}`,
      amount,
    });
  }

  const largeRugs = Math.floor(num(input.carpetLarge));
  if (largeRugs > 0) {
    const size = carpetSizes.find((s) => s.id === "large")!;
    const amount = largeRugs * size.price;
    carpetSubtotal += amount;
    lines.push({
      label: `Carpet cleaning — ${largeRugs} large rug${largeRugs === 1 ? "" : "s"}`,
      detail: `${largeRugs} × KSh ${size.price}`,
      amount,
    });
  }

  const fabricSubtotal = seatingSubtotal + mattressSubtotal + carpetSubtotal;

  // --- House cleaning ------------------------------------------------------
  let houseAmount: number | null = null;
  const bedrooms = Math.floor(num(input.bedrooms));
  const wantsHouse = bedrooms > 0 && input.cleaningType !== "none";
  if (wantsHouse) {
    const tier = houseCleaningTiers.find((t) => t.bedrooms === bedrooms);
    if (tier && (tier.standard !== null || tier.deep !== null)) {
      houseAmount = input.cleaningType === "deep" ? tier.deep : tier.standard;
      lines.push({
        label: `${input.cleaningType === "deep" ? "Deep" : "Standard"} house cleaning — ${tier.label}`,
        amount: houseAmount,
      });
    } else {
      const label = `${input.cleaningType === "deep" ? "Deep" : "Standard"} house cleaning — ${
        bedrooms === 5 ? "5+ bedrooms or villa" : `${bedrooms} bedrooms`
      }`;
      quotationItems.push(`House cleaning — ${bedrooms === 5 ? "5+ bedrooms or villa" : `${bedrooms} bedrooms`}`);
      lines.push({ label, detail: "Priced by written quotation", amount: null });
    }
  }

  // --- Commercial services --------------------------------------------------
  switch (input.commercial) {
    case "office-small":
      lines.push({ label: "Small office cleaning (up to 100 m²)", detail: "Starting price", amount: 4500 });
      break;
    case "move-in-out":
      lines.push({ label: "Move-in or move-out cleaning", detail: "2-bedroom baseline", amount: 6800 });
      break;
    case "airbnb-turnover":
      lines.push({ label: "Airbnb turnover cleaning", detail: "2-bedroom baseline", amount: 3500 });
      break;
    case "post-construction": {
      const area = num(input.postConstructionArea);
      if (area > 0) {
        const raw = area * 90;
        lines.push({
          label: "Post-construction cleaning",
          detail: `${area} m² at KSh 90 per m²${raw < 7000 ? " (minimum charge applies)" : ""}`,
          amount: Math.max(raw, 7000),
        });
      } else {
        quotationItems.push("Post-construction cleaning");
        lines.push({
          label: "Post-construction cleaning",
          detail: "Priced by written quotation — enter the floor area for an estimate",
          amount: null,
        });
      }
      break;
    }
    case "recurring":
      quotationItems.push("Recurring office or hotel cleaning");
      lines.push({ label: "Recurring office or hotel cleaning", detail: "Priced by written quotation", amount: null });
      break;
    case "general-cleaners":
      quotationItems.push("General cleaners for hire");
      lines.push({ label: "General cleaners for hire", detail: "Priced by quotation", amount: null });
      break;
    case "on-demand":
      quotationItems.push("On-demand home cleaning");
      lines.push({ label: "On-demand home cleaning", detail: "Priced by quotation", amount: null });
      break;
    case "none":
    default:
      break;
  }

  let subtotal = lines.reduce((sum, line) => sum + (line.amount ?? 0), 0);

  // --- Package / Total Home Care discount (applies once, never stacks) ------
  let discount: Estimate["discount"] = null;
  const fabricCats = fabricCategoryCount(input);
  const eligibleBase = fabricSubtotal + (houseAmount ?? 0);

  if (eligibleBase > 0) {
    let rate = 0;
    let label = "";
    if (wantsHouse && houseAmount !== null) {
      if (input.cleaningType === "standard" && fabricCats >= 1) {
        rate = 0.05;
        label = "Total Home Care — standard clean plus fabric service (5%)";
      } else if (input.cleaningType === "deep" && fabricCats >= 1) {
        if (fabricCats === 1) {
          rate = 0.08;
          label = "Total Home Care — deep clean plus one fabric category (8%)";
        } else if (fabricCats === 2) {
          rate = 0.1;
          label = "Total Home Care — deep clean plus two fabric categories (10%)";
        } else {
          rate = 0.12;
          label = "Total Home Care — deep clean plus seating, mattress and carpet (12%)";
        }
      }
    } else if (!wantsHouse || houseAmount === null) {
      if (fabricCats === 2) {
        rate = 0.08;
        label = "Fabric Duo — two fabric categories (8%)";
      } else if (fabricCats === 3) {
        rate = 0.12;
        label = "Fabric Trio — seating, mattress and carpet (12%)";
      }
    }
    if (rate > 0) {
      const discountedTotal = roundTo100(eligibleBase * (1 - rate));
      discount = { label, amount: eligibleBase - discountedTotal };
    }
  }

  if (discount) subtotal -= discount.amount;
  if (subtotal < 0) subtotal = 0;

  const hasQuotationItems = quotationItems.length > 0;
  const isEmpty = lines.length === 0;

  return {
    lines,
    discount,
    subtotal,
    estimatedTotal: hasQuotationItems || isEmpty ? null : subtotal,
    quotationItems,
    isEmpty,
  };
}

/** Encode an estimate selection into URL search params for the quote form. */
export function estimateToSearchParams(input: EstimateInput): string {
  const params = new URLSearchParams();
  if (input.sofaSeats > 0) params.set("sofa", String(Math.floor(input.sofaSeats)));
  if (input.leatherSeats > 0) params.set("leather", String(Math.floor(input.leatherSeats)));
  if (input.chairCount > 0) params.set("chairs", String(Math.floor(input.chairCount)));
  for (const size of mattressSizes) {
    const count = input.mattresses[size.id];
    if (count > 0) params.set(`m_${size.id}`, String(Math.floor(count)));
  }
  if (input.carpetMedium > 0) params.set("rugm", String(Math.floor(input.carpetMedium)));
  if (input.carpetLarge > 0) params.set("rugl", String(Math.floor(input.carpetLarge)));
  if (input.bedrooms > 0) params.set("bd", String(Math.floor(input.bedrooms)));
  if (input.cleaningType !== "none") params.set("ct", input.cleaningType);
  if (input.commercial !== "none") params.set("cm", input.commercial);
  if (input.postConstructionArea > 0) params.set("pca", String(input.postConstructionArea));
  return params.toString();
}

function parseNumber(value: string | string[] | undefined): number {
  if (Array.isArray(value)) value = value[0];
  const n = Number.parseFloat(value ?? "");
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/** Parse estimate search params back into an input (all invalid values -> 0). */
export function parseEstimateSearchParams(
  sp: Record<string, string | string[] | undefined>
): EstimateInput {
  const cleaningType = sp.ct === "standard" || sp.ct === "deep" ? sp.ct : "none";
  const commercial = commercialOptions.some((o) => o.id === sp.cm)
    ? (sp.cm as CommercialServiceId)
    : "none";
  const bedrooms = Math.min(5, Math.max(0, Math.floor(parseNumber(sp.bd))));
  const mattresses: Record<MattressSizeId, number> = { ...emptyMattresses };
  for (const size of mattressSizes) {
    const count = Math.floor(parseNumber(sp[`m_${size.id}`]));
    mattresses[size.id] = Math.min(30, Math.max(0, count));
  }
  return {
    sofaSeats: Math.min(60, Math.floor(parseNumber(sp.sofa))),
    leatherSeats: Math.min(60, Math.floor(parseNumber(sp.leather))),
    chairCount: Math.min(120, Math.floor(parseNumber(sp.chairs))),
    mattresses,
    carpetMedium: Math.min(40, Math.floor(parseNumber(sp.rugm))),
    carpetLarge: Math.min(40, Math.floor(parseNumber(sp.rugl))),
    bedrooms,
    cleaningType: bedrooms > 0 ? cleaningType : "none",
    commercial,
    postConstructionArea: Math.min(100000, parseNumber(sp.pca)),
  };
}

/** Which services the estimate implies, so the quote form can pre-select them. */
export function estimateToServiceIds(input: EstimateInput): string[] {
  const ids: string[] = [];
  if (seatingCount(input) > 0) ids.push("sofa");
  if (mattressCount(input) > 0) ids.push("mattress");
  if (carpetCount(input) > 0) ids.push("carpet");
  if (input.bedrooms > 0 && input.cleaningType !== "none") {
    ids.push(input.cleaningType === "deep" ? "deep-house" : "standard-house");
  }
  switch (input.commercial) {
    case "office-small":
    case "recurring":
      ids.push("office-commercial");
      break;
    case "move-in-out":
      ids.push("move-in-out");
      break;
    case "airbnb-turnover":
      ids.push("airbnb");
      break;
    case "post-construction":
      ids.push("post-construction");
      break;
    case "general-cleaners":
      ids.push("general-cleaners");
      break;
    case "on-demand":
      ids.push("on-demand");
      break;
    case "none":
      break;
  }
  return ids;
}
