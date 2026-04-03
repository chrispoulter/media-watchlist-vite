import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { Input } from "@/components/ui/input";

export function TwoFactorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [useRecoveryCode, setUseRecoveryCode] = useState(false);
  const navigate = useNavigate();

  const form = useForm<{ code: string }>({
    defaultValues: { code: "" },
  });

  const handleToggle = () => {
    form.reset();
    form.clearErrors();
    setUseRecoveryCode((prev) => !prev);
  };

  const onSubmit = async (values: { code: string }) => {
    if (!useRecoveryCode && values.code.length !== 6) {
      form.setError("code", { message: "Code must be 6 digits" });
      return;
    }
    if (useRecoveryCode && !values.code.trim()) {
      form.setError("code", { message: "Recovery code is required" });
      return;
    }

    setIsLoading(true);
    const { error } = useRecoveryCode
      ? await authClient.twoFactor.verifyBackupCode({ code: values.code })
      : await authClient.twoFactor.verifyTotp({ code: values.code });
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
          {useRecoveryCode
            ? "Enter one of your backup recovery codes"
            : "Enter the 6-digit code from your authenticator app"}
        </p>

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className={useRecoveryCode ? "" : "flex flex-col items-center"}>
              <FormLabel>{useRecoveryCode ? "Recovery code" : "Authentication code"}</FormLabel>
              <FormControl>
                {useRecoveryCode ? (
                  <Input
                    {...field}
                    className="font-mono"
                    placeholder="xxxxxxxxxx"
                    autoFocus
                    autoComplete="off"
                  />
                ) : (
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
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>

        <Button type="button" variant="link" className="w-full" onClick={handleToggle}>
          {useRecoveryCode ? "Use authenticator app instead" : "Use recovery code instead"}
        </Button>
      </form>
    </Form>
  );
}
