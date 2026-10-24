# Crestline Cleaning Services — Website

Production website for **Crestline Cleaning Services**, the professional cleaning
division of **Crestline Strategies Limited**, Mombasa, Kenya.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, in an
**iOS-inspired design language**: collapsing large titles, a floating mobile tab
bar, bottom sheets, segmented controls, switches and inset grouped lists — with a
system-following **dark mode** and tasteful, spring-physics **motion** (Framer
Motion, the only animation dependency). All copy is written in a warm, human
Kenyan voice.

---

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

Requirements: Node.js 18.18+ (tested on Node 24) and npm.

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Hero, brand intro, featured services, process, uniform carousel, benefits, Follow Crestline, CTA |
| `/services` | iOS disclosure rows — every service expands in place |
| `/packages` | Swipeable package cards, Fabric/House/Property segmented pricing, interactive calculator |
| `/about` | Company story, mission, vision, values, brand promise |
| `/commercial-cleaning` | Commercial conversion page + site-assessment form + social row |
| `/request-a-quote` | 5-step quotation form (accepts `?sofa=3&bd=3&ct=deep…` params from the calculator) |
| `/contact` | Contact rows, enquiry form, Mombasa map, animated FAQ |
| `/privacy` | Privacy notice |

SEO: unique metadata per route, Open Graph/Twitter cards, `app/sitemap.ts`,
`app/robots.ts`, `LocalBusiness` structured data (app/layout.tsx) and `FAQPage`
structured data (contact page). No fake ratings, opening hours, coordinates or
street addresses anywhere.

---

## Social media (WhatsApp, Instagram, Facebook, TikTok)

Everything lives in `lib/siteConfig.ts`:

```ts
social: {
  whatsapp: { number: "", prefilledMessage: "Hi Crestline, I'd like a quote for..." },
  instagram: { url: "", handle: "" },
  facebook:  { url: "" },
  tiktok:    { url: "", handle: "" },
},
phone: "",
```

- While a value is **empty**, that platform renders everywhere as a calm, greyed
  **"Coming soon"** state (not clickable, announced as "Instagram, coming soon", …).
- Add a real URL/number and the button goes **live automatically** — no code changes.
- The four platforms appear in: the mobile "More" sheet, the homepage "Follow
  Crestline" section, the Contact page, the Commercial page and the footer.
- **WhatsApp, once configured**: a floating circular button appears above the
  mobile tab bar (spring entrance), plus "Chat on WhatsApp" buttons on the quote
  confirmation screen and the Contact page. Links are built as
  `wa.me/<number>?text=<prefilled message>`.
- Nothing is invented: no handles, numbers, posts, follower counts, likes or
  reviews appear until real values are added.

## Email delivery for forms

All three forms (quotation, site assessment, enquiry) submit through **Server
Actions** with server-side validation, a honeypot field and a minimum fill-time
check. The quotation and assessment forms confirm with an iOS action sheet before
sending.

- **With a delivery endpoint configured** — set the environment variable:

  ```bash
  QUOTE_DELIVERY_ENDPOINT=https://your-endpoint.example/hook
  ```

  The action POSTs a JSON payload (`{ kind, submittedAt, …fields }`) to that URL.
  If the endpoint answers `2xx`, the visitor sees the confirmation — it is shown
  **only** when delivery genuinely succeeded.

- **Without configuration** — the site never pretends an email was sent. The
  visitor gets a prepared `mailto:` link to `cleaning.services.crestline@gmail.com`
  (plus a "copy summary" button) and is told the email app will open.

- **Files**: photos (max 6 × 5 MB, JPG/PNG/WebP) and one video (max 20 MB,
  MP4/MOV/WebM) are validated on the client **and** server. They are never
  published or stored by the website; only file names/types/sizes are forwarded
  to the delivery endpoint. In `mailto:` fallback mode the visitor attaches them
  in their own email app.

---

## Updating content (no component changes needed)

| What | Where |
|---|---|
| Email, website URL, tagline, phone, social channels | `lib/siteConfig.ts` |
| Every price (sofa, mattress, carpet, house, packages, commercial) | `lib/pricing.ts` |
| Service copy, includes, notes, images | `lib/services.ts` |
| FAQ questions and answers | `lib/faqs.ts` |
| Calculator + estimator logic | `lib/quote.ts` (shared with the quote form) |

