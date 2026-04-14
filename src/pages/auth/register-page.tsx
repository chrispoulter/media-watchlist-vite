import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SocialSignInButtons } from "@/components/social-sign-in-buttons";
import { RegisterForm } from "@/features/auth/register-form";

export function RegisterPage() {
  return (
    <>
      <title>Register | Media Watchlist</title>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>Enter your details to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SocialSignInButtons />

              <div className="relative">
                <Separator />
                <span className="bg-card text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs">
                  or
                </span>
              </div>

              <RegisterForm />
            </CardContent>
          </Card>

          <p className="text-muted-foreground text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="hover:text-foreground underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
