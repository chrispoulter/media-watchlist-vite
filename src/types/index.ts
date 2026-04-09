export type MediaType = "movie" | "tv";

export interface WatchlistItem {
  id: number;
  providerId: number;
  mediaType: MediaType;
  title: string;
  posterUrl?: string;
  overview?: string;
  releaseDate?: string;
  addedAt: string;
}

export interface SearchResult {
  providerId: number;
  mediaType: MediaType;
  title: string;
  posterUrl?: string;
  overview?: string;
  releaseDate?: string;
  watchlistItemId?: number;
}
