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
          const isJson = error.response.headers.get("content-type")?.includes("application/json");
          if (isJson) {
            const body = (await error.response.json()) as ApiError;
            if (typeof body.error === "string") {
              error.message = body.error;
            }
          }
        }
        return error;
      },
    ],
  },
});
