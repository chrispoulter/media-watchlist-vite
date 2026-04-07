import { useCallback, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "./search-queries";
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
  const { data: searchResults, isLoading } = useSearch(searchQuery);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {searchQuery.trim().length >= 2 && (
        <>
          {isLoading && <SearchResultsSkeleton />}

          {!isLoading && searchResults && (
            <>
              {searchResults.length === 0 ? (
                <div className="text-muted-foreground py-16 text-center">
                  <p>No results found. Try a different search term.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {searchResults.map((result) => (
                    <SearchResultCard
                      key={`${result.mediaType}-${result.tmdbId}`}
                      result={result}
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
