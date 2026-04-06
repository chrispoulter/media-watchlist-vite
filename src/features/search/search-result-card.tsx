import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaCard } from "@/components/media-card";
import { useAddToWatchlist, useRemoveFromWatchlist } from "@/features/watchlist/queries";
import type { SearchResult } from "@/types";

interface SearchResultCardProps {
  result: SearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  const [confirming, setConfirming] = useState(false);
  const { mutateAsync: addToWatchlist, isPending: isAdding } = useAddToWatchlist();
  const { mutateAsync: removeFromWatchlist, isPending: isRemoving } = useRemoveFromWatchlist();

  const handleAdd = async () => {
    const { error } = await addToWatchlist({
      tmdbId: result.tmdbId,
      mediaType: result.mediaType,
      title: result.title,
      posterPath: result.posterPath,
      overview: result.overview,
      releaseDate: result.releaseDate,
    });

    if (error) {
      toast.error("Failed to add to watchlist");
    } else {
      toast.success(`"${result.title}" added to watchlist`);
    }
  };

  const handleRemove = async () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    const { error } = await removeFromWatchlist(result.watchlistItemId!);

    if (error) {
      toast.error("Failed to remove from watchlist");
    } else {
      toast.success(`"${result.title}" removed from watchlist`);
    }
    setConfirming(false);
  };

  return (
    <MediaCard
      title={result.title}
      posterPath={result.posterPath}
      overview={result.overview}
      releaseDate={result.releaseDate}
      mediaType={result.mediaType}
      actions={
        <>
          {result.watchlistItemId ? (
            <Button
              size="sm"
              variant={confirming ? "destructive" : "outline"}
              className="mb-2 w-full"
              onClick={handleRemove}
              disabled={isRemoving}
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              {confirming ? "Confirm remove" : "Remove"}
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={handleAdd}
              disabled={isAdding}
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add to Watchlist
            </Button>
          )}
        </>
      }
    />
  );
}
