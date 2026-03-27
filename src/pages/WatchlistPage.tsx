import { WatchlistGrid } from "@/features/watchlist/watchlist-grid";
import { useWatchlist } from "@/features/watchlist/queries";

export function WatchlistPage() {
  const { data: items } = useWatchlist();
  const count = items?.length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Watchlist</h1>
        {count > 0 && (
          <p className="text-muted-foreground text-sm">
            {count} {count === 1 ? "title" : "titles"}
          </p>
        )}
      </div>
      <WatchlistGrid />
    </div>
  );
}
