import { Link } from "react-router-dom";
import { TwoFactorForm } from "@/features/auth/two-factor-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TwoFactorPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-8">
      <div className="w-full max-w-sm space-y-4">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Two-factor authentication</CardTitle>
            <CardDescription>Enter the 6-digit code from your authenticator app</CardDescription>
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
  );
}
