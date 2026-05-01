import { z } from 'zod';

declare global {
    interface Window {
        __ENV__?: Record<string, string>;
    }
}

const gitCommitSha =
    import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA ??
    import.meta.env.VITE_GIT_COMMIT_SHA;

export const version = gitCommitSha?.slice(0, 7) ?? __APP_VERSION__;

export const environment =
    import.meta.env.VITE_VERCEL_ENV ?? import.meta.env.MODE ?? 'development';

const configSchema = z.object({
    VITE_API_URL: z.url('VITE_API_URL must be a valid URL'),
});

export const config = configSchema.parse({
    ...window.__ENV__,
    ...import.meta.env,
});
