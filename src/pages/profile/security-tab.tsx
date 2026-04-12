import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChangePasswordForm } from "@/features/profile/change-password-form";
import { SetPassword } from "@/features/profile/set-password";
import { TwoFactorSettings } from "@/features/profile/two-factor/two-factor-settings";
import { LinkedAccounts } from "@/features/profile/linked-accounts";
import { useAccounts } from "@/features/profile/profile-queries";
import { authProviders } from "@/lib/auth-providers";

export function SecurityTab() {
  const { data: accounts = [], isLoading } = useAccounts();

  const hasCredentialAccount = accounts?.some((a) => a.providerId === "credential");

  return (
    <>
      <title>Security | Media Watchlist</title>
      <div className="space-y-6">
        {isLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-4 w-52" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-52" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-52" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-52" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-9 w-full sm:w-24" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{hasCredentialAccount ? "Change password" : "Password"}</CardTitle>
              <CardDescription>
                {hasCredentialAccount ? "Update your password" : "Add a password to your account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasCredentialAccount ? <ChangePasswordForm /> : <SetPassword />}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Two-factor authentication</CardTitle>
            <CardDescription>
              Add an extra layer of security to your account using an authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TwoFactorSettings />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Linked accounts</CardTitle>
            <CardDescription>
              Connect your account to a third-party provider for passwordless sign-in
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {authProviders.map((provider) => (
                  <Skeleton key={provider.id} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <LinkedAccounts accounts={accounts} />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
