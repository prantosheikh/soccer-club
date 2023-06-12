import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../hooks/InstructorHook/useInstructor";
import useAuth from "../hooks/useAuth";

const SecureInstructors = ({children}) => {
     const { user, loading } = useAuth();
     const [isAdmin, isLoading] =useInstructor();
     const location = useLocation();

     if (loading || isLoading) {
       return <progress className="progress w-56"></progress>;
     }

     if (user && isAdmin) {
       return children;
     }

     return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default SecureInstructors;