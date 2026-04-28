export function Footer() {
    return (
        <footer className="border-t py-4">
            <div className="text-muted-foreground container mx-auto flex items-center justify-between px-4 text-sm">
                <span>&copy; Chris Poulter {new Date().getFullYear()}</span>
                <span>v{__APP_VERSION__}</span>
            </div>
        </footer>
    )
}
