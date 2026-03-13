import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, Calendar } from "lucide-react";

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

// Mock daily darshan data grouped by date
const dailyDarshanData: Record<string, { images: { src: string; title: string }[]; festival?: string }> = {
  "2026-03-06": {
    festival: "Gaura Purnima",
    images: [
      { src: galleryDarshan1, title: "Sri Sri Radha Krishna — Morning Shringar" },
      { src: galleryAarti, title: "Mangala Aarti Darshan" },
      { src: galleryFestival1, title: "Special Festival Decoration" },
      { src: heroTemple, title: "Temple Hall Overview" },
    ],
  },
  "2026-03-05": {
    images: [
      { src: galleryAarti, title: "Morning Mangala Aarti" },
      { src: galleryDarshan1, title: "Shringar Darshan" },
      { src: templeSeva, title: "Deity Abhishekam" },
    ],
  },
  "2026-03-04": {
    festival: "Ekadashi",
    images: [
      { src: galleryDarshan1, title: "Ekadashi Special Darshan" },
      { src: galleryFestival2, title: "Flower Decoration" },
      { src: galleryAnnadaan1, title: "Prasadam Distribution" },
      { src: aboutCommunity, title: "Evening Kirtan" },
    ],
  },
  "2026-03-03": {
    images: [
      { src: galleryAarti, title: "Sandhya Aarti" },
      { src: galleryDarshan1, title: "Evening Darshan" },
      { src: galleryClass, title: "Bhagavad Gita Class" },
    ],
  },
  "2026-03-02": {
    festival: "Sunday Feast",
    images: [
      { src: galleryFestival1, title: "Sunday Feast Kirtan" },
      { src: galleryAnnadaan1, title: "Feast Prasadam" },
      { src: subhojanam, title: "Community Gathering" },
      { src: annaDaan, title: "Food Distribution" },
      { src: galleryDarshan1, title: "Special Darshan" },
    ],
  },
  "2026-03-01": {
    images: [
      { src: galleryDarshan1, title: "Sri Krishna Morning Darshan" },
      { src: galleryAarti, title: "Aarti Ceremony" },
    ],
  },
  "2026-02-28": {
    images: [
      { src: galleryFestival2, title: "Temple Decoration" },
      { src: galleryDarshan1, title: "Darshan" },
      { src: galleryClass, title: "Discourse Session" },
    ],
  },
};

const sortedDates = Object.keys(dailyDarshanData).sort((a, b) => b.localeCompare(a));

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr + "T00:00:00");
  return {
    day: date.getDate(),
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    month: date.toLocaleDateString("en-US", { month: "short" }),
    year: date.getFullYear(),
    full: date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
  };
};

const DailyDarshanGallery = () => {
  const [selectedDate, setSelectedDate] = useState<string>(sortedDates[0]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const datesPerPage = 7;
  const totalPages = Math.ceil(sortedDates.length / datesPerPage);
  const visibleDates = sortedDates.slice(page * datesPerPage, (page + 1) * datesPerPage);

  const currentData = dailyDarshanData[selectedDate];
  const formatted = formatDate(selectedDate);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Daily Darshan
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Select a Date for Darshan
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click on a date to view the divine darshan gallery for that day.
          </p>
        </div>

        {/* Date Cards Carousel */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-3 overflow-hidden">
            {visibleDates.map((dateStr) => {
              const d = formatDate(dateStr);
              const isActive = dateStr === selectedDate;
              const hasFestival = !!dailyDarshanData[dateStr].festival;

              return (
                <motion.button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex flex-col items-center px-4 py-3 rounded-2xl min-w-[72px] transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-warm"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  <span className={`text-xs font-medium ${isActive ? "text-primary-foreground/70" : ""}`}>
                    {d.weekday}
                  </span>
                  <span className="text-2xl font-heading font-bold leading-tight">{d.day}</span>
                  <span className={`text-xs ${isActive ? "text-primary-foreground/70" : ""}`}>
                    {d.month}
                  </span>
                  {hasFestival && (
                    <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                      isActive ? "bg-primary-foreground" : "bg-primary"
                    }`} />
                  )}
                </motion.button>
              );
            })}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Date Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                {formatted.full}
              </h3>
              {currentData?.festival && (
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {currentData.festival}
                </span>
              )}
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentData?.images.map((img, i) => (
                <motion.div
                  key={img.title + i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-background font-heading font-semibold text-sm">{img.title}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-background" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && currentData && (
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

              {/* Nav arrows */}
              {lightboxIndex > 0 && (
                <button
                  className="absolute left-4 md:left-8 text-background/70 hover:text-background"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
              )}
              {lightboxIndex < currentData.images.length - 1 && (
                <button
                  className="absolute right-4 md:right-8 text-background/70 hover:text-background"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              )}

              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={currentData.images[lightboxIndex]?.src}
                alt={currentData.images[lightboxIndex]?.title}
                className="max-w-full max-h-[85vh] rounded-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-8 text-center">
                <p className="text-background font-heading text-lg font-semibold">
                  {currentData.images[lightboxIndex]?.title}
                </p>
                <p className="text-background/60 text-sm mt-1">
                  {formatted.full}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DailyDarshanGallery;
