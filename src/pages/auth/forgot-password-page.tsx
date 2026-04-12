import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";

export function ForgotPasswordPage() {
  return (
    <>
      <title>Forgot Password | Media Watchlist</title>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Forgot your password?</CardTitle>
              <CardDescription>Enter your email and we'll send you a reset link</CardDescription>
            </CardHeader>
            <CardContent>
              <ForgotPasswordForm />
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
