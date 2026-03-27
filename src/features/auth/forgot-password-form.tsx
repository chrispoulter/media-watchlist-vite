import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "./schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    const { error } = await authClient.requestPasswordReset({
      email: values.email,
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Failed to send reset email");
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          If an account with that email exists, we've sent a password reset link.
        </p>
        <p className="text-sm text-muted-foreground">Please check your inbox.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send reset link"}
        </Button>
      </form>
    </Form>
  );
}
