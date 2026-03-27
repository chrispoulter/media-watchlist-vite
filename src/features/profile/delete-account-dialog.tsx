import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsLoading(true);
    const { error } = await authClient.deleteUser();
    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Failed to delete account");
      return;
    }

    setOpen(false);
    toast.success("Account deleted");
    navigate("/login");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Your account and all associated data will be permanently
            deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Yes, delete my account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
