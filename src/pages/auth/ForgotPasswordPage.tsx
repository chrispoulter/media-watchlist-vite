import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-8">
      <div className="w-full max-w-sm space-y-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Forgot your password?</CardTitle>
            <CardDescription>
              Enter your email and we'll send you a reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          <Link to="/login" className="underline underline-offset-4 hover:text-foreground">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
