import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

interface SetPasswordProps {
  email: string;
}

export function SetPassword({ email }: SetPasswordProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  const handleSend = async () => {
    setStatus("loading");
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast.error(error.message ?? "Failed to send password setup email");
      setStatus("idle");
      return;
    }
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="space-y-2">
        <p className="text-sm">
          We've sent a link to <strong>{email}</strong> to set up your password.
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
      <Button onClick={handleSend} disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Sending..." : "Send password setup email"}
      </Button>
    </div>
  );
}
