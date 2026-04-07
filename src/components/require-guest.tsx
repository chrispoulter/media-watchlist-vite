import { Navigate, Outlet } from "react-router-dom";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useSession } from "@/features/auth/auth-queries";

export function RequireGuest() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
