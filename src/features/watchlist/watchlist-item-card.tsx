import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaCard } from "@/components/media-card";
import { useRemoveFromWatchlist } from "./queries";
import type { WatchlistItem } from "@/types";

interface WatchlistItemCardProps {
  item: WatchlistItem;
}

export function WatchlistItemCard({ item }: WatchlistItemCardProps) {
  const [confirming, setConfirming] = useState(false);
  const { mutate: removeFromWatchlist, isPending: isRemoving } = useRemoveFromWatchlist();

  const handleRemove = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }

    removeFromWatchlist(item.id, {
      onSuccess: () => toast.success(`"${item.title}" removed from watchlist`),
      onError: (err) => toast.error(err.message ?? "Failed to remove from watchlist"),
      onSettled: () => setConfirming(false),
    });
  };

  return (
    <MediaCard
      title={item.title}
      posterPath={item.posterPath}
      overview={item.overview}
      releaseDate={item.releaseDate}
      mediaType={item.mediaType}
      actions={
        <Button
          size="sm"
          variant={confirming ? "destructive" : "outline"}
          className="w-full"
          onClick={handleRemove}
          disabled={isRemoving}
        >
          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
          {confirming ? "Confirm remove" : "Remove"}
        </Button>
      }
    />
  );
}
