import { useState } from "react";
import { MediaCardSkeleton } from "@/components/media-card-skeleton";
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
            <MediaCardSkeleton />
            <MediaCardSkeleton />
            <MediaCardSkeleton />
            <MediaCardSkeleton />
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
