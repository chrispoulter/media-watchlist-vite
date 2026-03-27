import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export const updateEmailSchema = z.object({
  newEmail: z.string().email("Invalid email address"),
});

export type UpdateEmailFormValues = z.infer<typeof updateEmailSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export const enableTwoFactorSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type EnableTwoFactorFormValues = z.infer<typeof enableTwoFactorSchema>;

export const verifyTotpSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

export type VerifyTotpFormValues = z.infer<typeof verifyTotpSchema>;

export const disableTwoFactorSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type DisableTwoFactorFormValues = z.infer<typeof disableTwoFactorSchema>;
