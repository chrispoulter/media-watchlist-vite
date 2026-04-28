import { Link } from 'react-router-dom';
import { LoginForm } from '@/features/auth/login-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SocialSignInButtons } from '@/components/social-sign-in-buttons';

export function LoginPage() {
    return (
        <>
            <title>Login | Media Watchlist</title>
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-md space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Welcome Back
                            </CardTitle>
                            <CardDescription>
                                Sign in to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <SocialSignInButtons />

                            <div className="relative">
                                <Separator />
                                <span className="bg-card text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs">
                                    or
                                </span>
                            </div>

                            <LoginForm />
                        </CardContent>
                    </Card>

                    <p className="text-muted-foreground text-center text-sm">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="hover:text-foreground underline underline-offset-4"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
