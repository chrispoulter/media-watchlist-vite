import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UpdateProfileForm } from "@/features/profile/update-profile-form";
import { UpdateEmailForm } from "@/features/profile/update-email-form";
import { ChangePasswordForm } from "@/features/profile/change-password-form";
import { SetPassword } from "@/features/profile/set-password";
import { TwoFactorSettings } from "@/features/profile/two-factor-settings";
import { DeleteAccountDialog } from "@/features/profile/delete-account-dialog";
import { LinkedAccounts } from "@/features/profile/linked-accounts";
import { authClient, type AppUser } from "@/lib/auth-client";

export function ProfilePage() {
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="danger">Danger zone</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal information</CardTitle>
                <CardDescription>Update your name and date of birth</CardDescription>
              </CardHeader>
              <CardContent>
                <UpdateProfileForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email address</CardTitle>
                <CardDescription>
                  Update your email address — a verification link will be sent to confirm the change
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UpdateEmailForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="danger">
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Delete account</CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data. This cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="mb-4" />
                <DeleteAccountDialog />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
