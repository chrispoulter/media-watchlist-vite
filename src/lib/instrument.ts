import * as Sentry from '@sentry/react';
import { config, release, environment } from '@/lib/config';

export function init() {
    if (!config.VITE_SENTRY_DSN) {
        return;
    }

    Sentry.init({
        dsn: config.VITE_SENTRY_DSN,
        release,
        environment,
        sendDefaultPii: true,
        integrations: [Sentry.browserTracingIntegration()],
        tracePropagationTargets: [config.VITE_API_URL],
        tracesSampleRate: 1.0,
    });
}
