import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { DeleteAccountDialog } from '@/features/profile/delete-account-dialog'

export function DangerTab() {
    return (
        <>
            <title>Danger Zone | Media Watchlist</title>
            <Card>
                <CardHeader>
                    <CardTitle>Delete Account</CardTitle>
                    <CardDescription>
                        Permanently delete your account and all associated data.
                        This cannot be undone.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DeleteAccountDialog />
                </CardContent>
            </Card>
        </>
    )
}
