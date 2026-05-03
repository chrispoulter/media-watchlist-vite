import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { authClient } from '@/lib/auth-client';

export function useSentryUser() {
    const { data: session } = authClient.useSession();

    useEffect(() => {
        if (session?.user) {
            Sentry.setUser({ id: session.user.id });
        } else {
            Sentry.setUser(null);
        }
    }, [session]);
}
