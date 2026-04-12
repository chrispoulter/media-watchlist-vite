import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateUser } from "@/features/profile/profile-queries";
import { authClient } from "@/lib/auth-client";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export function UpdateProfileForm() {
  const { data: session } = authClient.useSession();
  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  const user = session?.user;

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  const onSubmit = async (values: UpdateProfileFormValues) => {
    const { error } = await updateUser({ name: values.name });

    if (error) {
      toast.error(error.message ?? "Failed to update profile");
      return;
    }

    toast.success("Profile updated");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Form>
  );
}
