import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "vite",
  rewrites: [
    routes.rewrite("/api/(.*)", `${process.env.VITE_API_URL}/api/$1`),
    routes.rewrite("/(.*)", "/index.html"),
  ],
};
