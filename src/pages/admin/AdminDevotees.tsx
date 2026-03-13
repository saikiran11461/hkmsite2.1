import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Phone, Mail } from "lucide-react";

const devotees = [
  { id: 1, name: "Suresh Kumar", email: "suresh@email.com", phone: "+91 98765 12345", joined: "2025-06-15", sevas: ["Brick Seva", "Anna Daan"], status: "active" },
  { id: 2, name: "Lakshmi Devi", email: "lakshmi@email.com", phone: "+91 87654 23456", joined: "2025-08-22", sevas: ["Square Foot"], status: "active" },
  { id: 3, name: "Ramesh Patel", email: "ramesh@email.com", phone: "+91 76543 34567", joined: "2025-10-10", sevas: ["Subhojanam"], status: "active" },
  { id: 4, name: "Anita Sharma", email: "anita@email.com", phone: "+91 65432 45678", joined: "2025-12-01", sevas: ["Anna Daan", "Brick Seva"], status: "inactive" },
  { id: 5, name: "Vijay Reddy", email: "vijay@email.com", phone: "+91 54321 56789", joined: "2026-01-20", sevas: ["Square Foot", "Subhojanam"], status: "active" },
  { id: 6, name: "Priya Nair", email: "priya@email.com", phone: "+91 43210 67890", joined: "2026-02-14", sevas: ["Anna Daan"], status: "active" },
];

const AdminDevotees = () => {
  const [search, setSearch] = useState("");
  const filtered = devotees.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Devotees</h1>
        <p className="text-muted-foreground">{devotees.length} registered devotees</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search devotees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((d) => (
          <Card key={d.id}>
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold">{d.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{d.name}</h3>
                  <Badge variant={d.status === "active" ? "default" : "outline"} className="text-xs">
                    {d.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{d.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{d.phone}</span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  {d.sevas.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                </div>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">Joined {d.joined}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDevotees;
