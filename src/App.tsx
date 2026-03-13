import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import FounderPage from "./pages/FounderPage";
import SevasPage from "./pages/SevasPage";
import SubhojanamPage from "./pages/SubhojanamPage";
import AnnaDaanPage from "./pages/AnnaDaanPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import EventsPage from "./pages/EventsPage";
import DailySchedulePage from "./pages/DailySchedulePage";
import DonatePage from "./pages/DonatePage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminContent from "./pages/admin/AdminContent";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminDevotees from "./pages/admin/AdminDevotees";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLayout from "./components/admin/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/founder" element={<FounderPage />} />
            <Route path="/sevas" element={<SevasPage />} />
            <Route path="/subhojanam" element={<SubhojanamPage />} />
            <Route path="/anna-daan-seva" element={<AnnaDaanPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/daily-schedule" element={<DailySchedulePage />} />
            <Route path="/donate" element={<DonatePage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/analytics" element={<AdminLayout><AdminAnalytics /></AdminLayout>} />
            <Route path="/admin/donations" element={<AdminLayout><AdminDonations /></AdminLayout>} />
            <Route path="/admin/events" element={<AdminLayout><AdminEvents /></AdminLayout>} />
            <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
            <Route path="/admin/content" element={<AdminLayout><AdminContent /></AdminLayout>} />
            <Route path="/admin/notifications" element={<AdminLayout><AdminNotifications /></AdminLayout>} />
            <Route path="/admin/devotees" element={<AdminLayout><AdminDevotees /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
