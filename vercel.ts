import { routes, type VercelConfig } from "@vercel/config/v1";

const apiOrigin = (process.env.VITE_API_URL || process.env.API_URL || "").replace(/\/+$/, "");

if (!apiOrigin) {
  throw new Error(
    "Vercel API rewrite requires VITE_API_URL or API_URL to be set to the backend origin."
  );
}

export const config: VercelConfig = {
  framework: "vite",
  rewrites: [
    routes.rewrite("/api/(.*)", `${apiOrigin}/api/$1`),
    routes.rewrite("/(.*)", "/index.html"),
  ],
};
