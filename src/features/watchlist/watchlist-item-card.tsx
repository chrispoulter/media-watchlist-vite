import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaCard } from "@/components/shared/MediaCard";
import { useRemoveFromWatchlist } from "./queries";
import type { WatchlistItem } from "@/types";

interface WatchlistItemCardProps {
  item: WatchlistItem;
}

export function WatchlistItemCard({ item }: WatchlistItemCardProps) {
  const [confirming, setConfirming] = useState(false);
  const remove = useRemoveFromWatchlist();

  const handleRemove = async () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    const { error } = await remove.mutateAsync(item.id).then(
      () => ({ error: null }),
      (err: Error) => ({ error: err })
    );
    if (error) {
      toast.error("Failed to remove from watchlist");
    } else {
      toast.success(`"${item.title}" removed from watchlist`);
    }
    setConfirming(false);
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
          disabled={remove.isPending}
        >
          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
          {confirming ? "Confirm remove" : "Remove"}
        </Button>
      }
    />
  );
}
