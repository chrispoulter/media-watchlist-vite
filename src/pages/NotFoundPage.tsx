import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-8">
      <div className="w-full max-w-sm space-y-4">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl text-center">Page not found</CardTitle>
            <CardDescription className="text-center">
              The page you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/watchlist">Go to Watchlist</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
