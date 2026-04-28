import { useQuery } from '@tanstack/react-query';
import type { SearchResult } from '@/types';
import { api } from '@/lib/api';

export const searchKeys = {
    all: ['search'] as const,
    results: (query: string) => ['search', query] as const,
};

export function useSearch(query: string, enabled = true) {
    return useQuery({
        queryKey: searchKeys.results(query),
        queryFn: ({ signal }) =>
            api
                .get('/api/search', {
                    searchParams: { query },
                    signal,
                })
                .json<SearchResult[]>(),
        enabled,
    });
}
