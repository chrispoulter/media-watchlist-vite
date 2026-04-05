import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { PROVIDERS } from "@/lib/auth-providers";
// import { Skeleton } from "@/components/ui/skeleton";

export interface Account {
  id: string;
  providerId: string;
  accountId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  scopes: string[];
}

interface LinkedAccountsProps {
  initialAccounts?: Account[];
}

export function LinkedAccounts({ initialAccounts }: LinkedAccountsProps) {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts ?? []);
  // const [isLoadingAccounts, setIsLoadingAccounts] = useState(!initialAccounts);
  const [actionProvider, setActionProvider] = useState<string | null>(null);

  const fetchAccounts = async () => {
    const result = await authClient.listAccounts();
    if (result.error) {
      toast.error(result.error.message ?? "Failed to load linked accounts");
      return;
    }
    setAccounts((result.data as Account[]) ?? []);
  };

  // useEffect(() => {
  //   if (initialAccounts) return;
  //   const load = async () => {
  //     setIsLoadingAccounts(true);
  //     await fetchAccounts();
  //     setIsLoadingAccounts(false);
  //   };
  //   load();
  // }, []);

  const isLinked = (providerId: string) => accounts.some((a) => a.providerId === providerId);
  const canUnlink = (providerId: string) => accounts.some((a) => a.providerId !== providerId);

  const handleConnect = async (providerId: string) => {
    setActionProvider(providerId);
    const result = await authClient.linkSocial({
      provider: providerId as Parameters<typeof authClient.linkSocial>[0]["provider"],
      callbackURL: window.location.href,
      errorCallbackURL: `${window.location.origin}/auth/error`,
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

  // if (isLoadingAccounts) {
  //   return (
  //     <div className="space-y-3">
  //       {PROVIDERS.map((p) => (
  //         <Skeleton key={p.id} className="h-10 w-full" />
  //       ))}
  //     </div>
  //   );
  // }

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
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  >
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
                <span
                  title={`You need at least one other sign-in method before disconnecting ${provider.label}`}
                >
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
