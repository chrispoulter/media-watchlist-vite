import { ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TwoFactorEnabledProps {
  onDisable: () => void;
  onGenerateBackupCodes: () => void;
}

export function TwoFactorEnabled({ onDisable, onGenerateBackupCodes }: TwoFactorEnabledProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button variant="outline" onClick={onDisable}>
        <ShieldOff className="mr-2 h-4 w-4" />
        Disable 2FA
      </Button>
      <Button variant="outline" onClick={onGenerateBackupCodes}>
        Regenerate backup codes
      </Button>
    </div>
  );
}
