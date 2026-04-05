import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChangePasswordForm } from "@/features/profile/change-password-form";
import { SetPassword } from "@/features/profile/set-password";
import { TwoFactorSettings } from "@/features/profile/two-factor-settings";
import { LinkedAccounts, type Account } from "@/features/profile/linked-accounts";
import { authClient } from "@/lib/auth-client";

export function SecurityTab() {
  const { data: session } = authClient.useSession();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  useEffect(() => {
    authClient.listAccounts().then((result) => {
      if (!result.error) {
        setAccounts(result.data ?? []);
      }
      setIsLoadingAccounts(false);
    });
  }, []);

  const twoFactorEnabled = !!session?.user?.twoFactorEnabled;
  const hasCredentialAccount = accounts.some((a) => a.providerId === "credential");

  return (
    <>
      <title>Security | Media Watchlist</title>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            {isLoadingAccounts ? (
              <>
                <Skeleton className="h-6 w-36" />
                <Skeleton className="mt-1 h-4 w-52" />
              </>
            ) : (
              <>
                <CardTitle>{hasCredentialAccount ? "Change password" : "Password"}</CardTitle>
                <CardDescription>
                  {hasCredentialAccount ? "Update your password" : "Add a password to your account"}
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {isLoadingAccounts ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-9 w-24" />
              </div>
            ) : hasCredentialAccount ? (
              <ChangePasswordForm />
            ) : (
              <SetPassword email={session?.user.email ?? ""} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-factor authentication</CardTitle>
            <CardDescription>
              Add an extra layer of security to your account using an authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TwoFactorSettings twoFactorEnabled={twoFactorEnabled} />
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
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <LinkedAccounts initialAccounts={accounts} />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
