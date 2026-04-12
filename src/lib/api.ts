import ky, { HTTPError } from "ky";

type ApiError = {
  error?: string;
};

export const api = ky.create({
  prefix: import.meta.env.VITE_API_URL as string,
  credentials: "include",
  hooks: {
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
