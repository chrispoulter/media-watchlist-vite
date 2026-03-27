import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { updateEmailSchema, type UpdateEmailFormValues } from "./schemas";
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

export function UpdateEmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const form = useForm<UpdateEmailFormValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { newEmail: "" },
  });

  const onSubmit = async (values: UpdateEmailFormValues) => {
    setIsLoading(true);
    const { error } = await authClient.changeEmail({
      newEmail: values.newEmail,
    });
    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Failed to update email");
      return;
    }

    toast.success("Email updated. Please check your inbox to verify.");
    form.reset();
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">
          Current email: <span className="font-medium text-foreground">{session?.user.email}</span>
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
            {isLoading ? "Updating..." : "Update email"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
