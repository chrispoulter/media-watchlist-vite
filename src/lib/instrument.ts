import * as Sentry from '@sentry/react';
import { config } from '@/lib/config';

export function init() {
    if (!config.VITE_SENTRY_DSN) {
        return;
    }

    Sentry.init({
        dsn: config.VITE_SENTRY_DSN,
        release: __APP_VERSION__,
        environment: import.meta.env.MODE,
        integrations: [Sentry.browserTracingIntegration()],
        tracesSampleRate: 1.0,
    });
}
