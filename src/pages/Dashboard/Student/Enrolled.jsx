import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const Enrolled = () => {
    const { user , loading} = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [payments, setPayment] = useState()
    // console.log(payments[0].ClassId);
    // console.log(user.email);

    // const py = payments.filter(payment => payment)

    // console.log(py);

    
        // payments;

           useEffect(() => {
             axiosSecure.get(`/enrolled?email=${user?.email}`).then((res) => {
               setPayment(res.data);
             });
           }, [user]);

  
    
 

    return (
      <div>
        <h2 className="text-3xl mb-6">My Enrollment</h2>
        <div className="overflow-x-auto w-full px-8">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Instructor Name</th>
                <th>Instructor Email</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments &&
                payments[0]?.ClassId?.map((payment, i) => (
                  <tr key={payment._id}>
                    {/* {console.log(payment)} */}
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={payment?.selecteClass.ClassImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{payment?.selecteClass?.ClassName}</td>
                    <td>{payment?.selecteClass?.InstructorName}</td>
                    <td>{payment?.selecteClass?.InstructorEmail}</td>
                    <td>{payment?.selecteClass?.price}</td>
                    <td>
                      <p className="py-1 rounded-xl px-3 bg-blue-400 text-white font-bold">
                        Enrolment{" "}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Enrolled;