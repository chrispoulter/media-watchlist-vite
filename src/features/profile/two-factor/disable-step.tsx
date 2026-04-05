import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
import { authClient } from "@/lib/auth-client";

const schema = z.object({
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

interface DisableStepProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function DisableStep({ onSuccess, onCancel }: DisableStepProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "" },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    const result = await authClient.twoFactor.disable({ password: values.password });
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error.message ?? "Failed to disable 2FA");
      return;
    }

    toast.success("Two-factor authentication disabled");
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
          <Button type="submit" variant="destructive" disabled={isLoading}>
            {isLoading ? "Disabling..." : "Disable 2FA"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
