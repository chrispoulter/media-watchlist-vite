import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ForgotPasswordPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <Card>
          <CardHeader className="space-y-1">
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
  );
}
