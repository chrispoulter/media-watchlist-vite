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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyTotpLogin } from "@/features/auth/auth-queries";

const twoFactorSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;

interface TwoFactorFormProps {
  onBack?: () => void;
}

export function TwoFactorForm({ onBack }: TwoFactorFormProps) {
  const navigate = useNavigate();
  const { mutateAsync: verifyTotp, isPending } = useVerifyTotpLogin();

  const form = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (values: TwoFactorFormValues) => {
    const { error } = await verifyTotp(values.code);

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
            <FormItem className="flex flex-col items-center">
              <FormLabel>Authentication code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} autoComplete="one-time-code" autoFocus {...field}>
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

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Verifying..." : "Verify"}
        </Button>

        <Button type="button" variant="link" className="w-full" onClick={onBack}>
          Use recovery code instead
        </Button>
      </form>
    </Form>
  );
}
