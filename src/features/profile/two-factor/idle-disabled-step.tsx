import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IdleDisabledStepProps {
  onEnable: () => void;
}

export function IdleDisabledStep({ onEnable }: IdleDisabledStepProps) {
  return (
    <Button onClick={onEnable} className="w-full sm:w-auto">
      <ShieldCheck className="mr-2 h-4 w-4" />
      Enable 2FA
    </Button>
  );
}
