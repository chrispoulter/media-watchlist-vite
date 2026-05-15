import { Routes, Route } from 'react-router';
import { RootLayout } from '@/components/root-layout';
import { RequireAuth } from '@/components/require-auth';
import { RequireGuest } from '@/components/require-guest';

import { LoginPage } from '@/features/auth/login/login-page';
import { RegisterPage } from '@/features/auth/register/register-page';
import { TwoFactorPage } from '@/features/auth/two-factor/two-factor-page';
import { ForgotPasswordPage } from '@/features/auth/forgot-password/forgot-password-page';
import { ResetPasswordPage } from '@/features/auth/reset-password/reset-password-page';
import { AuthErrorPage } from '@/features/auth/auth-error/auth-error-page';
import { WatchlistPage } from '@/features/watchlist/watchlist-page';
import { SearchPage } from '@/features/search/search-page';
import { ProfileLayout } from '@/features/profile/profile-layout';
import { ProfileTab } from '@/features/profile/info/profile-tab';
import { SecurityTab } from '@/features/profile/security/security-tab';
import { DangerTab } from '@/features/profile/danger/danger-tab';

import { NotFoundPage } from './not-found-page';

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
    );
}
