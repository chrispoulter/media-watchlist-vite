import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export function useUpdateUser() {
  return useMutation({
    mutationFn: (values: { name: string }) => authClient.updateUser(values),
  });
}

export function useChangeEmail() {
  return useMutation({
    mutationFn: (newEmail: string) =>
      authClient.changeEmail({ newEmail, callbackURL: `${window.location.origin}/profile` }),
  });
}

interface ChangePasswordVariables {
  currentPassword: string;
  newPassword: string;
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: ChangePasswordVariables) =>
      authClient.changePassword({ currentPassword, newPassword, revokeOtherSessions: true }),
  });
}

export function useSetPasswordReset() {
  return useMutation({
    mutationFn: (email: string) =>
      authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      }),
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: () => authClient.deleteUser(),
  });
}

export function useLinkSocial() {
  return useMutation({
    mutationFn: (provider: string) =>
      authClient.linkSocial({
        provider,
        callbackURL: window.location.href,
        errorCallbackURL: `${window.location.origin}/auth/error`,
      }),
  });
}

export function useUnlinkAccount() {
  return useMutation({
    mutationFn: (providerId: string) => authClient.unlinkAccount({ providerId }),
  });
}

export function useEnableTwoFactor() {
  return useMutation({
    mutationFn: (password: string) => authClient.twoFactor.enable({ password }),
  });
}

export function useDisableTwoFactor() {
  return useMutation({
    mutationFn: (password: string) => authClient.twoFactor.disable({ password }),
  });
}

export function useVerifyTotpSetup() {
  return useMutation({
    mutationFn: (code: string) => authClient.twoFactor.verifyTotp({ code }),
  });
}

export function useGenerateBackupCodes() {
  return useMutation({
    mutationFn: (password: string) => authClient.twoFactor.generateBackupCodes({ password }),
  });
}
