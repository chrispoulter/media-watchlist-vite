export type MediaType = "movie" | "tv";

export interface WatchlistItem {
  id: number;
  userId: string;
  tmdbId: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  overview: string | null;
  releaseDate: string | null;
  addedAt: string;
}

export interface SearchResult {
  id: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  overview: string;
  releaseDate: string;
}

export interface SearchResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  results: SearchResult[];
}
