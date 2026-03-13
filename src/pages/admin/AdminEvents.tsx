import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, X, CalendarDays, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const initialEvents = [
  { id: 1, title: "Janmashtami Celebration", date: "2026-08-14", time: "6:00 PM", location: "Main Temple Hall", description: "Grand celebration of Lord Krishna's appearance day with abhishekam, kirtan, and midnight aarti.", status: "upcoming" },
  { id: 2, title: "Gaura Purnima", date: "2026-03-18", time: "5:00 PM", location: "Temple Premises", description: "Appearance day of Sri Chaitanya Mahaprabhu with special kirtan and prasadam.", status: "upcoming" },
  { id: 3, title: "Sunday Love Feast", date: "2026-03-08", time: "5:30 PM", location: "Community Hall", description: "Weekly congregation with kirtan, discourse, and sumptuous prasadam.", status: "recurring" },
  { id: 4, title: "Holi Festival", date: "2026-03-10", time: "10:00 AM", location: "Temple Garden", description: "Celebrate the festival of colors with devotional songs and organic colors.", status: "completed" },
  { id: 5, title: "Bhagavad Gita Seminar", date: "2026-03-15", time: "4:00 PM", location: "Lecture Hall", description: "Weekly study of Bhagavad Gita As It Is, Chapter 12.", status: "recurring" },
];

const AdminEvents = () => {
  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", date: "", time: "", location: "", description: "", status: "upcoming" });

  const openCreate = () => {
    setForm({ title: "", date: "", time: "", location: "", description: "", status: "upcoming" });
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (event: typeof initialEvents[0]) => {
    setForm({ title: event.title, date: event.date, time: event.time, location: event.location, description: event.description, status: event.status });
    setEditing(event.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title || !form.date) return;
    if (editing) {
      setEvents(events.map((e) => (e.id === editing ? { ...e, ...form } : e)));
    } else {
      setEvents([...events, { id: Date.now(), ...form }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const statusColor = (s: string) => {
    if (s === "upcoming") return "default";
    if (s === "recurring") return "secondary";
    return "outline";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground">Manage temple events and festivals</p>
        </div>
        <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" /> Add Event</Button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-background rounded-2xl p-6 w-full max-w-lg shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-xl font-bold">
                  {editing ? "Edit Event" : "Create Event"}
                </h2>
                <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <Input placeholder="Event Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                </div>
                <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="recurring">Recurring</option>
                  <option value="completed">Completed</option>
                </select>
                <Button onClick={handleSave} className="w-full">
                  {editing ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events List */}
      <div className="space-y-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-semibold text-lg">{event.title}</h3>
                    <Badge variant={statusColor(event.status)}>{event.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" />{event.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{event.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(event)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
