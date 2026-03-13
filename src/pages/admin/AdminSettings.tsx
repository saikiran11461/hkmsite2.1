import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Save, Globe, Bell, Shield, Palette } from "lucide-react";

const AdminSettings = () => {
  const [siteName, setSiteName] = useState("Hare Krishna Movement Vizag");
  const [siteUrl, setSiteUrl] = useState("https://www.harekrishnavizag.org");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [donationAlerts, setDonationAlerts] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage site configuration and preferences</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* General */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Globe className="w-5 h-5" /> General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Site Name</label>
              <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Site URL</label>
              <Input value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
            </div>
            <Button size="sm"><Save className="w-4 h-4 mr-1" /> Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Bell className="w-5 h-5" /> Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Email Notifications", desc: "Receive email alerts for important updates", value: emailNotifications, set: setEmailNotifications },
              { label: "Donation Alerts", desc: "Get notified for every new donation", value: donationAlerts, set: setDonationAlerts },
              { label: "Event Reminders", desc: "Reminders before upcoming events", value: eventReminders, set: setEventReminders },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch checked={item.value} onCheckedChange={item.set} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Shield className="w-5 h-5" /> Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">Temporarily disable the public website</p>
              </div>
              <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
            </div>
            <div>
              <Button variant="outline" size="sm">Change Admin Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Palette className="w-5 h-5" /> Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Theme and branding settings will be available when you connect a persistent storage provider.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
