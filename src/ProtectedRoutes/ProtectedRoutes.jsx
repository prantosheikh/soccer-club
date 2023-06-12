import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
      return (
        <div className="text-4xl text-center my-64">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default ProtectedRoutes;