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
  email: "cleaningservices.crestline@gmail.com",
  website: "www.crestlinestrategies.co.ke",
  siteUrl: "https://www.crestlinestrategies.co.ke",
  location: "Mombasa, Kenya",
  serviceArea: "Mombasa and surrounding locations by quotation",

  /** Phone number — shown across the site (tel links strip spaces). */
  phone: "+254 180 831835",

  /** Social channels — add real values and the buttons go live by themselves. */
  social: {
    /** International format, e.g. "2547XXXXXXXX". Empty = WhatsApp stays hidden. */
    whatsapp: {
      number: "254180831835",
      prefilledMessage: "Hi Crestline, I'd like a quote for...",
    },
    instagram: {
      url: "https://www.instagram.com/crestlinecleaningke/",
      handle: "crestlinecleaningke",
    },
    facebook: { url: "" },
    tiktok: {
      url: "https://www.tiktok.com/@crestlinecleaningke",
      handle: "crestlinecleaningke",
    },
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
