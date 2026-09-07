import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode, JSX } from "react";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: ReactNode;
}

function ProtectedRoute({
  isAuthenticated,
  children,
}: ProtectedRouteProps): JSX.Element {
  const location = useLocation();

  console.log("location", location);

  if (!isAuthenticated) {
    // replace evita que la ruta protegida quede en el historial
    // state guarda la ruta original para poder volver después del login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
export default ProtectedRoute;
