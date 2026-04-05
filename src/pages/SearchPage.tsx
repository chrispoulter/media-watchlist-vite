import { useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/features/search/queries";
import { SearchBar } from "@/features/search/search-bar";
import { useWatchlist } from "@/features/watchlist/queries";
import { SearchResultCard } from "@/features/search/search-result-card";

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults, isLoading } = useSearch(searchQuery);
  const { data: watchlistItems } = useWatchlist();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground text-sm">
          Find movies and TV shows to add to your watchlist
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {searchQuery.trim().length >= 2 && (
        <>
          {isLoading && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-2/3 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && searchResults && (
            <>
              <p className="text-muted-foreground text-sm">
                {searchResults.totalResults} results for "{searchQuery}"
              </p>
              {searchResults.results.length === 0 ? (
                <div className="text-muted-foreground py-16 text-center">
                  <p>No results found. Try a different search term.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {searchResults.results.map((result) => (
                    <SearchResultCard
                      key={`${result.mediaType}-${result.tmdbId}`}
                      result={result}
                      watchlistItems={watchlistItems}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}

      {searchQuery.trim().length === 0 && (
        <div className="text-muted-foreground py-24 text-center">
          <p>Start typing to search for movies and TV shows</p>
        </div>
      )}
    </div>
  );
}
