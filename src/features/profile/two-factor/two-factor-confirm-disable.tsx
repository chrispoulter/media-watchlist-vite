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
import { useDisableTwoFactor } from "@/features/profile/profile-queries";

const disableTwoFactorSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type DisableTwoFactorFormValues = z.infer<typeof disableTwoFactorSchema>;

interface TwoFactorConfirmDisableProps {
  onDisabled: () => void;
  onCancel: () => void;
}

export function TwoFactorConfirmDisable({ onDisabled, onCancel }: TwoFactorConfirmDisableProps) {
  const { mutateAsync: disableTwoFactor, isPending } = useDisableTwoFactor();

  const form = useForm<DisableTwoFactorFormValues>({
    resolver: zodResolver(disableTwoFactorSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = async (values: DisableTwoFactorFormValues) => {
    const result = await disableTwoFactor(values.password);

    if (result.error) {
      toast.error(result.error.message ?? "Failed to disable 2FA");
      return;
    }

    toast.success("Two-factor authentication disabled");
    onDisabled();
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
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="destructive" disabled={isPending}>
            {isPending ? "Disabling..." : "Disable 2FA"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
