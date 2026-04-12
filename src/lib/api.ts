import ky, { HTTPError } from "ky";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/lib/query-client";

type ApiError = {
  error?: string;
};

export const api = ky.create({
  prefix: import.meta.env.VITE_API_URL as string,
  credentials: "include",
  hooks: {
    afterResponse: [
      async ({ response }) => {
        switch (response.status) {
          case 401:
            await authClient.signOut();
            queryClient.clear();
            break;
        }
        return response;
      },
    ],
    beforeError: [
      async ({ error }) => {
        if (error instanceof HTTPError) {
          const body = error.data as ApiError;
          error.message = body?.error || error.message;
        }
        return error;
      },
    ],
  },
});
