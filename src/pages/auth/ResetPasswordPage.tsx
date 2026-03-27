import { Link } from "react-router-dom";
import { ResetPasswordForm } from "@/features/auth/reset-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ResetPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-8">
      <div className="w-full max-w-sm space-y-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Reset your password</CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm />
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
