import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@/pages/error-page';
import { Header } from './header';
import { Footer } from './footer';

export function RootLayout() {
    const { pathname } = useLocation();

    return (
        <div className="bg-background flex min-h-screen flex-col">
            <Header />
            <main className="container mx-auto flex flex-1 flex-col px-4 py-8">
                <ErrorBoundary
                    FallbackComponent={ErrorPage}
                    resetKeys={[pathname]}
                >
                    <Outlet />
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    );
}
