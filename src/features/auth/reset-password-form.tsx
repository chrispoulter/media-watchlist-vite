import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { resetPasswordSchema, type ResetPasswordFormValues } from "./schemas";
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

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") ?? "";

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }
    setIsLoading(true);
    const { error } = await authClient.resetPassword({
      newPassword: values.newPassword,
      token,
    });
    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Failed to reset password");
      return;
    }

    toast.success("Password reset successfully. Please sign in.");
    navigate("/login");
  };

  if (!token) {
    return (
      <p className="text-sm text-destructive text-center">
        Invalid or expired reset link. Please request a new one.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset password"}
        </Button>
      </form>
    </Form>
  );
}
