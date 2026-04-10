import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useChangeEmail } from "@/features/profile/profile-queries";
import { authClient } from "@/lib/auth-client";

const verificationErrorMessages: Record<string, string> = {
  USER_NOT_FOUND: "This verification link has already been used or has expired.",
};

const updateEmailSchema = z.object({
  newEmail: z.email("Invalid email address"),
});

type UpdateEmailFormValues = z.infer<typeof updateEmailSchema>;

export function UpdateEmailForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const { data: session } = authClient.useSession();
  const { mutateAsync: changeEmail, isPending } = useChangeEmail();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast.error(verificationErrorMessages[error] ?? "Email verification failed.");

      setSearchParams((prev) => {
        prev.delete("error");
        return prev;
      });
    }
  }, [searchParams, setSearchParams]);

  const form = useForm<UpdateEmailFormValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { newEmail: "" },
  });

  const onSubmit = async (values: UpdateEmailFormValues) => {
    const { error } = await changeEmail(values.newEmail);

    if (error) {
      toast.error(error.message ?? "Failed to update email");
      return;
    }

    setPendingEmail(values.newEmail);
    form.reset();
  };

  if (pendingEmail) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Current email:{" "}
          <span className="text-foreground font-medium break-all">{session?.user.email}</span>
        </p>
        <Alert>
          <AlertDescription>
            <p>
              A verification link has been sent to{" "}
              <strong className="break-all">{pendingEmail}</strong>.
            </p>
            <p>
              Click the link in that email to confirm the change. Your current email remains active
              until then.
            </p>
          </AlertDescription>
        </Alert>
        <Button variant="ghost" size="sm" onClick={() => setPendingEmail(null)}>
          Change a different email
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-muted-foreground text-sm">
          Current email:{" "}
          <span className="text-foreground font-medium break-all">{session?.user.email}</span>
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="new@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? "Sending verification..." : "Update email"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
