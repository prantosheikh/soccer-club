import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/AdminHook/useAdmin';
import useAuth from '../hooks/useAuth';

const SecureAdmin = ({children}) => {
   const { user, loading } = useAuth();
   const [isAdmin, isLoading] = useAdmin();
   const location = useLocation();

   if (loading || isLoading) {
     return <progress className="progress w-56"></progress>
   }

   if (user && isAdmin) {
     return children;
   }

   return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default SecureAdmin;