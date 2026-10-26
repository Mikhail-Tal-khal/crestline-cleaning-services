/**
 * Every price on the site lives in this typed file so figures can be updated
 * without touching any component. All amounts are Kenyan shillings (KSh).
 *
 * Latest Crestline price sheet (October 2026):
 *  - Standard fabric sofa: KSh 500 per seat
 *  - Leather sofa / couch set: KSh 550 per seat
 *  - Dining or office chair: KSh 450 per seat
 *  - Mattress 3×6: 1,700 · 4×6: 2,000 · 5×6: 2,500 · 6×6: 3,000
 *  - Carpet: medium 1,000 · large 1,500
 */
export const pricingDisclaimer =
  "All figures are service guides. Final quotations depend on fabric type, condition, access, distance, measurements and confirmed scope.";

/** Seating, priced per seat. */
export const seatingPricing = {
  standard: {
    id: "standard",
    label: "Standard fabric sofa",
    pricePerSeat: 500,
  },
  leather: {
    id: "leather",
    label: "Leather sofa or couch set",
    pricePerSeat: 550,
  },
  chair: {
    id: "chair",
    label: "Dining or office chair",
    pricePerSeat: 450,
  },
} as const;

export type SeatingType = keyof typeof seatingPricing;

/** Example totals for standard fabric sofas. */
export const sofaSeatExamples = [3, 4, 5, 6, 7, 8, 9, 10].map((seats) => ({
  seats,
  price: seats * seatingPricing.standard.pricePerSeat,
}));

export const seatingNotes = [
  "Multiple sofas are counted together in one assessment.",
  "Furniture shape, construction and condition can change the final seat-equivalent assessment.",
  "Leather, suede and delicate fabrics are assessed before we confirm the method.",
];

export const mattressSizes = [
  { id: "3x6", label: "3 × 6 ft", price: 1700 },
  { id: "4x6", label: "4 × 6 ft", price: 2000 },
  { id: "5x6", label: "5 × 6 ft", price: 2500 },
  { id: "6x6", label: "6 × 6 ft", price: 3000 },
] as const;

export type MattressSizeId = (typeof mattressSizes)[number]["id"];

export const mattressPricingNote =
  "Standard prices cover one face plus accessible edges unless otherwise quoted.";

export const carpetSizes = [
  {
    id: "medium",
    label: "Medium rug",
    price: 1000,
    detail: "Typical living-room or bedroom rug",
  },
  {
    id: "large",
    label: "Large rug",
    price: 1500,
    detail: "Large lounge or dining rug",
  },
] as const;

export type CarpetSizeId = (typeof carpetSizes)[number]["id"];

export const carpetPricingNote =
  "Priced by rug size. Unusually shaped or oversized rugs are assessed individually before we quote.";

export const fabricPackages = [
  {
    id: "duo",
    name: "Fabric Duo",
    discount: 0.08,
    description:
      "Choose any two categories from seating, mattress or carpet. An 8% discount applies to the eligible combined price.",
  },
  {
    id: "trio",
    name: "Fabric Trio",
    discount: 0.12,
    description:
      "Choose seating, mattress and carpet in any quantities. A 12% discount applies to the eligible combined price.",
  },
] as const;

export const packageRulesNote =
  "Discounts apply once and do not stack. Package prices are rounded to the nearest KSh 100.";

export const houseCleaningTiers = [
  { label: "1 bedroom", bedrooms: 1, standard: 2800, deep: 4800 },
  { label: "2 bedrooms", bedrooms: 2, standard: 4000, deep: 6500 },
  { label: "3 bedrooms", bedrooms: 3, standard: 5200, deep: 8500 },
  { label: "4 bedrooms", bedrooms: 4, standard: 6800, deep: 11200 },
  { label: "5+ bedrooms or villas", bedrooms: 5, standard: null, deep: null },
] as const;

export const totalHomeCare = [
  { label: "Standard home clean plus any fabric service", discount: "5%" },
  { label: "Deep home clean plus one fabric category", discount: "8%" },
  { label: "Deep home clean plus two fabric categories", discount: "10%" },
  { label: "Deep home clean plus seating, mattress and carpet", discount: "12%" },
] as const;

export const propertyCommercialPricing = [
  { label: "Move-in or move-out cleaning", price: "2-bedroom property from KSh 6,800" },
  { label: "Airbnb turnover", price: "2-bedroom property from KSh 3,500" },
  { label: "Post-construction cleaning", price: "from KSh 90 per m², minimum KSh 7,000" },
  { label: "Small office cleaning (up to 100 m²)", price: "from KSh 4,500" },
  { label: "Recurring offices and hotels", price: "written quotation" },
  { label: "General cleaners for hire", price: "quotation" },
  { label: "On-demand home cleaning", price: "quotation" },
] as const;

export const serviceConditions = [
  "Prices apply to typically soiled, accessible residential fabrics and surfaces in core Mombasa operating areas.",
  "Extra distance, difficult access, severe staining, pet incidents, heavy soil and special-care materials may require a separate quotation.",
  "Final pricing must be approved before work begins.",
  "Customer water and electricity requirements are confirmed during booking.",
  "Fabric suitability is assessed before extraction.",
  "Permanent stains, odours, wear, colour loss and previous fabric damage may remain.",
  "Exterior high-rise windows, sewage, hazardous materials, industrial waste and extensive mould remediation are outside the standard service scope.",
  "Specialist or high-risk work requires separate assessment and qualified handling.",
] as const;
