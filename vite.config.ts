import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const PACKAGE_VERSION = process.env.npm_package_version;
const COMMIT_SHA = process.env.GITHUB_SHA ?? process.env.VERCEL_GIT_COMMIT_SHA;

export const version = COMMIT_SHA
  ? `${PACKAGE_VERSION} (${COMMIT_SHA.slice(0, 7)})`
  : PACKAGE_VERSION;

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
