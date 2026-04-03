import { useState } from "react";
import { toast } from "sonner";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaCard } from "@/components/shared/MediaCard";
import { useAddToWatchlist } from "@/features/watchlist/queries";
import type { SearchResult, WatchlistItem } from "@/types";

interface SearchResultCardProps {
  result: SearchResult;
  watchlistItems: WatchlistItem[] | undefined;
}

export function SearchResultCard({ result, watchlistItems }: SearchResultCardProps) {
  const [added, setAdded] = useState(false);
  const addMutation = useAddToWatchlist();

  const isInWatchlist =
    added ||
    watchlistItems?.some(
      (item) => item.tmdbId === result.tmdbId && item.mediaType === result.mediaType
    );

  const handleAdd = async () => {
    const { error } = await addMutation
      .mutateAsync({
        tmdbId: result.tmdbId,
        mediaType: result.mediaType,
        title: result.title,
        posterPath: result.posterPath,
        overview: result.overview,
        releaseDate: result.releaseDate,
      })
      .then(
        () => ({ error: null }),
        (err: Error) => ({ error: err })
      );

    if (error) {
      toast.error("Failed to add to watchlist");
    } else {
      toast.success(`"${result.title}" added to watchlist`);
      setAdded(true);
    }
  };

  return (
    <MediaCard
      title={result.title}
      posterPath={result.posterPath}
      overview={result.overview}
      releaseDate={result.releaseDate}
      mediaType={result.mediaType}
      actions={
        <Button
          size="sm"
          variant={isInWatchlist ? "secondary" : "default"}
          className="w-full"
          onClick={handleAdd}
          disabled={isInWatchlist || addMutation.isPending}
        >
          {isInWatchlist ? (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5" />
              In watchlist
            </>
          ) : (
            <>
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add
            </>
          )}
        </Button>
      }
    />
  );
}
