import { Button } from "@/components/ui/button";
import { useSocialSignIn } from "@/features/auth/auth-queries";
import { authProviders } from "@/lib/auth-providers";

export function SocialSignInButtons() {
  const { mutate: signIn, isPending, variables } = useSocialSignIn();

  return (
    <>
      {authProviders.map((provider) => {
        const isProviderPending = isPending && variables === provider.id;
        return (
          <Button
            key={provider.id}
            variant="outline"
            className="w-full"
            type="button"
            disabled={isProviderPending}
            onClick={() => signIn(provider.id)}
          >
            {provider.icon}
            <span className="ml-2">
              {isProviderPending ? "Connecting..." : `Continue with ${provider.label}`}
            </span>
          </Button>
        );
      })}
    </>
  );
}
