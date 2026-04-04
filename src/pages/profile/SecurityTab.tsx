import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangePasswordForm } from "@/features/profile/change-password-form";
import { SetPassword } from "@/features/profile/set-password";
import { TwoFactorSettings } from "@/features/profile/two-factor-settings";
import { LinkedAccounts } from "@/features/profile/linked-accounts";
import { authClient, type AppUser } from "@/lib/auth-client";

export function SecurityTab() {
  const { data: session } = authClient.useSession();
  const twoFactorEnabled = !!(session?.user as AppUser | undefined)?.twoFactorEnabled;

  const [accounts, setAccounts] = useState<{ providerId: string }[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  useEffect(() => {
    authClient.listAccounts().then((result) => {
      if (!result.error) {
        setAccounts((result.data as { providerId: string }[]) ?? []);
      }
      setIsLoadingAccounts(false);
    });
  }, []);

  const hasCredentialAccount = accounts.some((a) => a.providerId === "credential");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{hasCredentialAccount ? "Change password" : "Password"}</CardTitle>
          <CardDescription>
            {hasCredentialAccount ? "Update your password" : "Add a password to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingAccounts ? null : hasCredentialAccount ? (
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
          <LinkedAccounts />
        </CardContent>
      </Card>
    </div>
  );
}
