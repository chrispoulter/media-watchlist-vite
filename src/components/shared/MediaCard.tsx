import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MediaType } from "@/types";

interface MediaCardProps {
  title: string;
  posterPath: string | null;
  overview: string | null;
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
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w300${posterPath}`
    : "/placeholder.svg";

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img src={posterUrl} alt={title} className="h-full w-full object-cover" />
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 uppercase text-xs"
        >
          {mediaType === "tv" ? "TV" : "Movie"}
        </Badge>
      </div>
      <CardContent className="flex flex-1 flex-col gap-2 p-3">
        <div>
          <h3 className="line-clamp-1 font-semibold text-sm">{title}</h3>
          {year && <p className="text-xs text-muted-foreground">{year}</p>}
        </div>
        {overview && (
          <p className="line-clamp-3 text-xs text-muted-foreground">{overview}</p>
        )}
        {actions && <div className="mt-auto pt-2">{actions}</div>}
      </CardContent>
    </Card>
  );
}
