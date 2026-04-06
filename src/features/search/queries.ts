import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { SearchResponse } from "@/types";

export const searchKeys = {
  results: (query: string) => ["search", query] as const,
};

export function useSearch(query: string) {
  return useQuery({
    queryKey: searchKeys.results(query),
    queryFn: async () => {
      const { data } = await api.get<SearchResponse>("/api/search", {
        params: { q: query },
      });
      return data;
    },
    enabled: query.trim().length >= 2,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
