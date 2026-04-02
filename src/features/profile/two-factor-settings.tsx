import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  enableTwoFactorSchema,
  verifyTotpSchema,
  disableTwoFactorSchema,
  regenerateBackupCodesSchema,
  type EnableTwoFactorFormValues,
  type VerifyTotpFormValues,
  type DisableTwoFactorFormValues,
  type RegenerateBackupCodesFormValues,
} from "./schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface TwoFactorSettingsProps {
  twoFactorEnabled: boolean;
}

export function TwoFactorSettings({ twoFactorEnabled }: TwoFactorSettingsProps) {
  const [step, setStep] = useState<
    | "idle"
    | "password"
    | "qr"
    | "verify"
    | "disable"
    | "backup-codes"
    | "regen-codes-password"
    | "regen-codes-show"
  >("idle");
  const [totpUri, setTotpUri] = useState<string>("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const enableForm = useForm<EnableTwoFactorFormValues>({
    resolver: zodResolver(enableTwoFactorSchema),
    defaultValues: { password: "" },
  });

  const verifyForm = useForm<VerifyTotpFormValues>({
    resolver: zodResolver(verifyTotpSchema),
    defaultValues: { code: "" },
  });

  const disableForm = useForm<DisableTwoFactorFormValues>({
    resolver: zodResolver(disableTwoFactorSchema),
    defaultValues: { password: "" },
  });

  const regenForm = useForm<RegenerateBackupCodesFormValues>({
    resolver: zodResolver(regenerateBackupCodesSchema),
    defaultValues: { password: "" },
  });

  const handleEnable = async (values: EnableTwoFactorFormValues) => {
    setIsLoading(true);
    const result = await authClient.twoFactor.enable({ password: values.password });
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error.message ?? "Failed to enable 2FA");
      return;
    }

    if (result.data?.totpURI) {
      setTotpUri(result.data.totpURI);
      setBackupCodes(result.data.backupCodes ?? []);
      setStep("qr");
    }
  };

  const handleVerify = async (values: VerifyTotpFormValues) => {
    setIsLoading(true);
    const result = await authClient.twoFactor.verifyTotp({ code: values.code });
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error.message ?? "Invalid code");
      return;
    }

    toast.success("Two-factor authentication enabled");
    setStep("backup-codes");
  };

  const handleBackupCodesDone = () => {
    setStep("idle");
    window.location.reload();
  };

  const handleRegenBackupCodes = async (values: RegenerateBackupCodesFormValues) => {
    setIsLoading(true);
    const result = await authClient.twoFactor.generateBackupCodes({ password: values.password });
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error.message ?? "Failed to regenerate backup codes");
      return;
    }

    setBackupCodes(result.data?.backupCodes ?? []);
    regenForm.reset();
    setStep("regen-codes-show");
  };

  const handleCopyAllCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    toast.success("Backup codes copied to clipboard");
  };

  const handleDisable = async (values: DisableTwoFactorFormValues) => {
    setIsLoading(true);
    const result = await authClient.twoFactor.disable({ password: values.password });
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error.message ?? "Failed to disable 2FA");
      return;
    }

    toast.success("Two-factor authentication disabled");
    setStep("idle");
    window.location.reload();
  };

  if (twoFactorEnabled) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium">Two-factor authentication is</span>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Enabled
          </Badge>
        </div>

        {step === "idle" && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep("disable")}>
              <ShieldOff className="mr-2 h-4 w-4" />
              Disable 2FA
            </Button>
            <Button variant="outline" onClick={() => setStep("regen-codes-password")}>
              Regenerate backup codes
            </Button>
          </div>
        )}

        {step === "regen-codes-password" && (
          <Form {...regenForm}>
            <form onSubmit={regenForm.handleSubmit(handleRegenBackupCodes)} className="space-y-4">
              <FormField
                control={regenForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm with your password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Regenerating..." : "Regenerate codes"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setStep("idle")}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )}

        {step === "regen-codes-show" && (
          <div className="space-y-4">
            <p className="text-sm font-medium">
              Your new backup codes. The old codes are now invalid.
            </p>
            <div className="grid grid-cols-2 gap-2 rounded-md border p-4">
              {backupCodes.map((code) => (
                <code key={code} className="font-mono text-sm select-all">
                  {code}
                </code>
              ))}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleCopyAllCodes}>
                Copy all
              </Button>
              <Button type="button" onClick={() => setStep("idle")}>
                Done
              </Button>
            </div>
          </div>
        )}

        {step === "disable" && (
          <Form {...disableForm}>
            <form onSubmit={disableForm.handleSubmit(handleDisable)} className="space-y-4">
              <FormField
                control={disableForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm with your password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" variant="destructive" disabled={isLoading}>
                  {isLoading ? "Disabling..." : "Disable 2FA"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setStep("idle")}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ShieldOff className="text-muted-foreground h-5 w-5" />
        <span className="text-sm font-medium">Two-factor authentication is</span>
        <Badge variant="outline">Disabled</Badge>
      </div>

      {step === "idle" && (
        <Button onClick={() => setStep("password")}>
          <ShieldCheck className="mr-2 h-4 w-4" />
          Enable 2FA
        </Button>
      )}

      {step === "password" && (
        <Form {...enableForm}>
          <form onSubmit={enableForm.handleSubmit(handleEnable)} className="space-y-4">
            <FormField
              control={enableForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm with your password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Continuing..." : "Continue"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setStep("idle")}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}

      {step === "qr" && (
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">
              Scan this QR code with your authenticator app:
            </p>
            <div className="inline-block rounded-lg border bg-white p-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(totpUri)}`}
                alt="TOTP QR Code"
                width={200}
                height={200}
              />
            </div>
            <p className="text-muted-foreground mt-2 text-xs break-all">
              Or enter manually: <code className="font-mono text-xs">{totpUri}</code>
            </p>
          </div>
          <Button onClick={() => setStep("verify")}>I've scanned the code</Button>
        </div>
      )}

      {step === "verify" && (
        <Form {...verifyForm}>
          <form onSubmit={verifyForm.handleSubmit(handleVerify)} className="space-y-4">
            <FormField
              control={verifyForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter the 6-digit code from your app</FormLabel>
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
            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify & enable"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setStep("qr")}>
                Back
              </Button>
            </div>
          </form>
        </Form>
      )}

      {step === "backup-codes" && (
        <div className="space-y-4">
          <p className="text-sm font-medium">
            Save your backup codes. Each code can only be used once.
          </p>
          <div className="grid grid-cols-2 gap-2 rounded-md border p-4">
            {backupCodes.map((code) => (
              <code key={code} className="font-mono text-sm select-all">
                {code}
              </code>
            ))}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleCopyAllCodes}>
              Copy all
            </Button>
            <Button type="button" onClick={handleBackupCodesDone}>
              I've saved my codes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
