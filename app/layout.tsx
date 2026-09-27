import type { Metadata } from "next";
import { Elms_Sans, Google_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Luxgirl",
  description: "Joyería contemporánea en acero inoxidable con baño de oro o plata.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${elmsSans.variable} ${googleSans.variable}`}>
      <body className="bg-stone-200 antialiased" suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
