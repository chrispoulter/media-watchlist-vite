import { Routes, Route } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { RequireGuest } from "@/components/auth/RequireGuest";

import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { TwoFactorPage } from "@/pages/auth/TwoFactorPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { AuthErrorPage } from "@/pages/auth/AuthErrorPage";
import { WatchlistPage } from "@/pages/WatchlistPage";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileLayout } from "@/pages/profile/ProfileLayout";
import { ProfileTab } from "@/pages/profile/ProfileTab";
import { SecurityTab } from "@/pages/profile/SecurityTab";
import { DangerTab } from "@/pages/profile/DangerTab";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Guest-only routes */}
        <Route element={<RequireGuest />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Public routes */}
        <Route path="/two-factor" element={<TwoFactorPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/error" element={<AuthErrorPage />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<WatchlistPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<ProfileTab />} />
            <Route path="security" element={<SecurityTab />} />
            <Route path="danger" element={<DangerTab />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
