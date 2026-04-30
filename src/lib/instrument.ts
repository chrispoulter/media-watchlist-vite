import * as Sentry from '@sentry/react';
import { config, release, environment } from '@/lib/config';

export function init() {
    if (!config.VITE_SENTRY_DSN) {
        return;
    }

    console.log('Initializing Sentry with DSN:', {
        dsn: config.VITE_SENTRY_DSN,
        release,
        environment,
    });

    Sentry.init({
        dsn: config.VITE_SENTRY_DSN,
        release,
        environment,
        sendDefaultPii: true,
        integrations: [Sentry.browserTracingIntegration()],
        tracesSampleRate: 1.0,
    });
}
