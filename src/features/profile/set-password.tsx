import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth/auth-queries";
import { useSetPasswordReset } from "@/features/profile/profile-queries";

export function SetPassword() {
  const [sent, setSent] = useState(false);
  const { data: session } = useSession();
  const { mutateAsync: requestReset, isPending } = useSetPasswordReset();

  const email = session?.user.email ?? "";

  const handleSend = async () => {
    const { error } = await requestReset(email);

    if (error) {
      toast.error(error.message ?? "Failed to send password setup email");
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="space-y-2">
        <p className="text-sm">
          We've sent a link to <strong className="break-all">{email}</strong> to set up your
          password.
        </p>
        <p className="text-muted-foreground text-sm">
          Once set, you'll be able to sign in with your email address in addition to Google.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        You currently sign in with Google. Add a password to also sign in with your email address.
      </p>
      <Button onClick={handleSend} disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Sending..." : "Send password setup email"}
      </Button>
    </div>
  );
}
