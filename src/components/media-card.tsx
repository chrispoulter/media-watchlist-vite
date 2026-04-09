import { Badge } from "@/components/ui/badge";
import type { MediaType } from "@/types";

interface MediaCardProps {
  title: string;
  posterPath?: string;
  overview?: string;
  releaseDate?: string;
  mediaType: MediaType;
  actions?: React.ReactNode;
}

export function MediaCard({
  title,
  posterPath,
  overview,
  releaseDate,
  mediaType,
  actions,
}: MediaCardProps) {
  const year = releaseDate ? new Date(releaseDate).getFullYear() : undefined;
  const fallback = mediaType === "tv" ? "/default-tv-show.svg" : "/default-movie.svg";
  const posterUrl = posterPath || fallback;

  return (
    <div className="bg-card text-card-foreground flex flex-row overflow-hidden rounded-xl border shadow-sm">
      <img
        src={posterUrl}
        alt={title}
        onError={(e) => {
          e.currentTarget.src = fallback;
        }}
        className="h-60 w-40"
      />
      <div className="flex flex-col gap-3 p-4">
        <h3 className="line-clamp-1 font-semibold">{title}</h3>
        {year && <Badge variant="secondary">{year}</Badge>}
        <p className="text-muted-foreground line-clamp-3 text-sm">{overview}</p>
        <div className="mt-auto">{actions}</div>
      </div>
    </div>
  );
}
