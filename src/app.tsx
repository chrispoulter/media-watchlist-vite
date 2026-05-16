import { Routes, Route } from 'react-router';
import { RootLayout } from '@/components/root-layout';
import { authRoutes } from '@/features/auth/auth-routes';
import { profileRoutes } from '@/features/profile/profile-routes';
import { searchRoutes } from '@/features/search/search-routes';
import { watchlistRoutes } from '@/features/watchlist/watchlist-routes';
import { NotFoundPage } from './not-found-page';

export default function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                {authRoutes}
                {profileRoutes}
                {searchRoutes}
                {watchlistRoutes}
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
