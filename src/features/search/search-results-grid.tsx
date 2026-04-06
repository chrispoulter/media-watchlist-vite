import { useCallback, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "./queries";
import { useWatchlist } from "../watchlist/queries";
import { SearchBar } from "./search-bar";
import { SearchResultCard } from "./search-result-card";

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-2/3 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function SearchResultsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults, isLoading: isSearchLoading } = useSearch(searchQuery);
  const { data: watchlistItems, isLoading: isWatchlistLoading } = useWatchlist();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const isLoading = isSearchLoading || isWatchlistLoading;
  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {searchQuery.trim().length >= 2 && (
        <>
          {isLoading && <SearchResultsSkeleton />}

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

      {searchQuery.trim().length < 2 && (
        <div className="text-muted-foreground py-24 text-center">
          <p>Start typing to search for movies and TV shows</p>
        </div>
      )}
    </>
  );
}
