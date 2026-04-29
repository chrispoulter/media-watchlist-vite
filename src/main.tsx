import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from '@sentry/react';
// import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from '@/components/ui/sonner';
import { queryClient } from '@/lib/query-client';
import { initSentry } from '@/lib/sentry';
import App from './app.tsx';
import './index.css';

initSentry();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ErrorBoundary
                        fallback={
                            <div className="flex min-h-screen items-center justify-center p-8 text-center">
                                Something went wrong. Please refresh the page.
                            </div>
                        }
                    >
                        <App />
                    </ErrorBoundary>
                </ThemeProvider>
            </BrowserRouter>
            <Toaster invert />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
);