Phone, WhatsApp and social buttons **stay hidden / "Coming soon"** automatically
until real values are set in `lib/siteConfig.ts`.

### Official brand assets (drop-in)

Copy the original files into `public/brand/`:

```
image(8).png  →  public/brand/crestline-logo.png          (official silver emblem)
image(9).png  →  public/brand/crestline-uniform-front.png (official uniform, front)
image(10).png →  public/brand/crestline-uniform-back.png  (official uniform, back)
```

Then restart `npm run dev` or re-run `npm run build`. Until then the header/footer
show a text wordmark and the uniform carousel shows clearly-labelled
placeholders. The logo always renders at its intrinsic proportions (fixed height,
automatic width) — it is never stretched, redrawn, recoloured or replaced. A
one-time metallic shimmer sweeps the emblem on first load.

### Photography

Images in `public/images/` are **AI-generated illustrations**, used only as
placeholders and labelled "Illustrative service imagery" where they appear.
Replace them with real Crestline project photography (same file names, or update
the paths/alt text in `lib/services.ts` and `components/home/`). The homepage
"See our work" area holds a before/after slider and social-feed placeholder
tiles, clearly marked, ready for genuine content — never fabricated results.

---

## Design system notes

- **Typography**: `-apple-system / SF Pro` on Apple devices, Inter (next/font,
  self-hosted) everywhere else. iOS-style type scale with large collapsing titles
  on inner pages.
- **Dark mode**: follows the system setting automatically (`darkMode: "media"`).
  Light mode uses iOS grouped soft-grey backgrounds and white cards; dark mode
  uses deep charcoal/navy surfaces with white-alpha cards. WCAG AA contrast in
  both.
- **Motion**: Framer Motion with a global `MotionConfig reducedMotion="user"` —
  visitors who prefer reduced motion get simple fades everywhere. Hero headline
  words stagger in, the hero image fades-and-scales cinematically, cards reveal
  on scroll with stagger, the calculator totals roll to new values, the discount
  badge pops in, form steps push left/right, the success checkmark draws itself.
  Only transform/opacity are animated.
- **Controls**: `SegmentedControl`, `Switch`, `Stepper`, `Chip`, `InsetGroup` /
  `InsetRow`, `BottomSheet` (drag-to-dismiss, focus-managed), floating mobile
  `TabBar` with a raised centre Quote action, and a `WhatsAppFab` that appears
  once configured.

## Accessibility

- WCAG 2.2 AA targets in light and dark mode: labelled controls wired with
  `aria-describedby` / `aria-invalid` / `role="alert"`, soft-blue focus glow for
  keyboard users, error summaries that move focus, skip link, landmarks, one
  `h1` per page, meaningful alt text, 44px+ tap targets, `prefers-reduced-motion`
  honoured globally.
- The mobile tab bar and sheets are keyboard-operable: sheets trap focus, close
  on Escape and return focus to the trigger; the before/after slider is a native
  range input.
- The multi-step quotation form requires JavaScript; a `noscript` message offers
  the direct email address as a fallback.

## Project structure

```
app/                  routes, layout, metadata, sitemap, robots, server actions, motion provider
components/           nav bar, tab bar, sheets, home sections, accordion services, forms, calculator, social, icons
lib/                  siteConfig, services, pricing, quote estimator, validation, brand assets, compact-title store
public/brand/         official brand assets (drop-in)
public/images/        site imagery (illustrative placeholders)
```

## Deployment

The site deploys as a standard Next.js App Router project:

1. Push the folder to a Git repository (or upload it).
2. Import into Vercel (or any Node host) — build command `npm run build`,
   output is detected automatically.
3. Set `QUOTE_DELIVERY_ENDPOINT` in the host's environment variables when your
   email relay is ready. Until then the honest `mailto:` fallback is used.

Canonical URLs, sitemap and Open Graph URLs point to
`https://www.crestlinestrategies.co.ke` (`lib/siteConfig.ts` → `siteUrl`).
