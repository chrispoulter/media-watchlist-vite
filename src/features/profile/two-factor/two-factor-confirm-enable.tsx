import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const enableTwoFactorSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type EnableTwoFactorFormValues = z.infer<typeof enableTwoFactorSchema>;

interface TwoFactorConfirmEnableProps {
  onTotpSetup: (totpUri: string, backupCodes: string[]) => void;
  onCancel: () => void;
}

export function TwoFactorConfirmEnable({ onTotpSetup, onCancel }: TwoFactorConfirmEnableProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EnableTwoFactorFormValues>({
    resolver: zodResolver(enableTwoFactorSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = async (values: EnableTwoFactorFormValues) => {
    setIsLoading(true);
    const result = await authClient.twoFactor.enable({ password: values.password });
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error.message ?? "Failed to enable 2FA");
      return;
    }

    if (result.data?.totpURI) {
      onTotpSetup(result.data.totpURI, result.data.backupCodes ?? []);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm with your password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Continuing..." : "Continue"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
