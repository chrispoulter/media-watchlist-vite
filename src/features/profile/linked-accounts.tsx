import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Account {
  id: string;
  providerId: string;
  accountId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  scopes: string[];
}

interface ProviderConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const PROVIDERS: ProviderConfig[] = [
  {
    id: "google",
    label: "Google",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
];

export function LinkedAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);
  const [actionProvider, setActionProvider] = useState<string | null>(null);

  const fetchAccounts = async () => {
    const result = await authClient.listAccounts();
    if (result.error) {
      toast.error(result.error.message ?? "Failed to load linked accounts");
      return;
    }
    setAccounts((result.data as Account[]) ?? []);
  };

  useEffect(() => {
    const load = async () => {
      setIsLoadingAccounts(true);
      await fetchAccounts();
      setIsLoadingAccounts(false);
    };
    load();
  }, []);

  const isLinked = (providerId: string) => accounts.some((a) => a.providerId === providerId);
  const canUnlink = (providerId: string) => accounts.some((a) => a.providerId !== providerId);

  const handleConnect = async (providerId: string) => {
    setActionProvider(providerId);
    const result = await authClient.linkSocial({
      provider: providerId as Parameters<typeof authClient.linkSocial>[0]["provider"],
      callbackURL: window.location.href,
    });
    setActionProvider(null);
    if (result?.error) {
      toast.error(result.error.message ?? `Failed to connect ${providerId} account`);
    }
  };

  const handleDisconnect = async (providerId: string, label: string) => {
    setActionProvider(providerId);
    const result = await authClient.unlinkAccount({ providerId });
    setActionProvider(null);
    if (result.error) {
      toast.error(result.error.message ?? `Failed to disconnect ${label} account`);
      return;
    }
    toast.success(`${label} account disconnected`);
    await fetchAccounts();
  };

  if (isLoadingAccounts) {
    return <div className="space-y-3">{PROVIDERS.map((p) => <Skeleton key={p.id} className="h-10 w-full" />)}</div>;
  }

  return (
    <div className="space-y-4">
      {PROVIDERS.map((provider) => {
        const linked = isLinked(provider.id);
        const unlinkable = canUnlink(provider.id);
        const inFlight = actionProvider === provider.id;

        return (
          <div key={provider.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {provider.icon}
              <div>
                <p className="text-sm font-medium">{provider.label}</p>
                {linked ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="outline">Not connected</Badge>
                )}
              </div>
            </div>

            {linked ? (
              unlinkable ? (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={inFlight}
                  onClick={() => handleDisconnect(provider.id, provider.label)}
                >
                  {inFlight ? "Disconnecting..." : "Disconnect"}
                </Button>
              ) : (
                <span title={`You need at least one other sign-in method before disconnecting ${provider.label}`}>
                  <Button variant="outline" size="sm" disabled>
                    Disconnect
                  </Button>
                </span>
              )
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled={inFlight}
                onClick={() => handleConnect(provider.id)}
              >
                {inFlight ? "Connecting..." : "Connect"}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
