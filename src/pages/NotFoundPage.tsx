import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Page not found</CardTitle>
            <CardDescription>The page you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/">Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
