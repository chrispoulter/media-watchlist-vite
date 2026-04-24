const apiOrigin = (process.env.VITE_API_URL || process.env.API_URL || "").replace(
  /\/+$/,
  "",
);

if (!apiOrigin) {
  throw new Error(
    "Vercel API rewrite requires VITE_API_URL or API_URL to be set to the backend origin.",
  );
}

export const config = {
  framework: "vite",
  rewrites: [
    {
      source: "/api/:path*",
      destination: `${apiOrigin}/api/:path*`,
    },
    {
      source: "/(.*)",
      destination: "/index.html",
    },
  ],
};
