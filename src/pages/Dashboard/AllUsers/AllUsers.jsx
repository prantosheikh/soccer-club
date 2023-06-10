import { useQuery } from "@tanstack/react-query";
import { FaServicestack, FaUserShield } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {




  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });


  // console.log(users);
  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:3000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} Now Admin`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        refetch()
      });
  };

  const handleMakeInstructor = (user) => {
     fetch(`http://localhost:3000/users/instructor/${user._id}`, {
       method: "PATCH",
     })
       .then((res) => res.json())
       .then((data) => {
         if (data.modifiedCount) {
           Swal.fire({
             position: "top-end",
             icon: "success",
             title: `${user.name} Now Instructor`,
             showConfirmButton: false,
             timer: 1500,
           });
         }
         refetch()
       });
  }



    return (
      <div className="w-full ps-8">
        <h2 className="text-4xl font-bold font-mono mb-8">
          Manage <span className="text-blue-800">Users !</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Student/Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      className="rounded-lg h-14 w-14"
                      src={user?.photo}
                      width={60}
                      alt=""
                    />
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    {user.role === "Student"
                      ? "Student"
                      : user.role === "admin" || user.role === "instructor"}

                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost btn-sm bg-blue-600 mx-3  text-white"
                        disabled={user.role === "instructor"}
                      >
                        <FaUserShield></FaUserShield>
                      </button>
                    )}
                    {user.role === "instructor" ? (
                      "instructor"
                    ) : (
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn btn-ghost btn-sm bg-blue-600 mx-3 text-white"
                        disabled={user.role === "admin"}
                      >
                        <FaServicestack></FaServicestack>
                      </button>
                    )}
                  </td>

                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllUsers;