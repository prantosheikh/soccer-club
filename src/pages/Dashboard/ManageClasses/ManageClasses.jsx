import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageClasses = () => {
//  const [instructorsClass, setinstructorsClass] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  

 const { data: instructorsClass = [], refetch } = useQuery(
   ["instructorsclass"],
   async () => {
     const res = await axiosSecure.get("/instructorsclass");
     return res.data;
   }
 );


  useEffect(() => {
   
    // axiosSecure.get("/instructorsclass").then((res) => {
    //   // setinstructorsClass(res?.data);
    //   // console.log(res.data);
    // });
  }, []);

  const handlePending = (e) => {
console.log(e);
  };
  const handleApproved = (classes) => {
    console.log(classes);
    
    axiosSecure.patch(`/instructorsclass/${classes}`).then((res) => {
      console.log(res);
      refetch()
    });
  };
 

    return (
      <div className="overflow-x-auto w-full px-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Class name</th>
              <th> Instructor name</th>
              <th>Instructor email</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {instructorsClass.map((classes, Index) => (
              <tr key={classes?._id}>
                <th>{Index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={classes?.newCalss?.ClassImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{classes?.newCalss?.ClassName}</td>
                <td>{classes?.newCalss?.InstructorName}</td>
                <td>{classes?.newCalss?.InstructorEmail}</td>
                <td>{classes?.newCalss?.AvailableSeats}</td>
                <td>{classes?.newCalss?.price}</td>
                <td>
                  <button
                    onClick={() => handleApproved(classes?._id)}
                    className="btn btn-xs bg-blue-600 ms-3 text-white"
                    disabled={classes?.newCalss?.newStatus === "approved"}
                  >
                    approved
                  </button>
                  <button
                    onClick={() => handlePending(classes)}
                    className="btn btn-xs bg-green-600 ms-3 text-white"
                    disabled={classes?.newStatus === "approved"}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handlePending(classes)}
                    className="btn btn-xs bg-orange-600 ms-3 text-white"
                    disabled={classes?.newStatus === "approved"}
                  >
                    <FaRegTimesCircle></FaRegTimesCircle>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default ManageClasses;