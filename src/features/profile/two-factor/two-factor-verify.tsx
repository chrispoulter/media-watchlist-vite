import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
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
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="code"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Enter the 6-digit code from your app</FieldLabel>
              <InputOTP
                maxLength={6}
                autoComplete="one-time-code"
                aria-invalid={fieldState.invalid}
                {...field}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={onCancel}>
            Back
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Verifying..." : "Verify & Enable"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
