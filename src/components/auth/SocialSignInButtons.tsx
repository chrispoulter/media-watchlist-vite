import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { PROVIDERS } from "@/lib/auth-providers";

export function SocialSignInButtons() {
  const handleSignIn = async (provider: string) => {
    await authClient.signIn.social({
      provider,
      callbackURL: `${window.location.origin}/`,
      errorCallbackURL: `${window.location.origin}/auth/error`,
    });
  };

  return (
    <>
      {PROVIDERS.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => handleSignIn(provider.id)}
        >
          {provider.icon}
          <span className="ml-2">Continue with {provider.label}</span>
        </Button>
      ))}
    </>
  );
}
