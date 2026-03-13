import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, MapPin, Bell, ChevronRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import galleryFestival2 from "@/assets/gallery-festival-2.jpg";
import galleryFestival1 from "@/assets/gallery-festival-1.jpg";
import galleryAarti from "@/assets/gallery-aarti.jpg";
import galleryDarshan1 from "@/assets/gallery-darshan-1.jpg";

const upcomingEvents = [
  {
    title: "Gaura Purnima",
    date: "2026-03-14",
    time: "5:00 AM - 9:00 PM",
    description: "Appearance day of Sri Chaitanya Mahaprabhu. Grand abhishek, kirtan mela, and special prasadam feast for all devotees.",
    location: "HKMI Temple, Vizag",
    image: galleryFestival1,
    featured: true,
  },
  {
    title: "Papamochani Ekadashi",
    date: "2026-03-15",
    time: "5:00 AM - 8:00 PM",
    description: "Sacred fasting day. Special kirtan, discourse on the glories of Ekadashi, and break-fast timing announcement.",
    location: "HKMI Temple, Vizag",
    image: galleryAarti,
    featured: false,
  },
  {
    title: "Sri Rama Navami",
    date: "2026-04-04",
    time: "5:00 AM - 9:00 PM",
    description: "Appearance day of Lord Ramachandra. Grand celebrations with abhishek, kirtan, drama, and prasadam distribution.",
    location: "HKMI Temple, Vizag",
    image: galleryDarshan1,
    featured: true,
  },
  {
    title: "Akshaya Tritiya",
    date: "2026-04-26",
    time: "6:00 AM - 8:00 PM",
    description: "Auspicious day for new beginnings. Special deity darshan and chandana yatra celebrations.",
    location: "HKMI Temple, Vizag",
    image: galleryFestival2,
    featured: false,
  },
  {
    title: "Nrsimha Chaturdashi",
    date: "2026-05-11",
    time: "5:00 AM - 10:00 PM",
    description: "Appearance day of Lord Nrsimhadeva. Grand abhishek, special kirtan, and evening drama performance.",
    location: "HKMI Temple, Vizag",
    image: galleryAarti,
    featured: true,
  },
  {
    title: "Jagannath Rath Yatra",
    date: "2026-06-25",
    time: "7:00 AM - 6:00 PM",
    description: "Grand chariot festival. Procession through Vizag streets with Lord Jagannath, Baladeva, and Subhadra.",
    location: "Starting from HKMI Temple",
    image: galleryFestival1,
    featured: true,
  },
];

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-3">
      {[
        { val: timeLeft.days, label: "Days" },
        { val: timeLeft.hours, label: "Hrs" },
        { val: timeLeft.mins, label: "Min" },
        { val: timeLeft.secs, label: "Sec" },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-1">
            <span className="text-xl font-bold text-primary font-heading">
              {String(item.val).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const vaishnavaCalendar = [
  { month: "March 2026", days: [
    { date: "Mar 1", event: "Amalaki Ekadashi (Fasting)" },
    { date: "Mar 14", event: "Gaura Purnima (Festival)" },
    { date: "Mar 15", event: "Papamochani Ekadashi" },
    { date: "Mar 30", event: "Kamada Ekadashi" },
  ]},
  { month: "April 2026", days: [
    { date: "Apr 4", event: "Sri Rama Navami" },
    { date: "Apr 13", event: "Varuthini Ekadashi" },
    { date: "Apr 26", event: "Akshaya Tritiya" },
    { date: "Apr 28", event: "Mohini Ekadashi" },
  ]},
  { month: "May 2026", days: [
    { date: "May 11", event: "Nrsimha Chaturdashi" },
    { date: "May 13", event: "Apara Ekadashi" },
    { date: "May 27", event: "Pandava Nirjala Ekadashi" },
  ]},
];

const EventsPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const nextEvent = upcomingEvents[0];

  return (
    <PageLayout>
      <PageHero
        title="Upcoming Events"
        subtitle="Join us in celebrating the divine festivals and spiritual gatherings"
        breadcrumb="Events"
        backgroundImage={galleryFestival2}
      />

      {/* Featured Next Event with Countdown */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-card rounded-3xl overflow-hidden border border-border shadow-elevated">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img src={nextEvent.image} alt={nextEvent.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
                  Next Event
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {nextEvent.title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{nextEvent.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{new Date(nextEvent.date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{nextEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{nextEvent.location}</span>
                  </div>
                </div>
                <Countdown targetDate={nextEvent.date} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Upcoming Events */}
      <section className="py-20 bg-card" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-medium">Festival Calendar</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Upcoming Festivals & Celebrations
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-2xl border border-border overflow-hidden hover:shadow-warm transition-shadow group"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-40 sm:h-auto relative overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {event.featured && (
                      <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-foreground mb-2">{event.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">{event.description}</p>
                      </div>
                      <div className="hidden sm:flex flex-col items-center bg-primary/5 rounded-xl px-4 py-3 min-w-[80px]">
                        <span className="text-2xl font-bold text-primary font-heading">
                          {new Date(event.date).getDate()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString("en-IN", { month: "short" })}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" /> {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vaishnava Calendar */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-medium">Vaishnava Calendar</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Important Dates & Ekadashis
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {vaishnavaCalendar.map((month) => (
              <div key={month.month} className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">
                  {month.month}
                </h3>
                <div className="space-y-3">
                  {month.days.map((day) => (
                    <div key={day.date} className="flex items-start gap-3">
                      <div className="w-14 text-xs font-semibold text-primary bg-primary/5 rounded-lg px-2 py-1.5 text-center flex-shrink-0">
                        {day.date}
                      </div>
                      <p className="text-sm text-foreground leading-snug pt-1">{day.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notification CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Bell className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Never Miss a Festival
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Follow our social channels to stay updated on festivals, special darshan timings, 
            and spiritual events at Hare Krishna Movement Vizag.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.youtube.com/@harekrishnavizag"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Subscribe on YouTube
            </a>
            <a
              href="https://www.facebook.com/harekrishnavizag"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Follow on Facebook
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default EventsPage;
