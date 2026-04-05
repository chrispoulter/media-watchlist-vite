import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface BackupCodesStepProps {
  codes: string[];
  description: string;
  doneLabel: string;
  onDone: () => void;
}

export function BackupCodesStep({ codes, description, doneLabel, onDone }: BackupCodesStepProps) {
  const handleCopyAll = () => {
    navigator.clipboard.writeText(codes.join("\n"));
    toast.success("Backup codes copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">{description}</p>
      <div className="grid grid-cols-2 gap-2 rounded-md border p-4">
        {codes.map((code) => (
          <code key={code} className="font-mono text-sm select-all">
            {code}
          </code>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="button" variant="outline" onClick={handleCopyAll}>
          Copy all
        </Button>
        <Button type="button" onClick={onDone}>
          {doneLabel}
        </Button>
      </div>
    </div>
  );
}
