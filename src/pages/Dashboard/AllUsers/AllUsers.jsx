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
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
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
                      className="rounded-lg"
                      src={user?.photo}
                      width={60}
                      alt=""
                    />
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost bg-orange-600 me-3  text-white"
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
                        className="btn btn-ghost bg-orange-600 ms-3 text-white"
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