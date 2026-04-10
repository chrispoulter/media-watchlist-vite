import { useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession, useSignOut } from "@/features/auth/auth-queries";
import { Spinner } from "./ui/spinner";

export function UserMenu() {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const { mutateAsync: signOut, isPending } = useSignOut();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  if (!session) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {session?.user?.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-medium">{session?.user?.name}</p>
          <p className="text-muted-foreground truncate text-xs">{session?.user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <Settings className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} disabled={isPending}>
          {isPending ? (
            <>
              <Spinner className="mr-2 h-4 w-4" /> Signing out...
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
