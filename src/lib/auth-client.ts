import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: `${window.location.origin}/api/auth`,
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/two-factor";
      },
    }),
  ],
});

export type Session = typeof authClient.$Infer.Session;

// Extended user type including additional fields from the API
export type AppUser = Session["user"] & {};
