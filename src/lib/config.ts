import { z } from "zod";

declare global {
  interface Window {
    __ENV__?: Record<string, string>;
  }
}

const configSchema = z.object({
  VITE_API_URL: z.url("VITE_API_URL must be a valid URL"),
});

console.log(import.meta.env)

export const config = configSchema.parse({
  ...window.__ENV__,
  ...import.meta.env,
});
