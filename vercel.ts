import { routes, type VercelConfig } from "@vercel/config/v1";

const apiUrl = process.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Vercel rewrite requires VITE_API_URL to be set.");
}

export const config: VercelConfig = {
  framework: "vite",
  rewrites: [
    routes.rewrite("/api/(.*)", `${apiUrl}/api/$1`),
    routes.rewrite("/(.*)", "/index.html"),
  ],
};
