import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChangePasswordForm } from "@/features/profile/change-password-form";
import { SetPassword } from "@/features/profile/set-password";
import { TwoFactorSettings } from "@/features/profile/two-factor/two-factor-settings";
import { LinkedAccounts } from "@/features/profile/linked-accounts";
import { authClient } from "@/lib/auth-client";

export function SecurityTab() {
  const [accounts, setAccounts] = useState<{ providerId: string }[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  useEffect(() => {
    authClient.listAccounts().then((result) => {
      if (!result.error) {
        setAccounts(result.data ?? []);
      }
      setIsLoadingAccounts(false);
    });
  }, []);

  const hasCredentialAccount = accounts?.some((a) => a.providerId === "credential");

  return (
    <>
      <title>Security | Media Watchlist</title>
      <div className="space-y-6">
        {isLoadingAccounts ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36" />
              <Skeleton className="mt-1 h-4 w-52" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-9 w-24" />
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
            {isLoadingAccounts ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
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
