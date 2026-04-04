import { Link, NavLink } from "react-router-dom";
import { Film, Search, BookMarked } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserMenu } from "./UserMenu";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Film className="h-5 w-5" />
          <span>Media Watchlist</span>
        </Link>

        {session && (
          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )
              }
            >
              <BookMarked className="h-4 w-4" />
              Watchlist
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )
              }
            >
              <Search className="h-4 w-4" />
              Search
            </NavLink>
          </nav>
        )}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {session && (
            <>
              <Separator orientation="vertical" className="h-5" />
              <UserMenu />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
