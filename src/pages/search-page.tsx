import { SearchResultsGrid } from "@/features/search/search-results-grid";

export function SearchPage() {
  return (
    <>
      <title>Search | Media Watchlist</title>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Search</h1>
          <p className="text-muted-foreground text-sm">
            Find movies and TV shows to add to your watchlist
          </p>
        </div>
        <SearchResultsGrid />
      </div>
    </>
  );
}
