import { useEffect } from "react";
import {Navigate, Route, Routes} from "react-router";
import { AuthRoutes } from "../presentation/auth/routes/AuthRoutes";
import { TodoRoutes } from "../presentation/todo/routes/TodoRoutes";
import { useAuthStore } from "../store/hooks/useAuthStore";

export const AppRoutes = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [checkAuthToken]);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {
        status === "authenticated" ? (
          <>
            <Route path="/home/*" element={<TodoRoutes />} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </>
        ):(
          <>
            <Route path="/auth/*" element={<AuthRoutes/>} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        )
      }
    </Routes>
  )
}
