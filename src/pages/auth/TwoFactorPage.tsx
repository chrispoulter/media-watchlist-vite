import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TwoFactorForm } from "@/features/auth/two-factor-form";

export function TwoFactorPage() {
  return (
    <>
      <title>Two-Factor Authentication | Media Watchlist</title>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm space-y-4">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Two-factor authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <TwoFactorForm />
            </CardContent>
          </Card>

          <p className="text-muted-foreground text-center text-sm">
            <Link to="/login" className="hover:text-foreground underline underline-offset-4">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
