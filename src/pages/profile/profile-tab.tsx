import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateProfileForm } from "@/features/profile/update-profile-form";
import { UpdateEmailForm } from "@/features/profile/update-email-form";

export function ProfileTab() {
  return (
    <>
      <title>Profile | Media Watchlist</title>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
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
      </div>
    </>
  );
}
