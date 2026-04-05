import { ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IdleEnabledStepProps {
  onDisable: () => void;
  onRegenCodes: () => void;
}

export function IdleEnabledStep({ onDisable, onRegenCodes }: IdleEnabledStepProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button variant="outline" onClick={onDisable}>
        <ShieldOff className="mr-2 h-4 w-4" />
        Disable 2FA
      </Button>
      <Button variant="outline" onClick={onRegenCodes}>
        Regenerate backup codes
      </Button>
    </div>
  );
}
