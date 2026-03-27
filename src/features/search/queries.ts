import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { SearchResponse, MediaType } from "@/types";

type SearchType = MediaType | "multi";

export const searchKeys = {
  results: (query: string, type: SearchType, page: number) =>
    ["search", query, type, page] as const,
};

export function useSearch(query: string, type: SearchType = "multi", page = 1) {
  return useQuery({
    queryKey: searchKeys.results(query, type, page),
    queryFn: async () => {
      const { data } = await api.get<SearchResponse>("/api/search", {
        params: { query, type, page },
      });
      return data;
    },
    enabled: query.trim().length >= 2,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
