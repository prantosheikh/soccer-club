import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClass from "../../../hooks/useClass";

const SelectedClass = () => {
    // if (loading) {
    //     return (
    //         <div className="text-center mt-16 text-3xl">
       
    //       <span className="loading loading-spinner text-primary"></span>
    //     </div>
    //   );
    // }
    const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [classes, refetch] = useClass();
  console.log(classes);

  const handleDelete = (id) => {
    axiosSecure.delete(`/deleteSelectedClass/${id}`).then((res) => {
      //   console.log(res.data);
      refetch();
    
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (res.data.deletedCount > 0) {
            toast.success("Deleted Successfully");
            refetch();
          }
        }
      });
    });
  };
 

  return (
    <div className="overflow-x-auto mx-6">
      <Link to="/dashboard/paymentmethod">
        <button className="btn btn-warning px-6">PAY</button>
      </Link>
      <h2 className="text-center text-3xl mb-8 font-mono font-semibold">
        Selected Class !
      </h2>
      <tbody>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Class name</th>
              <th>Instructor name</th>
              <th>Instructor email</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <ToastContainer />
          {classes.map((cla, i) => (
            <tr key={cla?._id}>
              <th>{i + 1}</th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={cla?.selecteClass?.ClassImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{cla?.selecteClass?.ClassName}</td>
              <td>{cla?.selecteClass?.InstructorName}</td>
              <td>{cla?.selecteClass?.InstructorEmail}</td>
              <td>{cla?.selecteClass?.AvailableSeats}</td>
              <td>{cla?.selecteClass?.price}</td>
              <th className="flex gap-3">
                <button
                  onClick={() => handleDelete(cla?._id)}
                  className="btn bg-red-600 text-white btn-xs"
                >
                  DELETE
                </button>
              </th>
            </tr>
          ))}
        </table>
      </tbody>
    </div>
  );
};

export default SelectedClass;
