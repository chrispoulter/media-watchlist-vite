import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authProviders } from "@/lib/auth-providers";
import { useAccounts, useLinkSocial, useUnlinkAccount } from "@/features/profile/queries";

export function LinkedAccounts() {
  const { data: accounts = [] } = useAccounts();

  const { mutate: linkSocial, isPending: isLinking, variables: linkingProvider } = useLinkSocial();

  const { mutateAsync: unlinkAccount, isPending: isUnlinking } = useUnlinkAccount();

  const isLinked = (providerId: string) => accounts.some((a) => a.providerId === providerId);

  const canUnlink = (providerId: string) => accounts.some((a) => a.providerId !== providerId);

  const handleConnect = (providerId: string) => linkSocial(providerId);

  const handleDisconnect = async (providerId: string, label: string) => {
    const { error } = await unlinkAccount(providerId);

    if (error) {
      toast.error(error.message ?? `Failed to disconnect ${label} account`);
      return;
    }

    toast.success(`${label} account disconnected`);
  };

  return (
    <div className="space-y-4">
      {authProviders.map((provider) => {
        const linked = isLinked(provider.id);
        const unlinkable = canUnlink(provider.id);
        const inFlight = (isLinking || isUnlinking) && linkingProvider === provider.id;

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
