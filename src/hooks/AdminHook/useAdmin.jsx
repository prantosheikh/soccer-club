import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/admin/${user?.email}`);
      console.log("is admin response", response);
      return response.data.admin;
    },
  });
  return [isAdmin, isLoading];
};

export default useAdmin;
