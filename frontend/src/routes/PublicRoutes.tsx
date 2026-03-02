import useAuthStore from "@/stores/authStore";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  const user = useAuthStore((state) => state.user);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) return <p>LOADING...</p>;

  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
