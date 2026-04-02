import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UpdateProfileForm } from "@/features/profile/update-profile-form";
import { UpdateEmailForm } from "@/features/profile/update-email-form";
import { ChangePasswordForm } from "@/features/profile/change-password-form";
import { TwoFactorSettings } from "@/features/profile/two-factor-settings";
import { DeleteAccountDialog } from "@/features/profile/delete-account-dialog";
import { LinkedAccounts } from "@/features/profile/linked-accounts";
import { authClient, type AppUser } from "@/lib/auth-client";

export function ProfilePage() {
  const { data: session } = authClient.useSession();
  const twoFactorEnabled = !!(session?.user as AppUser | undefined)?.twoFactorEnabled;

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
                <CardDescription>Update your email address</CardDescription>
              </CardHeader>
              <CardContent>
                <UpdateEmailForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change password</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>
              <CardContent>
                <ChangePasswordForm />
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
