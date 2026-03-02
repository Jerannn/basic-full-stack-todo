import useAuthStore from "@/stores/authStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) return <p>LOADING...</p>;

  if (!user) return <Navigate to="/signin" replace />;

  return children;
}
