import { useQuery } from "@tanstack/react-query";
import type { SearchResult } from "@/types";
import { api } from "@/lib/api";

export const searchKeys = {
  results: (query: string) => ["search", query] as const,
};

export function useSearch(query: string) {
  return useQuery({
    queryKey: searchKeys.results(query),
    queryFn: async () => {
      const { data } = await api.get<SearchResult[]>("/api/search", {
        params: { q: query },
      });
      return data;
    },
    enabled: query.trim().length >= 2,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
