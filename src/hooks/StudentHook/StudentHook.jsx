import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";

const StudentHook = () => {


      const { user, loading } = useAuth();
      const [axiosSecure] = useAxiosSecure();

      const { data: isStudent, isLoading: isStudentLoading , refetch} = useQuery({
        queryKey: ["student", user?.email],
        enabled: !loading,
        queryFn: async () => {
          const student = await axiosSecure.get(`/users/student/${user?.email}`);
          console.log("is student response", student);
          return student.data.student;
        },
      });
      return [isStudent, isStudentLoading, refetch];
   
};

export default StudentHook;