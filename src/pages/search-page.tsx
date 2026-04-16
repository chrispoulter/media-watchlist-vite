import { SearchGrid } from "@/features/search/search-grid";

export function SearchPage() {
  throw new Error("Search page is not implemented yet");
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
        <SearchGrid />
      </div>
    </>
  );
}
