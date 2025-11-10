import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { isInitializing, usernameStorage, tokenStorage } = useAuth();
  const location = useLocation();
  if (isInitializing) {
    console.log("Cargando sesión de usuario...");
    return null;
  }
  if (!tokenStorage || !usernameStorage) {
    console.warn("Protected: Sesión no encontrada después de carga.");
    return <Navigate to="/login" replace state={{ from: location }}/>
  }

  return <>{children}</>;
};
