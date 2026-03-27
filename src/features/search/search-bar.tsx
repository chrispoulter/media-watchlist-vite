import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type FilterType = "multi" | "movie" | "tv";

interface SearchBarProps {
  onSearch: (query: string, type: FilterType) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<FilterType>("multi");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query, type);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, type, onSearch]);

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search movies and TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      <select
        value={type}
        onChange={(e) => setType(e.target.value as FilterType)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <option value="multi">All</option>
        <option value="movie">Movies</option>
        <option value="tv">TV Shows</option>
      </select>
    </div>
  );
}
