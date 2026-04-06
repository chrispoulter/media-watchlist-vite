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
        <div className="bg-card inline-block rounded-lg border p-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(totpUri)}`}
            alt="TOTP QR Code"
            width={200}
            height={200}
          />
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
