import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";

const useInstructor = () => {

     const { user, loading } = useAuth();
     const [axiosSecure] = useAxiosSecure();

     const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
       queryKey: ["isInstructor", user?.email],
       enabled: !loading,
       queryFn: async () => {
         const instructor = await axiosSecure.get(
           `/users/instructor/${user?.email}`
         );
         console.log("is isInstructor response", instructor);
         return instructor.data.instructor;
       },
     });
     return [isInstructor, isInstructorLoading];


};

export default useInstructor;