import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const ERROR_MESSAGES: Record<string, string> = {
  "email_doesn't_match":
    "The Google account email doesn't match your account email. Please link a Google account that uses the same email address.",
  account_already_linked_to_different_user:
    "This Google account is already linked to a different user. Please use a different Google account.",
  unable_to_link_account:
    "Unable to link this account. Please try again or contact support if the issue persists.",
  invalid_code: "The authentication code was invalid or expired. Please try signing in again.",
  unable_to_get_user_info:
    "Could not retrieve your account information from Google. Please try again.",
  email_not_found:
    "No email address was returned by Google. Please ensure your Google account has a verified email.",
  oauth_provider_not_found:
    "The requested sign-in provider is not configured. Please contact support.",
};

const DEFAULT_MESSAGE = "An unexpected authentication error occurred. Please try again.";

export function AuthErrorPage() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error") ?? "";
  const message = ERROR_MESSAGES[error] ?? DEFAULT_MESSAGE;

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Authentication error</CardTitle>
            <CardDescription>Something went wrong during authentication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
            <Button asChild className="w-full">
              <Link to="/profile">Back to profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
