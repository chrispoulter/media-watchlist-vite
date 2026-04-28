import { Routes, Route } from 'react-router-dom'
import { RootLayout } from '@/components/root-layout'
import { RequireAuth } from '@/components/require-auth'
import { RequireGuest } from '@/components/require-guest'

import { LoginPage } from '@/pages/auth/login-page'
import { RegisterPage } from '@/pages/auth/register-page'
import { TwoFactorPage } from '@/pages/auth/two-factor-page'
import { ForgotPasswordPage } from '@/pages/auth/forgot-password-page'
import { ResetPasswordPage } from '@/pages/auth/reset-password-page'
import { AuthErrorPage } from '@/pages/auth/auth-error-page'
import { WatchlistPage } from '@/pages/watchlist-page'
import { SearchPage } from '@/pages/search-page'
import { ProfileLayout } from '@/pages/profile/profile-layout'
import { ProfileTab } from '@/pages/profile/profile-tab'
import { SecurityTab } from '@/pages/profile/security-tab'
import { DangerTab } from '@/pages/profile/danger-tab'
import { NotFoundPage } from '@/pages/not-found-page'

export default function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                {/* Guest-only routes */}
                <Route element={<RequireGuest />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPasswordPage />}
                    />
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
    )
}
