import { Navigate, Outlet } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export function RequireGuest() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
