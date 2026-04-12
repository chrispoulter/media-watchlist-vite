import { Navigate, Outlet } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "./ui/spinner";

export function RequireGuest() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner className="text-muted-foreground h-6 w-6" />
      </div>
    );
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
