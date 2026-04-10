import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";

interface TwoFactorQRCodeProps {
  totpUri: string;
  onDone: () => void;
}

export const TwoFactorQRCode = ({ totpUri, onDone }: TwoFactorQRCodeProps) => {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium">Scan this QR code with your authenticator app:</p>
        <div className="inline-block rounded-lg border bg-white p-4">
          <QRCodeSVG value={totpUri} size={200} />
        </div>
        <p className="text-muted-foreground mt-2 text-xs">
          Or enter manually: <code className="font-mono text-xs break-all">{totpUri}</code>
        </p>
      </div>
      <Button onClick={onDone} className="w-full sm:w-auto">
        I've scanned the code
      </Button>
    </div>
  );
};
