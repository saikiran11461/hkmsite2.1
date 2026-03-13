import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  IndianRupee,
  Search,
  Download,
  Eye,
  TrendingUp,
  Users,
  Calendar,
  CreditCard,
  Smartphone,
  Banknote,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const donations = [
  { id: "TXN001", donor: "Ramesh Kumar", email: "ramesh@gmail.com", phone: "+91 98765 43210", amount: 25000, seva: "Square Foot Seva", method: "UPI", status: "completed", date: "2026-03-05", receipt: "RCP-2026-001" },
  { id: "TXN002", donor: "Lakshmi Devi", email: "lakshmi.d@gmail.com", phone: "+91 87654 32109", amount: 11000, seva: "Brick Seva", method: "Card", status: "completed", date: "2026-03-04", receipt: "RCP-2026-002" },
  { id: "TXN003", donor: "Suresh Babu", email: "suresh.b@yahoo.com", phone: "+91 76543 21098", amount: 5000, seva: "Anna Daan", method: "Net Banking", status: "completed", date: "2026-03-04", receipt: "RCP-2026-003" },
  { id: "TXN004", donor: "Priya Sharma", email: "priya.s@gmail.com", phone: "+91 65432 10987", amount: 2100, seva: "Subhojanam", method: "UPI", status: "completed", date: "2026-03-03", receipt: "RCP-2026-004" },
  { id: "TXN005", donor: "Venkat Rao", email: "venkat.rao@outlook.com", phone: "+91 54321 09876", amount: 51000, seva: "Square Foot Seva", method: "Card", status: "completed", date: "2026-03-02", receipt: "RCP-2026-005" },
  { id: "TXN006", donor: "Anitha Reddy", email: "anitha.r@gmail.com", phone: "+91 43210 98765", amount: 1100, seva: "General Donation", method: "Cash", status: "completed", date: "2026-03-02", receipt: "RCP-2026-006" },
  { id: "TXN007", donor: "Krishna Murthy", email: "krishna.m@gmail.com", phone: "+91 32109 87654", amount: 11000, seva: "Brick Seva", method: "UPI", status: "pending", date: "2026-03-01", receipt: "—" },
  { id: "TXN008", donor: "Sita Devi", email: "sita.devi@gmail.com", phone: "+91 21098 76543", amount: 5500, seva: "Anna Daan", method: "Card", status: "completed", date: "2026-02-28", receipt: "RCP-2026-007" },
  { id: "TXN009", donor: "Ravi Teja", email: "ravi.t@gmail.com", phone: "+91 10987 65432", amount: 21000, seva: "Square Foot Seva", method: "Net Banking", status: "failed", date: "2026-02-27", receipt: "—" },
  { id: "TXN010", donor: "Padma Kumari", email: "padma.k@gmail.com", phone: "+91 99887 76655", amount: 3000, seva: "Subhojanam", method: "UPI", status: "completed", date: "2026-02-26", receipt: "RCP-2026-008" },
];

const monthlyDonations = [
  { month: "Oct", amount: 185000 },
  { month: "Nov", amount: 220000 },
  { month: "Dec", amount: 340000 },
  { month: "Jan", amount: 280000 },
  { month: "Feb", amount: 310000 },
  { month: "Mar", amount: 145700 },
];

const sevaWise = [
  { name: "Square Foot", value: 42 },
  { name: "Brick Seva", value: 22 },
  { name: "Anna Daan", value: 18 },
  { name: "Subhojanam", value: 12 },
  { name: "General", value: 6 },
];

const COLORS = [
  "hsl(30,85%,50%)",
  "hsl(350,45%,35%)",
  "hsl(42,90%,55%)",
  "hsl(200,70%,50%)",
  "hsl(150,60%,40%)",
];

const methodIcons: Record<string, typeof CreditCard> = {
  UPI: Smartphone,
  Card: CreditCard,
  "Net Banking": Banknote,
  Cash: IndianRupee,
};

const AdminDonations = () => {
  const [search, setSearch] = useState("");
  const [sevaFilter, setSevaFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDonation, setSelectedDonation] = useState<(typeof donations)[0] | null>(null);

  const filtered = donations.filter((d) => {
    const matchSearch =
      d.donor.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase());
    const matchSeva = sevaFilter === "all" || d.seva === sevaFilter;
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    return matchSearch && matchSeva && matchStatus;
  });

  const totalCollected = donations
    .filter((d) => d.status === "completed")
    .reduce((s, d) => s + d.amount, 0);
  const totalDonors = new Set(donations.map((d) => d.email)).size;
  const thisMonth = donations
    .filter((d) => d.date.startsWith("2026-03") && d.status === "completed")
    .reduce((s, d) => s + d.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Donations & Payments</h1>
          <p className="text-muted-foreground">Track all seva donations and payment details</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Collected", value: `₹${totalCollected.toLocaleString("en-IN")}`, icon: IndianRupee, sub: "All time", color: "text-green-600" },
          { label: "This Month", value: `₹${thisMonth.toLocaleString("en-IN")}`, icon: TrendingUp, sub: "March 2026", color: "text-primary" },
          { label: "Total Donors", value: totalDonors.toString(), icon: Users, sub: "Unique donors", color: "text-blue-500" },
          { label: "Transactions", value: donations.length.toString(), icon: Calendar, sub: "All records", color: "text-purple-500" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <span className="text-xs text-muted-foreground">{stat.sub}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">Monthly Donations</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyDonations}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
                <Bar dataKey="amount" fill="hsl(30,85%,50%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Seva-wise Split</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={sevaWise} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {sevaWise.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="px-6 pb-4 flex flex-wrap gap-3">
            {sevaWise.map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by donor, email or transaction ID…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={sevaFilter} onValueChange={setSevaFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><Filter className="w-4 h-4 mr-2" /><SelectValue placeholder="Seva Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sevas</SelectItem>
                <SelectItem value="Square Foot Seva">Square Foot Seva</SelectItem>
                <SelectItem value="Brick Seva">Brick Seva</SelectItem>
                <SelectItem value="Anna Daan">Anna Daan</SelectItem>
                <SelectItem value="Subhojanam">Subhojanam</SelectItem>
                <SelectItem value="General Donation">General Donation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Seva</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((d) => {
                  const MethodIcon = methodIcons[d.method] || IndianRupee;
                  return (
                    <TableRow key={d.id}>
                      <TableCell className="font-mono text-xs">{d.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{d.donor}</p>
                          <p className="text-xs text-muted-foreground">{d.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{d.seva}</TableCell>
                      <TableCell className="text-right font-semibold">₹{d.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm">
                          <MethodIcon className="w-3.5 h-3.5 text-muted-foreground" />
                          {d.method}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={d.status === "completed" ? "default" : d.status === "pending" ? "secondary" : "destructive"} className="text-[11px]">
                          {d.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{d.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedDonation(d)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">No donations found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedDonation} onOpenChange={() => setSelectedDonation(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
          </DialogHeader>
          {selectedDonation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Transaction ID", selectedDonation.id],
                  ["Receipt No.", selectedDonation.receipt],
                  ["Donor Name", selectedDonation.donor],
                  ["Email", selectedDonation.email],
                  ["Phone", selectedDonation.phone],
                  ["Seva Type", selectedDonation.seva],
                  ["Amount", `₹${selectedDonation.amount.toLocaleString("en-IN")}`],
                  ["Payment Method", selectedDonation.method],
                  ["Date", selectedDonation.date],
                  ["Status", selectedDonation.status],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-muted-foreground text-xs">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full gap-2">
                <Download className="w-4 h-4" /> Download Receipt
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDonations;
