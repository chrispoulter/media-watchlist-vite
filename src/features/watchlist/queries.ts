import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { WatchlistItem } from "@/types";

export const watchlistKeys = {
  all: ["watchlist"] as const,
};

export function useWatchlist() {
  return useQuery({
    queryKey: watchlistKeys.all,
    queryFn: ({ signal }) => api.get("/api/watchlist", { signal }).json<WatchlistItem[]>(),
  });
}

export function useAddToWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: Omit<WatchlistItem, "id" | "addedAt">) =>
      api.post("/api/watchlist", { json: item }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: watchlistKeys.all });
    },
  });
}

export function useRemoveFromWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/api/watchlist/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: watchlistKeys.all });
    },
  });
}
