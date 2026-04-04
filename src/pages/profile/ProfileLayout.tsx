import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS = [
  { value: "profile", label: "Profile", path: "/profile" },
  { value: "security", label: "Security", path: "/profile/security" },
  { value: "danger", label: "Danger zone", path: "/profile/danger" },
];

export function ProfileLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeTab = TABS.find((t) => t.path === pathname)?.value ?? "profile";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings</p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(val) => navigate(TABS.find((t) => t.value === val)!.path)}
      >
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          <Outlet />
        </div>
      </Tabs>
    </div>
  );
}
