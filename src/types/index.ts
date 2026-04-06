export type MediaType = "movie" | "tv";

export interface WatchlistItem {
  id: number;
  tmdbId: number;
  mediaType: MediaType;
  title: string;
  posterPath?: string;
  overview?: string;
  releaseDate?: string;
  addedAt: string;
}

export interface SearchResult {
  tmdbId: number;
  mediaType: MediaType;
  title: string;
  posterPath?: string;
  overview?: string;
  releaseDate?: string;
  watchlistItemId?: number;
}
