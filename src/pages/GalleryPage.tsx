import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Camera } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import DailyDarshanGallery from "@/components/DailyDarshanGallery";
import galleryDarshan1 from "@/assets/gallery-darshan-1.jpg";
import galleryFestival1 from "@/assets/gallery-festival-1.jpg";
import galleryAnnadaan1 from "@/assets/gallery-annadaan-1.jpg";
import galleryAarti from "@/assets/gallery-aarti.jpg";
import galleryFestival2 from "@/assets/gallery-festival-2.jpg";
import galleryClass from "@/assets/gallery-class.jpg";
import heroTemple from "@/assets/hero-temple.jpg";
import templeSeva from "@/assets/temple-seva.jpg";
import subhojanam from "@/assets/subhojanam.jpg";
import annaDaan from "@/assets/anna-daan.jpg";
import aboutCommunity from "@/assets/about-community.jpg";

const categories = ["All", "Daily Darshan", "Festivals", "Seva", "Community"];

const galleryImages = [
  { src: galleryDarshan1, title: "Sri Krishna Darshan", category: "Daily Darshan", date: "March 2026" },
  { src: galleryFestival1, title: "Kirtan Festival Celebrations", category: "Festivals", date: "February 2026" },
  { src: galleryAnnadaan1, title: "Anna Daan Prasadam Distribution", category: "Seva", date: "March 2026" },
  { src: galleryAarti, title: "Morning Mangala Aarti", category: "Daily Darshan", date: "March 2026" },
  { src: galleryFestival2, title: "Temple Festival Decorations", category: "Festivals", date: "January 2026" },
  { src: galleryClass, title: "Bhagavad Gita Discourse", category: "Community", date: "February 2026" },
  { src: heroTemple, title: "Vaikuntham Temple Vision", category: "Community", date: "2025" },
  { src: templeSeva, title: "Temple Construction Progress", category: "Seva", date: "2025" },
  { src: subhojanam, title: "Subhojanam Hospital Seva", category: "Seva", date: "March 2026" },
  { src: annaDaan, title: "Food for Life Distribution", category: "Seva", date: "February 2026" },
  { src: aboutCommunity, title: "Community Gathering", category: "Community", date: "January 2026" },
  { src: galleryDarshan1, title: "Evening Sandhya Aarti Darshan", category: "Daily Darshan", date: "March 2026" },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <PageLayout>
      <PageHero
        title="Gallery"
        subtitle="Divine moments captured — Darshan, Festivals, Seva & Community"
        breadcrumb="Gallery"
        backgroundImage={galleryDarshan1}
      />

      {/* Daily Darshan by Date */}
      <DailyDarshanGallery />

      {/* Category Filters */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-warm"
                    : "bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.title + i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-background font-heading font-semibold text-sm">{img.title}</p>
                    <p className="text-background/60 text-xs mt-1">{img.date}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-background" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Daily Darshan Info */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Camera className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Daily Darshan Updates
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Every morning, we capture the divine beauty of the Lord's darshan. Our deities are adorned 
            with fresh flowers, exquisite garments, and beautiful ornaments. Follow us on social media 
            to receive daily darshan photos directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/harekrishnavizag/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Follow on Instagram
            </a>
            <a
              href="https://www.youtube.com/@harekrishnavizag"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-medium">Watch & Listen</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Spiritual Videos
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { id: "7I-zT8P7QB8", title: "Hare Krishna Movement Vizag — Temple Vision" },
              { id: "vHGpe-lfYqM", title: "Subhojanam — Feeding the Needy" },
            ].map((video) => (
              <div key={video.id} className="rounded-2xl overflow-hidden shadow-elevated">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 bg-card">
                  <p className="font-heading font-semibold text-foreground">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-background/80 hover:text-background"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={filtered[lightboxIndex]?.src}
              alt={filtered[lightboxIndex]?.title}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 text-center">
              <p className="text-background font-heading text-lg font-semibold">
                {filtered[lightboxIndex]?.title}
              </p>
              <p className="text-background/60 text-sm mt-1">
                {filtered[lightboxIndex]?.date}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default GalleryPage;
