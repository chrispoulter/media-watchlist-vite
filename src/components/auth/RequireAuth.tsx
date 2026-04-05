import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { authClient } from "@/lib/auth-client";

export function RequireAuth() {
  const { data: session, isPending } = authClient.useSession();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
