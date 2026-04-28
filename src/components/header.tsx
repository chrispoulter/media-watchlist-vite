import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenu } from './user-menu';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';

const navItems = [
    { to: '/', label: 'Watchlist' },
    { to: '/search', label: 'Search' },
];

export function Header() {
    const { data: session } = authClient.useSession();

    return (
        <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">
                <Link to="/" className="font-semibold">
                    Media Watchlist
                </Link>

                <div className="flex items-center gap-2">
                    {session && (
                        <nav className="hidden items-center gap-1 sm:flex">
                            {navItems.map(({ to, label }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={({ isActive }) =>
                                        cn(
                                            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                                            isActive
                                                ? 'bg-secondary text-secondary-foreground'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                                        )
                                    }
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </nav>
                    )}
                    {session && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="sm:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {navItems.map(({ to, label }) => (
                                    <DropdownMenuItem key={to} asChild>
                                        <Link to={to}>{label}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    <ThemeToggle />
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
