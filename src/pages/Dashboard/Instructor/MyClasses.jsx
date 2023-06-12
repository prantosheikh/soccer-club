import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClass from "../../../hooks/useClass";

const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const [myClasses, setmyClasses] = useState([]);
  const [de, setDe] = useState([]);
  const [refetch] = useClass()
  const [updateId, setUpdateId] = useState([]);

  //   console.log(updateId);

  useEffect(() => {
    const denied = myClasses.filter((classes) => classes.status === "denied");
    setDe(denied);
    //   console.log(myClasses);
  }, [myClasses]);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/myClasses?email=${user?.email}`).then((res) => {
      setmyClasses(res.data);
    });
  }, [user?.email]);

  const { register, handleSubmit, reset, watch } = useForm();
  const onSubmit = (update) => {
    axiosSecure.put(`/classUpdate/${updateId}`, { update }).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
      refetch()
    });
  };

  return (
    <div>
      <div className="overflow-x-auto ps-5">
        <h2 className="text-4xl text-blue-700 font-semibold mb-8">
          My Classes !
        </h2>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>ClassImage</th>
              <th>ClassName</th>
              <th>Instructor Name</th>
              <th> Instructor Email</th>
              <th>Available Seats</th>
              <th>price</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myClasses.map((classes, index) => (
              <tr key={classes._id}>
                <th>{index + 1}</th>
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
                <th>
                  <button
                    onClick={() =>
                      window.my_modal_2.showModal() || setUpdateId(classes?._id)
                    }
                    className=" py-1 px-3 mb-6 bg-blue-800 text-white me-4 rounded"
                  >
                    update
                  </button>
                  <br />
                  {classes?.status ? (
                    <span className="bg-teal-500  px-3 py-1 rounded text-white">
                      {classes?.status}
                    </span>
                  ) : (
                    <span className="bg-teal-500 px-3 py-1 rounded text-white">
                      {classes?.status || "Pending"}
                    </span>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-center text-3xl  my-7">Denied Class Feedback</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>InstructorName</th>
              <th>Denied Class Feedback</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {de.map((classes, index) => (
              <tr key={classes._id}>
                <th>{index + 1}</th>
                <td>{classes?.newCalss?.ClassName}</td>
                <td>{classes?.newCalss?.InstructorName}</td>
                <td>{classes?.Feedback?.feedback}</td>
                <th></th>
              </tr>
            ))}
          </tbody>
        </table>
        <dialog id="my_modal_2" className="modal">
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="dialog"
            className="modal-box"
          >
            <h3 className="font-bold text-lg">Hello!</h3>

            <div className="flex gap-4 mt-4">
              <div className=" w-1/2">
                <label className="label">
                  <span className="label-text">Class Name</span>
                </label>
                <input
                  className="py-3 ps-3 border border-cyan-500 me-4 rounded-md w-full  
        "
                  //   defaultValue="test"
                  required
                  placeholder="Class Name"
                  {...register("ClassName", { required: true })}
                />
              </div>
              <div className="w-1/2">
                <label className="label">
                  <span className="label-text">Instructor Name</span>
                </label>
                <input
                  className="py-3 ps-3 border border-cyan-500 rounded-md w-full
        "
                  placeholder="Instructor name"
                  required
                  defaultValue={user?.displayName}
                  readOnly
                  {...register("InstructorName", { required: true })}
                />
              </div>
            </div>
            <div className="w-full mt-4">
              <label className="label">
                <span className="label-text">Class Image</span>
              </label>
              <input
                className="py-3 ps-3  border border-cyan-500 rounded-md w-full
        "
                placeholder="Class Image"
                required
                {...register("ClassImage", { required: true })}
              />
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-1/2">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  className="py-3 ps-3   border border-cyan-500 rounded-md w-full"
                  placeholder="Price"
                  required
                  {...register("Price", { required: true })}
                />
              </div>
              <div className="w-1/2">
                <label className="label">
                  <span className="label-text">Instructor Email</span>
                </label>
                <input
                  className="py-3 ps-3  me-4 border border-cyan-500 rounded-md w-full
        "
                  defaultValue={user?.email}
                  placeholder="Instructor email"
                  required
                  readOnly
                  {...register("InstructorEmail", { required: true })}
                />
              </div>
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Available seats</span>
              </label>
              <input
                className="py-3 ps-3   border border-cyan-500 rounded-md w-full
        "
                placeholder="Available seats"
                required
                {...register("AvailableSeats", { required: true })}
              />
            </div>

            <input className="btn btn-primary btn-block mt-4" type="submit" />
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default MyClasses;
