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
import { useGenerateBackupCodes } from "@/features/profile/profile-queries";

const generateBackupCodesSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type GenerateBackupCodesFormValues = z.infer<typeof generateBackupCodesSchema>;

interface TwoFactorConfirmBackupCodesProps {
  onRegenerated: (newCodes: string[]) => void;
  onCancel: () => void;
}

export function TwoFactorConfirmBackupCodes({
  onRegenerated,
  onCancel,
}: TwoFactorConfirmBackupCodesProps) {
  const { mutateAsync: generateBackupCodes, isPending } = useGenerateBackupCodes();

  const form = useForm<GenerateBackupCodesFormValues>({
    resolver: zodResolver(generateBackupCodesSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = async (values: GenerateBackupCodesFormValues) => {
    const result = await generateBackupCodes(values.password);

    if (result.error) {
      toast.error(result.error.message ?? "Failed to regenerate backup codes");
      return;
    }

    onRegenerated(result.data?.backupCodes ?? []);
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
          <Button type="submit" disabled={isPending}>
            {isPending ? "Regenerating..." : "Regenerate Codes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
