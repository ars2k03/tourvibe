import { BlogPreview } from "@/components/home/blog-preview";
import { DestinationCategories } from "@/components/home/destination-categories";
import { DynamicStats } from "@/components/home/dynamic-stats";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { FeaturedTours } from "@/components/home/featured-tours";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { HowItWorks } from "@/components/home/how-it-works";
import { Newsletter } from "@/components/home/newsletter";
import { TestimonialsSlider } from "@/components/home/testimonials-slider";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <DynamicStats />
      <DestinationCategories />
      <FeaturedTours />
      <HowItWorks />
      <TestimonialsSlider />
      <BlogPreview />
      <FaqAccordion />
      <Newsletter />
    </>
  );
}
