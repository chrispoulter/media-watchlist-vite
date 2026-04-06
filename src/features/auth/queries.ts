import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const sessionKeys = {
  all: ["session"] as const,
};

export function useSession() {
  return useQuery({
    queryKey: sessionKeys.all,
    queryFn: async () => {
      const { data } = await authClient.getSession();
      return data ?? null;
    },
    staleTime: Infinity,
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: { email: string; password: string; rememberMe: boolean }) =>
      authClient.signIn.email(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: { email: string; password: string; name: string }) =>
      authClient.signUp.email(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}

export function useSocialSignIn() {
  return useMutation({
    mutationFn: (provider: string) =>
      authClient.signIn.social({
        provider: provider as Parameters<typeof authClient.signIn.social>[0]["provider"],
        callbackURL: `${window.location.origin}/`,
        errorCallbackURL: `${window.location.origin}/auth/error`,
      }),
  });
}

export function useVerifyTotpLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => authClient.twoFactor.verifyTotp({ code }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
}

export function useVerifyBackupCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => authClient.twoFactor.verifyBackupCode({ code }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) =>
      authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      }),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ newPassword, token }: { newPassword: string; token: string }) =>
      authClient.resetPassword({ newPassword, token }),
  });
}
