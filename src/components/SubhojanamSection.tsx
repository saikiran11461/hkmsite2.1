import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Utensils, Hospital, HandHeart } from "lucide-react";
import subhojanamImg from "@/assets/subhojanam.jpg";

const stats = [
  { icon: Utensils, value: "1,000+", label: "Meals served daily" },
  { icon: Hospital, value: "2", label: "Government Hospitals" },
  { icon: HandHeart, value: "365", label: "Days a year" },
];

const SubhojanamSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="subhojanam" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-medium">
              Subhojanam Programme
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Feeding the Needy with Love & Care
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our Subhojanam Programme provides free, hygienic, and nutritious meals to 
              underprivileged patients and their attendants in government hospitals across 
              Visakhapatnam & Kakinada.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Offering food to those who choose to remain hungry to meet the medicine and 
              treatment cost of their loved ones — your generosity brings immense happiness 
              and goodwill.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-heading text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open("https://www.harekrishnavizag.org/subhojanam", "_blank")}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-warm hover:opacity-90 transition-opacity"
            >
              Support Subhojanam
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={subhojanamImg}
              alt="Subhojanam food distribution"
              className="rounded-2xl shadow-elevated w-full"
            />

            {/* Hospital cards */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-background rounded-xl p-4 border border-border text-center">
                <p className="font-heading font-semibold text-foreground text-sm">KGH Hospital</p>
                <p className="text-xs text-muted-foreground">Visakhapatnam</p>
                <p className="text-primary font-bold text-sm mt-1">500 meals/day</p>
              </div>
              <div className="bg-background rounded-xl p-4 border border-border text-center">
                <p className="font-heading font-semibold text-foreground text-sm">GGH Hospital</p>
                <p className="text-xs text-muted-foreground">Kakinada</p>
                <p className="text-primary font-bold text-sm mt-1">500 meals/day</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SubhojanamSection;
