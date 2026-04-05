import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const recoveryCodeSchema = z.object({
  code: z.string().min(1, "Recovery code is required"),
});

type RecoveryCodeFormValues = z.infer<typeof recoveryCodeSchema>;

export function RecoveryCodeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<RecoveryCodeFormValues>({
    resolver: zodResolver(recoveryCodeSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (values: RecoveryCodeFormValues) => {
    setIsLoading(true);
    const { error } = await authClient.twoFactor.verifyBackupCode({ code: values.code });
    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Invalid code");
      return;
    }

    navigate("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-muted-foreground text-center text-sm">
          Enter one of your backup recovery codes
        </p>

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recovery code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="font-mono"
                  placeholder="xxxxx-xxxxx"
                  autoFocus
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>

        <Button type="button" variant="link" className="w-full" asChild>
          <Link to="/two-factor">Use authenticator app instead</Link>
        </Button>
      </form>
    </Form>
  );
}
