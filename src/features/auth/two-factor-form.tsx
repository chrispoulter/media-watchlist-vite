import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
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

const twoFactorSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;

interface TwoFactorFormProps {
  onBack?: () => void;
}

export function TwoFactorForm({ onBack }: TwoFactorFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (values: TwoFactorFormValues) => {
    setIsLoading(true);
    const { error } = await authClient.twoFactor.verifyTotp({ code: values.code });
    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Invalid code");
      return;
    }

    navigate("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-muted-foreground text-center text-sm">
          Enter the 6-digit code from your authenticator app
        </p>

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Authentication code</FormLabel>
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>

        <Button type="button" variant="link" className="w-full" onClick={onBack}>
          Use recovery code instead
        </Button>
      </form>
    </Form>
  );
}
