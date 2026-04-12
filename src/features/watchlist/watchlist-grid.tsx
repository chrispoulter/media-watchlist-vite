import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MediaCardSkeleton } from "@/components/media-card-skeleton";
import { WatchlistCard } from "./watchlist-card";
import { useWatchlist } from "./watchlist-queries";

export function WatchlistGrid() {
  const { data: items, isLoading, error } = useWatchlist();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        <MediaCardSkeleton />
        <MediaCardSkeleton />
        <MediaCardSkeleton />
        <MediaCardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-muted-foreground py-24 text-center">
        <p>Failed to load watchlist. Please try again.</p>
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="py-24 text-center">
        <p className="mb-4 text-lg font-medium">Your watchlist is empty</p>
        <p className="text-muted-foreground mb-6 text-sm">
          Search for movies and TV shows to add them here
        </p>
        <Button asChild className="w-full sm:w-auto">
          <Link to="/search">Browse titles</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
      {items.map((item) => (
        <WatchlistCard key={item.id} item={item} />
      ))}
    </div>
  );
}
