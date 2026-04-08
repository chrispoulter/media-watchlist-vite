import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { WatchlistItem, SearchResult } from "@/types";

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
      api.post("/api/watchlist", { json: item }).json<WatchlistItem>(),
    onSuccess: (created, variables) => {
      queryClient.invalidateQueries({ queryKey: watchlistKeys.all });
      queryClient.setQueriesData<SearchResult[]>({ queryKey: ["search"] }, (old) =>
        old?.map((r) =>
          r.tmdbId === variables.tmdbId && r.mediaType === variables.mediaType
            ? { ...r, watchlistItemId: created.id }
            : r
        )
      );
    },
  });
}

export function useRemoveFromWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/api/watchlist/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: watchlistKeys.all });
      queryClient.setQueriesData<SearchResult[]>({ queryKey: ["search"] }, (old) =>
        old?.map((r) => (r.watchlistItemId === id ? { ...r, watchlistItemId: undefined } : r))
      );
    },
  });
}
