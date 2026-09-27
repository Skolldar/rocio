import { Component as Hero } from "@/components/ui/lumina-interactive-list";
import CategoryShowcase from "@/components/categoryShowcase";
import NewSeason from "@/components/new-season";
import PairedShowcase from "@/components/pairedShowcase";
import QualityGuarantee from "@/components/qualityGuarantee";
import ShoppingTerms from "@/components/shoppingTerms";
import Faq from "@/components/faq";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <NewSeason />
      <PairedShowcase />
      <CategoryShowcase />
      <Faq />
      <ShoppingTerms />
      <QualityGuarantee />
      <Contact />
    </>
  );
}
