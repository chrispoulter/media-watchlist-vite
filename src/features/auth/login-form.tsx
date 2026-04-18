import { useNavigate, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useSignIn } from "@/features/auth/auth-queries";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: signIn, isPending } = useSignIn();

  const from = location.state?.from?.pathname ?? "/";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const { error } = await signIn(values);

    if (error) {
      toast.error(error.message ?? "Sign in failed");
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email">Email</FieldLabel>
              <Input
                id="login-email"
                type="email"
                placeholder="john@example.com"
                autoComplete="username"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password">Password</FieldLabel>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex items-center justify-between">
          <Controller
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <Field orientation="horizontal">
                <input
                  type="checkbox"
                  id="login-rememberMe"
                  checked={field.value}
                  onChange={field.onChange}
                  className="border-input h-4 w-4 rounded"
                />
                <FieldLabel htmlFor="login-rememberMe" className="cursor-pointer font-normal">
                  Remember me
                </FieldLabel>
              </Field>
            )}
          />
          <a
            href="/forgot-password"
            className="text-muted-foreground text-sm underline-offset-4 hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <Field orientation="horizontal">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Signing In..." : "Sign In"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
