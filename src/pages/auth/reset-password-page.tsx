import { Link } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ResetPasswordForm } from '@/features/auth/reset-password-form'

export function ResetPasswordPage() {
    return (
        <>
            <title>Reset Password | Media Watchlist</title>
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-sm space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Reset your password
                            </CardTitle>
                            <CardDescription>
                                Enter your new password below
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResetPasswordForm />
                        </CardContent>
                    </Card>

                    <p className="text-muted-foreground text-center text-sm">
                        <Link
                            to="/login"
                            className="hover:text-foreground underline underline-offset-4"
                        >
                            Back to sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
