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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";

const schema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

type FormValues = z.infer<typeof schema>;

interface VerifyStepProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function VerifyStep({ onSuccess, onBack }: VerifyStepProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: "" },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    const result = await authClient.twoFactor.verifyTotp({ code: values.code });
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error.message ?? "Invalid code");
      return;
    }

    toast.success("Two-factor authentication enabled");
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify & enable"}
          </Button>
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
