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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyTotpSetup } from "@/features/profile/profile-queries";

const verifyTotpSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

type VerifyTotpFormValues = z.infer<typeof verifyTotpSchema>;

interface TwoFactorVerifyProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function TwoFactorVerify({ onSuccess, onCancel }: TwoFactorVerifyProps) {
  const { mutateAsync: verifyTotp, isPending } = useVerifyTotpSetup();

  const form = useForm<VerifyTotpFormValues>({
    resolver: zodResolver(verifyTotpSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (values: VerifyTotpFormValues) => {
    const result = await verifyTotp(values.code);

    if (result.error) {
      toast.error(result.error.message ?? "Invalid code");
      return;
    }

    toast.success("Two-factor authentication enabled");
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter the 6-digit code from your app</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} autoComplete="one-time-code" {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Verifying..." : "Verify & enable"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
