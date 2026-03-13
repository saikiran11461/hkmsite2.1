import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import galleryFestival1 from "@/assets/gallery-festival-1.jpg";
import galleryFestival2 from "@/assets/gallery-festival-2.jpg";
import galleryAarti from "@/assets/gallery-aarti.jpg";

const events = [
  {
    title: "Gaura Purnima",
    date: "2026-03-14",
    time: "5:00 AM - 9:00 PM",
    image: galleryFestival1,
  },
  {
    title: "Sri Rama Navami",
    date: "2026-04-04",
    time: "5:00 AM - 9:00 PM",
    image: galleryFestival2,
  },
  {
    title: "Nrsimha Chaturdashi",
    date: "2026-05-11",
    time: "5:00 AM - 10:00 PM",
    image: galleryAarti,
  },
];

const MiniCountdown = ({ targetDate }: { targetDate: string }) => {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      setDays(Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))));
    };
    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, [targetDate]);

  return (
    <span className="text-xs font-semibold text-accent">
      {days > 0 ? `${days} days away` : "Today!"}
    </span>
  );
};

const EventsPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-medium">Upcoming</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Festivals & Events
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join us in celebrating the divine festivals of the Vaishnava tradition.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
          {events.map((evt, i) => (
            <motion.div
              key={evt.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-warm transition-shadow"
            >
              <div className="h-40 overflow-hidden relative">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center">
                  <span className="text-xl font-bold text-primary font-heading block leading-none">
                    {new Date(evt.date).getDate()}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(evt.date).toLocaleDateString("en-IN", { month: "short" })}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{evt.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Clock className="w-3.5 h-3.5 text-primary" /> {evt.time}
                </div>
                <MiniCountdown targetDate={evt.date} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Calendar className="w-4 h-4" />
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
