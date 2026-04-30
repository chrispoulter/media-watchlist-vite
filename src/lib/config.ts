import { z } from 'zod';

declare global {
    interface Window {
        __ENV__?: Record<string, string>;
    }
}

export const release =
    import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA ??
    import.meta.env.VITE_GIT_COMMIT_SHA ??
    __APP_VERSION__;

export const environment =
    import.meta.env.VITE_VERCEL_ENV ?? import.meta.env.MODE ?? 'development';

const configSchema = z.object({
    VITE_API_URL: z.url(),
    VITE_SENTRY_DSN: z.url().optional(),
});

export const config = configSchema.parse({
    ...window.__ENV__,
    ...import.meta.env,
});
