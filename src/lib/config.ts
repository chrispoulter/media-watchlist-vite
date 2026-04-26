import { z } from "zod";

declare global {
  interface Window {
    __ENV__?: { VITE_API_URL?: string };
  }
}

const configSchema = z.object({
  apiUrl: z.url("VITE_API_URL must be a valid URL"),
});

export const config = configSchema.parse({
  apiUrl: window.__ENV__?.VITE_API_URL || import.meta.env.VITE_API_URL,
});
