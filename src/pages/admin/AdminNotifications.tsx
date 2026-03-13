import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Trash2, IndianRupee, Users, CalendarDays, Image } from "lucide-react";

const initialNotifications = [
  { id: 1, type: "donation", title: "New Donation Received", message: "₹5,000 received for Brick Seva from Suresh Kumar", time: "2 min ago", read: false },
  { id: 2, type: "event", title: "Event Reminder", message: "Gaura Purnima celebration is in 3 days", time: "1 hr ago", read: false },
  { id: 3, type: "devotee", title: "New Registration", message: "Ramesh Kumar registered as a devotee", time: "3 hrs ago", read: false },
  { id: 4, type: "gallery", title: "Gallery Update", message: "12 new darshan photos pending review", time: "5 hrs ago", read: true },
  { id: 5, type: "donation", title: "Donation Goal Reached", message: "Anna Daan monthly target of ₹1,00,000 achieved!", time: "Yesterday", read: true },
  { id: 6, type: "event", title: "Event Completed", message: "Holi Festival event marked as completed", time: "2 days ago", read: true },
];

const typeIcon = (type: string) => {
  switch (type) {
    case "donation": return <IndianRupee className="w-4 h-4" />;
    case "event": return <CalendarDays className="w-4 h-4" />;
    case "devotee": return <Users className="w-4 h-4" />;
    case "gallery": return <Image className="w-4 h-4" />;
    default: return <Bell className="w-4 h-4" />;
  }
};

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id: number) =>
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () =>
    setNotifications(notifications.map((n) => ({ ...n, read: true })));

  const remove = (id: number) =>
    setNotifications(notifications.filter((n) => n.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <Check className="w-4 h-4 mr-1" /> Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((n) => (
          <Card key={n.id} className={n.read ? "opacity-70" : "border-primary/30"}>
            <CardContent className="p-4 flex items-start gap-4">
              <div className={`p-2 rounded-lg shrink-0 ${n.read ? "bg-muted" : "bg-primary/10 text-primary"}`}>
                {typeIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{n.title}</h3>
                  {!n.read && <Badge className="text-[10px] h-4">New</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                <span className="text-xs text-muted-foreground mt-1 block">{n.time}</span>
              </div>
              <div className="flex gap-1 shrink-0">
                {!n.read && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => markRead(n.id)}>
                    <Check className="w-3.5 h-3.5" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(n.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;
