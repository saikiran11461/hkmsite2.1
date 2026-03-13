import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TempleCarousel from "@/components/TempleCarousel";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import SevasSection from "@/components/SevasSection";
import GalleryPreview from "@/components/GalleryPreview";
import EventsPreview from "@/components/EventsPreview";
import SubhojanamSection from "@/components/SubhojanamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* <HeroSection /> */}
      <TempleCarousel />
      <AboutSection />
      <FounderSection />
      <SevasSection />
      <GalleryPreview />
      <EventsPreview />
      <SubhojanamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
