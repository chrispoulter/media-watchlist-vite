import { z } from "zod";




export const twoFactorSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

export type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;

export const recoveryCodeSchema = z.object({
  code: z.string().min(1, "Recovery code is required"),
});

export type RecoveryCodeFormValues = z.infer<typeof recoveryCodeSchema>;




