import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL as string,
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
export interface AppUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  twoFactorEnabled?: boolean | null;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}
