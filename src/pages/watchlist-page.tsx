import { WatchlistGrid } from '@/features/watchlist/watchlist-grid';

export function WatchlistPage() {
    return (
        <>
            <title>My Watchlist | Media Watchlist</title>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        My Watchlist
                    </h1>
                </div>
                <WatchlistGrid />
            </div>
        </>
    );
}
