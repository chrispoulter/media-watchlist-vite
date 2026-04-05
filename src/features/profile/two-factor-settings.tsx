import { useState } from "react";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { IdleDisabledStep } from "./two-factor/idle-disabled-step";
import { EnablePasswordStep } from "./two-factor/enable-password-step";
import { QrStep } from "./two-factor/qr-step";
import { VerifyStep } from "./two-factor/verify-step";
import { IdleEnabledStep } from "./two-factor/idle-enabled-step";
import { DisableStep } from "./two-factor/disable-step";
import { RegenCodesPasswordStep } from "./two-factor/regen-codes-password-step";
import { BackupCodesStep } from "./two-factor/backup-codes-step";

type TwoFactorStep =
  | "idle"
  | "password"
  | "qr"
  | "verify"
  | "disable"
  | "backup-codes"
  | "regen-codes-password"
  | "regen-codes-show";

export function TwoFactorSettings() {
  const [step, setStep] = useState<TwoFactorStep>("idle");
  const [totpUri, setTotpUri] = useState<string>("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const { data: session } = authClient.useSession();

  const twoFactorEnabled = session?.user.twoFactorEnabled;

  if (twoFactorEnabled) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-500 dark:text-green-400" />
          <span className="text-sm font-medium">Two-factor authentication is</span>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          >
            Enabled
          </Badge>
        </div>

        {step === "idle" && (
          <IdleEnabledStep
            onDisable={() => setStep("disable")}
            onRegenCodes={() => setStep("regen-codes-password")}
          />
        )}

        {step === "regen-codes-password" && (
          <RegenCodesPasswordStep
            onSuccess={(codes) => {
              setBackupCodes(codes);
              setStep("regen-codes-show");
            }}
            onCancel={() => setStep("idle")}
          />
        )}

        {step === "regen-codes-show" && (
          <BackupCodesStep
            codes={backupCodes}
            description="Your new backup codes. The old codes are now invalid."
            doneLabel="Done"
            onDone={() => setStep("idle")}
          />
        )}

        {step === "backup-codes" && (
          <BackupCodesStep
            codes={backupCodes}
            description="Save your backup codes. Each code can only be used once."
            doneLabel="I've saved my codes"
            onDone={() => setStep("idle")}
          />
        )}

        {step === "disable" && (
          <DisableStep
            onSuccess={() => setStep("idle")}
            onCancel={() => setStep("idle")}
          />
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
        <IdleDisabledStep onEnable={() => setStep("password")} />
      )}

      {step === "password" && (
        <EnablePasswordStep
          onSuccess={(uri, codes) => {
            setTotpUri(uri);
            setBackupCodes(codes);
            setStep("qr");
          }}
          onCancel={() => setStep("idle")}
        />
      )}

      {step === "qr" && (
        <QrStep totpUri={totpUri} onContinue={() => setStep("verify")} />
      )}

      {step === "verify" && (
        <VerifyStep
          onSuccess={() => setStep("backup-codes")}
          onBack={() => setStep("qr")}
        />
      )}

      {step === "backup-codes" && (
        <BackupCodesStep
          codes={backupCodes}
          description="Save your backup codes. Each code can only be used once."
          doneLabel="I've saved my codes"
          onDone={() => setStep("idle")}
        />
      )}
    </div>
  );
}
