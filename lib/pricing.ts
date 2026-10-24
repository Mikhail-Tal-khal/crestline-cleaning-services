/**
 * Every price on the site lives in this typed file so figures can be updated
 * without touching any component. All amounts are Kenyan shillings (KSh).
 */
export const pricingDisclaimer =
  "All figures are service guides. Final quotations depend on fabric type, condition, access, distance, measurements and confirmed scope.";

export const sofaPricing = {
  pricePerSeat: 600,
  minimumExtractionVisit: 1800,
  seatExamples: [
    { seats: 3, price: 1800 },
    { seats: 4, price: 2400 },
    { seats: 5, price: 3000 },
    { seats: 6, price: 3600 },
    { seats: 7, price: 4200 },
    { seats: 8, price: 4800 },
    { seats: 9, price: 5400 },
    { seats: 10, price: 6000 },
  ],
  notes: [
    "Multiple sofas are counted together in one assessment.",
    "Furniture shape, construction and condition can change the final seat-equivalent assessment.",
  ],
};

export const mattressSizes = [
  { id: "single", label: "Single", price: 1500 },
  { id: "4x6", label: "4 × 6 ft", price: 1900 },
  { id: "5x6", label: "5 × 6 ft", price: 2200 },
  { id: "6x6", label: "6 × 6 ft", price: 2700 },
] as const;

export type MattressSizeId = (typeof mattressSizes)[number]["id"];

export const mattressPricingNote =
  "Standard prices cover one face plus accessible edges unless otherwise quoted.";

export const carpetPricing = {
  pricePerSquareMetre: 250,
  minimumCharge: 1500,
  examples: [
    { area: 6, price: 1500 },
    { area: 8, price: 2000 },
    { area: 12, price: 3000 },
  ],
};

export const fabricPackages = [
  {
    id: "duo",
    name: "Fabric Duo",
    discount: 0.08,
    description:
      "Choose any two categories from sofa, mattress or carpet. An 8% discount applies to the eligible combined price.",
  },
  {
    id: "trio",
    name: "Fabric Trio",
    discount: 0.12,
    description:
      "Choose sofa, mattress and carpet in any quantities. A 12% discount applies to the eligible combined price.",
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
  { label: "Deep home clean plus sofa, mattress and carpet", discount: "12%" },
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
