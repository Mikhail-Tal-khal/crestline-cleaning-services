/**
 * Central place for every contact and company field used across the site.
 *
 * Update values here and they change everywhere. Channels that do not have a
 * real value yet (phone, WhatsApp, social media) must stay "" / empty —
 * the UI renders those buttons in a calm "Coming soon" state automatically,
 * and they go live with no code changes once a real value is added.
 */
export const siteConfig = {
  name: "Crestline Cleaning Services",
  shortName: "Crestline",
  parentCompany: "Crestline Strategies Limited",
  parentLine: "A division of Crestline Strategies Limited",
  tagline: "Cleaner Spaces, Healthier Environments.",
  email: "cleaning.services.crestline@gmail.com",
  website: "www.crestlinestrategies.co.ke",
  siteUrl: "https://www.crestlinestrategies.co.ke",
  location: "Mombasa, Kenya",
  serviceArea: "Mombasa and surrounding locations by quotation",

  /** Phone number — hidden everywhere until a real value is added. */
  phone: "",

  /** Social channels — add real values and the buttons go live by themselves. */
  social: {
    /** International format, e.g. "2547XXXXXXXX". Empty = WhatsApp stays hidden. */
    whatsapp: {
      number: "",
      prefilledMessage: "Hi Crestline, I'd like a quote for...",
    },
    instagram: { url: "", handle: "" },
    facebook: { url: "" },
    tiktok: { url: "", handle: "" },
  },
};

export const navigation = [
  { href: "/", label: "Home", tab: true },
  { href: "/services", label: "Services", tab: true },
  { href: "/packages", label: "Packages", tab: true },
  { href: "/about", label: "About" },
  { href: "/commercial-cleaning", label: "Commercial" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;
