/**
 * All cleaning services offered by Crestline Cleaning Services.
 * Copy discipline: warm, human, honest — and no sterilisation, health-outcome
 * or "removes everything" claims. The notes keep every limit from the brief.
 */
export type ServiceId =
  | "sofa"
  | "carpet"
  | "mattress"
  | "vacuum"
  | "standard-house"
  | "deep-house"
  | "move-in-out"
  | "airbnb"
  | "post-construction"
  | "office-commercial"
  | "general-cleaners"
  | "on-demand";

export type Service = {
  id: ServiceId;
  name: string;
  short: string;
  intro: string;
  includes: string[];
  notes: string[];
  pricingNote?: string;
  /** Featured on the homepage service grid. */
  featured?: boolean;
  image?: string;
  imageAlt?: string;
};

export const services: Service[] = [
  {
    id: "sofa",
    name: "Sofa and upholstery cleaning",
    short: "Your sofa gets the careful treatment — fabric check first, then a proper deep clean.",
    intro:
      "Your sofa works hard — family, guests, movie nights, everyday life. We start by checking the fabric, then vacuum it properly, treat spots where it's safe, and use controlled extraction with repeat passes so it dries right. And if a stain is permanent, we'll tell you honestly before we start.",
    includes: [
      "Fabric assessment",
      "Dry vacuuming",
      "Appropriate spot pre-treatment",
      "Controlled spray extraction on suitable fabrics",
      "Repeat suction passes",
      "Final inspection",
      "Drying and ventilation guidance",
    ],
    notes: [
      "Delicate fabrics, leather, suede, oversized pieces or unusual construction? Send us photos or we'll take a look in person before we confirm the method.",
      "Some stains, odours and wear are there to stay. If a mark is permanent, we'll say so honestly rather than promise what we can't do.",
    ],
    pricingNote: "From KSh 500 per standard seat · leather KSh 550 · chairs KSh 450",
    featured: true,
    image: "/images/sofa-cleaning.jpg",
    imageAlt:
      "Technician in a royal-blue Crestline-style uniform performing controlled extraction cleaning on a fabric sofa",
  },
  {
    id: "carpet",
    name: "Carpet and rug cleaning",
    short: "Measured properly, vacuumed thoroughly, and extraction-cleaned on materials that suit it.",
    intro:
      "We measure your carpet or rug by the square metre, vacuum it thoroughly, and clean it according to its material. Where extraction is safe, we work in controlled passes with repeat suction — and you get clear drying guidance at the end, so you know exactly what to expect.",
    includes: [
      "Carpet and rug assessment",
      "Measurement by square metre",
      "Thorough vacuuming",
      "Appropriate pre-treatment",
      "Extraction cleaning on suitable materials",
      "Repeat suction passes",
      "Drying guidance",
    ],
    notes: [
      "Specialty rugs and delicate fibres get a proper individual assessment before we commit to any method.",
    ],
    pricingNote: "Medium rugs KSh 1,000 · large rugs KSh 1,500",
    featured: true,
    image: "/images/carpet-cleaning.jpg",
    imageAlt:
      "Professional cleaner in a royal-blue uniform extraction-cleaning a patterned rug in a Mombasa home",
  },
  {
    id: "mattress",
    name: "Mattress cleaning",
    short: "A proper deep clean for the surface you spend a third of your life on.",
    intro:
      "You spend a third of your life on your mattress — it deserves real care. We check the surface, dry vacuum in detail, treat spots where it's suitable, and extract where the material allows — including the edges most cleanings miss.",
    includes: [
      "Surface assessment",
      "Detailed dry vacuuming",
      "Spot treatment where suitable",
      "Controlled extraction where the material permits",
      "Edge cleaning",
      "Repeat suction passes",
      "Ventilation and drying guidance",
    ],
    notes: [
      "Standard prices cover one face plus the accessible edges. Want the other face done too? We'll quote it separately.",
    ],
    pricingNote: "From KSh 1,700 for a 3 × 6 ft mattress (one face plus edges)",
    featured: true,
    image: "/images/mattress-cleaning.jpg",
    imageAlt:
      "Technician in a royal-blue uniform vacuuming a mattress with a professional upholstery nozzle",
  },
  {
    id: "vacuum",
    name: "Professional vacuum cleaning",
    short: "Detailed vacuuming for carpets, rugs, upholstery and mattresses — on its own or as the first step of a deep clean.",
    intro:
      "Good cleaning starts with good vacuuming. It's a service in its own right — and the essential first step of every extraction clean. We cover carpets, rugs, upholstery, mattresses and accessible floors, with proper equipment and a careful eye.",
    includes: [
      "Carpets",
      "Rugs",
      "Upholstery",
      "Mattresses",
      "Accessible floor areas",
      "Pre-extraction dry vacuuming",
      "Detailed vacuuming as a standalone service when quoted",
    ],
    notes: [
      "Standalone vacuuming is quoted on the items and areas involved — send us the details and we'll price it clearly.",
    ],
    pricingNote: "Quoted with your booking",
    featured: true,
    image: "/images/equipment-detail.jpg",
    imageAlt: "Professional cleaning equipment — extraction machine, sprayer, brushes and cloths — neatly arranged",
  },
  {
    id: "standard-house",
    name: "Standard house cleaning",
    short: "The everyday clean that keeps your home feeling settled.",
    intro:
      "This is the dependable routine clean: dusting the surfaces you can reach, mirrors and interior glass, sweeping and vacuuming, mopping, kitchen counters, appliance exteriors, washrooms and bins — finished with a proper walk-through before we leave.",
    includes: [
      "Accessible dusting",
      "Mirrors and accessible interior glass",
      "Sweeping and vacuuming",
      "Floor mopping",
      "Kitchen counters",
      "Appliance exteriors",
      "Washrooms",
      "Bins",
      "Final inspection",
    ],
    notes: [],
    pricingNote: "1-bedroom home from KSh 2,800",
    featured: true,
    image: "/images/hero-living.jpg",
    imageAlt: "A bright, well-kept living room in a coastal Mombasa home",
  },
  {
    id: "deep-house",
    name: "Deep house cleaning",
    short: "Everything in the standard clean, taken further — degreasing, descaling, edges and corners.",
    intro:
      "Some homes need more than the routine. A deep clean covers everything in Standard Cleaning and goes further: detailed degreasing, safe descaling, fixture edges, corners, skirting boards, reachable tiles, and the dirt that builds up quietly over months.",
    includes: [
      "More detailed degreasing",
      "Safe descaling",
      "Fixture edges",
      "Corners",
      "Skirting boards",
      "Reachable tiles",
      "Heavier accumulated dirt",
    ],
    notes: [
      "Severe grease, paint, construction residue or anything hazardous? We'll inspect first and quote honestly before we take it on.",
    ],
    pricingNote: "1-bedroom home from KSh 4,800",
    featured: true,
  },
  {
    id: "move-in-out",
    name: "Move-in and move-out cleaning",
    short: "Start the next chapter in a properly cleaned space.",
    intro:
      "Moving is stressful enough without cleaning on top of it. For vacant or transitioning homes, we clean the accessible surfaces, floors, bathrooms and kitchen areas — cupboards too, where we've agreed — and finish with a readiness walk-through before handover.",
    includes: [
      "Accessible surfaces",
      "Floors",
      "Bathrooms",
      "Kitchen areas",
      "Cupboards where agreed",
      "Final readiness inspection",
    ],
    notes: [
      "Cupboards and any extra scope are agreed in the quotation — no surprises on the day.",
    ],
    pricingNote: "2-bedroom property from KSh 6,800",
    featured: true,
  },
  {
    id: "airbnb",
    name: "Airbnb turnover cleaning",
    short: "Guest-ready between every check-in, without you lifting a finger.",
    intro:
      "Your guests should walk into a space that feels fresh every single time. Between check-outs we clean, reset the property, empty bins, sort the washrooms and kitchen surfaces, and make beds with the clean linen you provide — noting inventory or damage where we've agreed to.",
    includes: [
      "Cleaning between guests",
      "Property reset",
      "Bins",
      "Washrooms",
      "Kitchen surfaces",
      "Bed making with client-provided clean linen",
      "Inventory or damage observations where agreed",
    ],
    notes: [
      "This one is worth being clear about: we clean, we don't manage properties.",
      "Clean linen comes from you or your host — we make the beds with it.",
    ],
    pricingNote: "2-bedroom property from KSh 3,500",
    featured: true,
  },
  {
    id: "post-construction",
    name: "Post-construction cleaning",
    short: "From building site to living space — fine dust included.",
    intro:
      "After the builders leave, the fine dust settles everywhere. We remove it properly — surfaces wiped, floors cleaned, light and safe residue cleared — and finish with a presentation clean that's ready to live in.",
    includes: [
      "Fine-dust removal",
      "Surface wiping",
      "Floor cleaning",
      "Removal of light, safe construction residue",
      "Final presentation cleaning",
    ],
    notes: [
      "Paint, cement, adhesive, heavy debris or work at height needs its own assessment — we'll tell you straight what we can handle and what needs a specialist.",
    ],
    pricingNote: "From KSh 90 per m² (minimum KSh 7,000)",
    featured: true,
  },
  {
    id: "office-commercial",
    name: "Office and commercial cleaning",
    short: "Offices, hotels and commercial spaces cleaned on a schedule that suits you.",
    intro:
      "A clean workspace changes how a day feels. We clean desks and accessible surfaces, floors, pantry areas, washrooms and reception spaces on an agreed schedule. For hotels and hospitality, we quote in writing and work with supervised teams you can rely on.",
    includes: [
      "Desks and accessible surfaces",
      "Floors",
      "Pantry areas",
      "Washrooms",
      "Reception spaces",
      "Scheduled office cleaning",
      "Hotel and hospitality cleaning by written quotation",
      "Recurring cleaning schedules",
      "Supervised cleaning teams",
    ],
    notes: [
      "Recurring schedules and hospitality properties are quoted in writing once we've understood your space.",
    ],
    pricingNote: "Small offices up to 100 m² from KSh 4,500",
    featured: true,
    image: "/images/office-cleaning.jpg",
    imageAlt:
      "Technician in a royal-blue uniform vacuuming the carpet of an organised, modern office",
  },
  {
    id: "general-cleaners",
    name: "General cleaners for hire",
    short: "Reliable extra hands for homes, offices and events — with the scope agreed upfront.",
    intro:
      "Sometimes you just need capable, trustworthy people. Our trained general cleaners take on agreed residential, office, event-support or property-cleaning duties — with the scope, hours, supervision, supplies and transport all confirmed in the quotation first.",
    includes: [
      "Residential cleaning duties",
      "Office cleaning duties",
      "Event-support cleaning",
      "Property cleaning duties",
      "Scope and working hours set in the quotation",
      "Supervision arrangements agreed in advance",
    ],
    notes: [
      "Scope, hours, supervision, supplies and transport are confirmed in writing before anyone arrives.",
    ],
    pricingNote: "By written quotation",
    image: "/images/team-preparing.jpg",
    imageAlt:
      "Two professional cleaners in royal-blue uniforms preparing cleaning equipment, seen from behind",
  },
  {
    id: "on-demand",
    name: "On-demand home cleaning",
    short: "A helping hand at home, whenever you need it.",
    intro:
      "Need an extra hand at home — once in a while or on a schedule? You may know this kind of help as mamafua. Crestline brings the same flexible support, with professional equipment and a standard of care you can feel.",
    includes: [
      "Scheduled domestic cleaning support",
      "One-time cleaning assistance",
      "Scope agreed before every visit",
      "Professional equipment and careful workmanship",
    ],
    notes: [
      "We quote each visit on your home, the agreed tasks and the time needed — clearly, before we start.",
    ],
    pricingNote: "By quotation",
  },
];

export function getService(id: ServiceId): Service {
  const service = services.find((s) => s.id === id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return service;
}

export const featuredServices = services.filter((s) => s.featured);
