import { useState } from "react";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TwoFactorEnabled } from "./two-factor-enabled";
import { TwoFactorBackupCodes } from "./two-factor-backup-codes";
import { TwoFactorDisabled } from "./two-factor-disabled";
import { TwoFactorConfirmDisable } from "./two-factor-confirm-disable";
import { TwoFactorConfirmEnable } from "./two-factor-confirm-enable";
import { TwoFactorConfirmBackupCodes } from "./two-factor-confirm-backup-codes";
import { TwoFactorVerify } from "./two-factor-verify";
import { TwoFactorQRCode } from "./two-factor-qr-code";
import { authClient } from "@/lib/auth-client";

export function TwoFactorSettings() {
  const [step, setStep] = useState<
    | "idle"
    | "confirm-enable"
    | "qr"
    | "verify"
    | "confirm-disable"
    | "backup-codes"
    | "confirm-backup-codes"
  >("idle");

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
          <TwoFactorEnabled
            onDisable={() => setStep("confirm-disable")}
            onGenerateBackupCodes={() => setStep("confirm-backup-codes")}
          />
        )}

        {step === "confirm-backup-codes" && (
          <TwoFactorConfirmBackupCodes
            onRegenerated={(newCodes) => {
              setBackupCodes(newCodes);
              setStep("backup-codes");
            }}
            onCancel={() => setStep("idle")}
          />
        )}

        {step === "backup-codes" && (
          <TwoFactorBackupCodes backupCodes={backupCodes} onDone={() => setStep("idle")} />
        )}

        {step === "confirm-disable" && (
          <TwoFactorConfirmDisable
            onDisabled={() => setStep("idle")}
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

      {step === "idle" && <TwoFactorDisabled onEnable={() => setStep("confirm-enable")} />}

      {step === "confirm-enable" && (
        <TwoFactorConfirmEnable
          onTotpSetup={(uri, codes) => {
            setTotpUri(uri);
            setBackupCodes(codes);
            setStep("qr");
          }}
          onCancel={() => setStep("idle")}
        />
      )}

      {step === "qr" && <TwoFactorQRCode totpUri={totpUri} onDone={() => setStep("verify")} />}

      {step === "verify" && (
        <TwoFactorVerify
          onSuccess={() => {
            setStep("backup-codes");
          }}
          onCancel={() => setStep("qr")}
        />
      )}

      {step === "backup-codes" && (
        <TwoFactorBackupCodes backupCodes={backupCodes} onDone={() => setStep("idle")} />
      )}
    </div>
  );
}
