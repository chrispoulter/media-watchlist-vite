import { useNavigate } from "react-router-dom";
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
import { useVerifyBackupCode } from "@/features/auth/auth-queries";

const recoveryCodeSchema = z.object({
  code: z.string().min(1, "Recovery code is required"),
});

type RecoveryCodeFormValues = z.infer<typeof recoveryCodeSchema>;

interface RecoveryCodeFormProps {
  onBack?: () => void;
}

export function RecoveryCodeForm({ onBack }: RecoveryCodeFormProps) {
  const navigate = useNavigate();
  const { mutateAsync: verifyBackupCode, isPending } = useVerifyBackupCode();

  const form = useForm<RecoveryCodeFormValues>({
    resolver: zodResolver(recoveryCodeSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (values: RecoveryCodeFormValues) => {
    const { error } = await verifyBackupCode(values.code);

    if (error) {
      toast.error(error.message ?? "Invalid code");
      return;
    }

    navigate("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recovery code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="font-mono"
                  placeholder="xxxxx-xxxxx"
                  autoFocus
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Verifying..." : "Verify"}
        </Button>

        <Button type="button" variant="link" className="w-full" onClick={onBack}>
          Use authenticator app instead
        </Button>
      </form>
    </Form>
  );
}
