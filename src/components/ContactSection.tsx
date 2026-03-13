import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message Sent!", description: "We'll get back to you soon. Hare Krishna!" });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-medium">Get In Touch</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Contact Us</h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Address</h3>
                <p className="text-muted-foreground text-sm">
                  Hare Krishna Movement India,<br />
                  Visakhapatnam, Andhra Pradesh, India
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Phone</h3>
                <p className="text-muted-foreground text-sm">Contact through website</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Email</h3>
                <p className="text-muted-foreground text-sm">info@harekrishnavizag.org</p>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-3">Bank Details</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="font-medium text-foreground">A/C:</span> 10091415313</p>
                <p><span className="font-medium text-foreground">IFSC:</span> IDFB0080412</p>
                <p><span className="font-medium text-foreground">Bank:</span> IDFC First Bank Ltd</p>
                <p>Daba Gardens Branch, Visakhapatnam</p>
              </div>
              <p className="text-xs text-primary mt-3 font-medium">
                Avail 80G benefits on all donations
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-card rounded-2xl p-8 border border-border space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Your Name" required className="bg-background" />
              <Input placeholder="Email" type="email" required className="bg-background" />
            </div>
            <Input placeholder="Subject" required className="bg-background" />
            <Textarea placeholder="Your Message" rows={5} required className="bg-background resize-none" />
            <Button type="submit" className="w-full" disabled={sending}>
              <Send className="w-4 h-4 mr-2" />
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
