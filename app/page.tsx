import Hero from "@/components/home/hero";
import BrandIntro from "@/components/home/intro";
import FeaturedServices from "@/components/home/featured-services";
import HowItWorks from "@/components/home/how-it-works";
import ProfessionalStandards from "@/components/home/standards";
import WhyChooseCrestline from "@/components/home/why-choose";
import FollowCrestline from "@/components/follow-crestline";
import CtaSection from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <FeaturedServices />
      <HowItWorks />
      <ProfessionalStandards />
      <WhyChooseCrestline />
      <FollowCrestline />
      <CtaSection />
    </>
  );
}
