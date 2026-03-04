import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import Dashboard from "./pages/DashboardPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import AppLayout from "./components/layout/AppLayout";
import { useEffect } from "react";
import useAuthStore from "./stores/authStore";
import { Toaster } from "sonner";
import SignupPage from "./pages/SignupPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodayPage from "./pages/TodayPage";
import TomorrowPage from "./pages/TomorrowPage";
import WeekPage from "./pages/WeekPage";

const queryClient = new QueryClient();

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/today" element={<TodayPage />} />
            <Route path="/tomorrow" element={<TomorrowPage />} />
            <Route path="/week" element={<WeekPage />} />
          </Route>

          <Route element={<PublicRoutes />}>
            <Route index element={<Navigate to="signin" replace />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>

        {/* Toaster */}
        <Toaster
          expand={true}
          position="top-center"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#2a2627",
              border: "1px solid #fbf4ee",
              borderRadius: "12px",
              padding: "14px 16px",
              fontSize: "14px",
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
