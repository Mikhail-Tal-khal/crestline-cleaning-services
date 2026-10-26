import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import { getBrandAsset } from "@/lib/brand";
import { services } from "@/lib/services";
import Providers from "@/app/providers";
import NavBar from "@/components/nav-bar";
import TabBar from "@/components/tab-bar";
import WhatsAppFab from "@/components/whatsapp-fab";
import SiteFooter from "@/components/site-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Crestline Cleaning Services | Professional Cleaning in Mombasa",
    template: "%s | Crestline Cleaning Services",
  },
  description:
    "Dependable residential and commercial cleaning in Mombasa — sofa, carpet, mattress, house and office cleaning with careful workmanship and transparent quotations. Cleaner Spaces, Healthier Environments.",
  keywords: [
    "cleaning services in Mombasa",
    "sofa cleaning in Mombasa",
    "carpet cleaning in Mombasa",
    "mattress cleaning in Mombasa",
    "house cleaning in Mombasa",
    "deep cleaning services Mombasa",
    "office cleaning Mombasa",
    "Airbnb cleaning Mombasa",
    "post-construction cleaning Mombasa",
    "professional cleaners in Mombasa",
  ],
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "Crestline Cleaning Services | Professional Cleaning in Mombasa",
    description:
      "Professional cleaning. A difference you can feel. Residential and commercial cleaning in Mombasa with transparent quotations.",
    url: siteConfig.siteUrl,
    locale: "en_KE",
    images: [
      {
        url: "/images/hero-living.jpg",
        width: 2848,
        height: 1600,
        alt: "A bright, well-kept living room in a coastal Mombasa home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crestline Cleaning Services | Professional Cleaning in Mombasa",
    description:
      "Professional cleaning. A difference you can feel. Residential and commercial cleaning in Mombasa with transparent quotations.",
    images: ["/images/hero-living.jpg"],
  },
};

/** LocalBusiness structured data — no ratings, hours, prices, coordinates or street address. */
function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentCompany,
      url: siteConfig.siteUrl,
    },
    email: siteConfig.email,
    url: siteConfig.siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mombasa",
      addressCountry: "KE",
    },
    areaServed: { "@type": "City", name: "Mombasa" },
    slogan: siteConfig.tagline,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
        },
      })),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const logo = getBrandAsset("crestline-logo.png");

  return (
    <html lang="en" className={`${inter.variable}`} style={{ colorScheme: "light dark" }}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <NavBar hasLogo={logo.exists} />
          <main id="main-content" className="flex-1 pb-tab-safe">
            {children}
          </main>
          <SiteFooter logo={logo} />
          <TabBar />
          <WhatsAppFab />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
          />
        </Providers>
      </body>
    </html>
  );
}
