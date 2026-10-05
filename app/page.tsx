import type { Metadata } from "next";
import { Component as Hero } from "@/components/ui/lumina-interactive-list";
import CategoryShowcase from "@/components/categoryShowcase";
import NewSeason from "@/components/new-season";
import PairedShowcase from "@/components/pairedShowcase";
import QualityGuarantee from "@/components/qualityGuarantee";
import ShoppingTerms from "@/components/shoppingTerms";
import Faq from "@/components/faq";
import Contact from "@/components/contact";
import JsonLd from "@/components/jsonLd";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Home() {
  return (
    <>
      <Hero />
      <NewSeason />
      <PairedShowcase />
      <CategoryShowcase />
      <Faq />
      <JsonLd data={faqJsonLd} />
      <ShoppingTerms />
      <QualityGuarantee />
      <Contact />
    </>
  );
}
