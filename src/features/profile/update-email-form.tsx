import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { updateEmailSchema, type UpdateEmailFormValues } from "./schemas";
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

export function UpdateEmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const { data: session } = authClient.useSession();

  const form = useForm<UpdateEmailFormValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { newEmail: "" },
  });

  const onSubmit = async (values: UpdateEmailFormValues) => {
    setIsLoading(true);
    const { error } = await authClient.changeEmail({
      newEmail: values.newEmail,
      callbackURL: `${window.location.origin}/profile`,
    });
    setIsLoading(false);

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
          Current email: <span className="text-foreground font-medium">{session?.user.email}</span>
        </p>
        <Alert>
          <AlertDescription>
            A verification link has been sent to <strong>{pendingEmail}</strong>. Click the link in
            that email to confirm the change. Your current email remains active until then.
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
          Current email: <span className="text-foreground font-medium">{session?.user.email}</span>
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
                  <Input type="email" placeholder="new@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending verification..." : "Update email"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
