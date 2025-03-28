import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
