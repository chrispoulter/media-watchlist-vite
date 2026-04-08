import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WatchlistItemCard } from "./watchlist-item-card";
import { useWatchlist } from "./watchlist-queries";

export function WatchlistGrid() {
  const { data: items, isLoading, error } = useWatchlist();

  if (isLoading) {
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

  if (error) {
    return (
      <div className="text-muted-foreground py-16 text-center">
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
          <Link to="/search">
            <Search className="mr-2 h-4 w-4" />
            Browse titles
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <WatchlistItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
