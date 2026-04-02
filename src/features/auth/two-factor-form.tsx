import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  twoFactorSchema,
  type TwoFactorFormValues,
  recoveryCodeSchema,
  type RecoveryCodeFormValues,
} from "./schemas";
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

  const totpForm = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: "" },
  });

  const recoveryForm = useForm<RecoveryCodeFormValues>({
    resolver: zodResolver(recoveryCodeSchema),
    defaultValues: { code: "" },
  });

  const handleToggle = () => {
    totpForm.reset();
    recoveryForm.reset();
    setUseRecoveryCode((prev) => !prev);
  };

  const onSubmitTotp = async (values: TwoFactorFormValues) => {
    setIsLoading(true);
    const { error } = await authClient.twoFactor.verifyTotp({ code: values.code });
    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Invalid code");
      return;
    }

    navigate("/watchlist");
  };

  const onSubmitRecovery = async (values: RecoveryCodeFormValues) => {
    setIsLoading(true);
    const { error } = await authClient.twoFactor.verifyBackupCode({ code: values.code });
    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Invalid recovery code");
      return;
    }

    navigate("/watchlist");
  };

  if (useRecoveryCode) {
    return (
      <Form {...recoveryForm}>
        <form onSubmit={recoveryForm.handleSubmit(onSubmitRecovery)} className="space-y-6">
          <p className="text-muted-foreground text-center text-sm">
            Enter one of your backup recovery codes
          </p>
          <FormField
            control={recoveryForm.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recovery code</FormLabel>
                <FormControl>
                  <Input {...field} className="font-mono" placeholder="xxxxxxxxxx" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
          <Button type="button" variant="link" className="w-full" onClick={handleToggle}>
            Use authenticator app instead
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...totpForm}>
      <form onSubmit={totpForm.handleSubmit(onSubmitTotp)} className="space-y-6">
        <p className="text-muted-foreground text-center text-sm">
          Enter the 6-digit code from your authenticator app
        </p>
        <FormField
          control={totpForm.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Authentication code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
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
        <Button type="button" variant="link" className="w-full" onClick={handleToggle}>
          Use recovery code instead
        </Button>
      </form>
    </Form>
  );
}
