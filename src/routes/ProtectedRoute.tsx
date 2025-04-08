import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import ProgressBar from "../components/progressBar/ProgressBar";

type PrivateRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <ProgressBar></ProgressBar>
      {children}
    </div>
  );
};

export default ProtectedRoute;
