import type { Metadata } from "next";
import { Elms_Sans, Google_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import JsonLd from "@/components/jsonLd";
import { INSTAGRAM_URL } from "@/components/socialIcons";
import { EMAIL, PHONE_HREF } from "@/lib/contact";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const elmsSans = Elms_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-elms-sans",
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

const googleSans = Google_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-google-sans",
  // Only a fallback behind Elms Sans: the browser fetches it on demand for
  // glyphs Elms Sans lacks, so preloading it just delays the first paint.
  preload: false,
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

const DEFAULT_IMAGE = "/img/modelos/modelo-collares-capas.webp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Luxgirl · Tienda online de joyería en España",
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "joyería acero inoxidable",
    "joyas color oro",
    "joyas color plata",
    "anillos ajustables",
    "collares",
    "pendientes",
    "pulseras",
    "brazaletes",
    "joyas para regalar",
    "joyería asequible España",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_IMAGE, alt: "Modelo con collares Luxgirl" }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const storeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Tienda solo online, sin local físico.
      "@type": "OnlineStore",
      "@id": `${SITE_URL}/#store`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      logo: absoluteUrl("/logo/logo-complete.svg"),
      image: absoluteUrl(DEFAULT_IMAGE),
      email: EMAIL,
      telephone: PHONE_HREF.replace("tel:", ""),
      priceRange: "€",
      currenciesAccepted: "EUR",
      address: { "@type": "PostalAddress", addressCountry: "ES" },
      areaServed: { "@type": "Country", name: "España" },
      sameAs: [INSTAGRAM_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "es-ES",
      publisher: { "@id": `${SITE_URL}/#store` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${elmsSans.variable} ${googleSans.variable}`}>
      <body className="bg-stone-200 antialiased" suppressHydrationWarning>
        <JsonLd data={storeJsonLd} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
