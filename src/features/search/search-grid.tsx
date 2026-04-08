import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "./search-queries";
import { SearchBar } from "./search-bar";
import { SearchCard } from "./search-card";

export function SearchGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchEnabled = searchQuery.trim().length >= 2;
  const { data: searchResults, isLoading, error } = useSearch(searchQuery, searchEnabled);

  return (
    <>
      <SearchBar onSearch={setSearchQuery} />

      {searchEnabled ? (
        isLoading ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-2/3 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-muted-foreground py-16 text-center">
            <p>Failed to load search results. Please try again.</p>
          </div>
        ) : !searchResults?.length ? (
          <div className="text-muted-foreground py-16 text-center">
            <p>No results found. Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
            {searchResults.map((result) => (
              <SearchCard key={`${result.mediaType}-${result.tmdbId}`} result={result} />
            ))}
          </div>
        )
      ) : (
        <div className="text-muted-foreground py-24 text-center">
          <p>Start typing to search for movies and TV shows</p>
        </div>
      )}
    </>
  );
}
