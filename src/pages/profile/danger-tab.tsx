import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DeleteAccountDialog } from "@/features/profile/delete-account-dialog";

export function DangerTab() {
  return (
    <>
      <title>Danger Zone | Media Watchlist</title>
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
    </>
  );
}
