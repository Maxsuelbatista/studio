import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServiceShowcase } from "@/components/landing/ServiceShowcase";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ContactFormSection } from "@/components/landing/ContactFormSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServiceShowcase />
        <TestimonialsSection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
}
