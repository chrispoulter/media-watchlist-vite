import { useState } from "react";
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
import { authClient } from "@/lib/auth-client";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export function UpdateProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  const onSubmit = async (values: UpdateProfileFormValues) => {
    setIsLoading(true);
    const { error } = await authClient.updateUser({
      name: values.name,
    });
    setIsLoading(false);

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

        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Form>
  );
}
