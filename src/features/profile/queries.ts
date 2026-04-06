import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { sessionKeys } from "@/features/auth/queries";

export const accountsKeys = {
  all: ["accounts"] as const,
};

export type Account = {
  id: string;
  providerId: string;
  accountId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  scopes: string[];
};

export function useAccounts() {
  return useQuery({
    queryKey: accountsKeys.all,
    queryFn: async () => {
      const { data, error } = await authClient.listAccounts();
      if (error) throw new Error(error.message ?? "Failed to load accounts");
      return (data ?? []) as Account[];
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: { name: string }) => authClient.updateUser(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
}

export function useChangeEmail() {
  return useMutation({
    mutationFn: (newEmail: string) =>
      authClient.changeEmail({ newEmail, callbackURL: `${window.location.origin}/profile` }),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => authClient.changePassword({ currentPassword, newPassword, revokeOtherSessions: true }),
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authClient.deleteUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
      queryClient.invalidateQueries({ queryKey: accountsKeys.all });
    },
  });
}

export function useLinkSocial() {
  return useMutation({
    mutationFn: (provider: string) =>
      authClient.linkSocial({
        provider: provider as Parameters<typeof authClient.linkSocial>[0]["provider"],
        callbackURL: window.location.href,
        errorCallbackURL: `${window.location.origin}/auth/error`,
      }),
  });
}

export function useUnlinkAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (providerId: string) => authClient.unlinkAccount({ providerId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountsKeys.all });
    },
  });
}

export function useEnableTwoFactor() {
  return useMutation({
    mutationFn: (password: string) => authClient.twoFactor.enable({ password }),
  });
}

export function useDisableTwoFactor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (password: string) => authClient.twoFactor.disable({ password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
}

export function useVerifyTotpSetup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => authClient.twoFactor.verifyTotp({ code }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
}

export function useGenerateBackupCodes() {
  return useMutation({
    mutationFn: (password: string) => authClient.twoFactor.generateBackupCodes({ password }),
  });
}
