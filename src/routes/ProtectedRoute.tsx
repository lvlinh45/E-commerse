import { ReactNode } from "react";

type PrivateRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: PrivateRouteProps) => {
  /*   if (user.isAuthenticated === false || user.role === "user") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-800 bg-gray-100">
        <h1 className="mb-2 text-2xl font-bold">Permission Denied</h1>
        <p className="text-center text-gray-600">
          You don't have permission to access this page. Please log in.
        </p>
        <button
          onClick={() => navigate("/auth/login")}
          className="px-6 py-2 mt-6 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Back to Login
        </button>
      </div>
    );
  } */
  return <div>{children}</div>;
};

export default ProtectedRoute;
