import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MediaType } from "@/types";

interface MediaCardProps {
  title: string;
  posterPath: string | null;
  overview: string;
  releaseDate: string | null;
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
  const posterUrl = posterPath ? `https://image.tmdb.org/t/p/w300${posterPath}` : fallback;

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="bg-muted relative aspect-2/3 overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
        />
        <Badge variant="secondary" className="absolute top-2 left-2 text-xs uppercase">
          {mediaType === "tv" ? "TV" : "Movie"}
        </Badge>
      </div>
      <CardContent className="flex flex-1 flex-col gap-2 p-3">
        <div>
          <h3 className="line-clamp-1 text-sm font-semibold">{title}</h3>
          {year && <p className="text-muted-foreground text-xs">{year}</p>}
        </div>
        {overview && <p className="text-muted-foreground line-clamp-3 text-xs">{overview}</p>}
        {actions && <div className="mt-auto pt-2">{actions}</div>}
      </CardContent>
    </Card>
  );
}
