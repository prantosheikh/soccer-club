import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageClasses = () => {
  //  const [instructorsClass, setinstructorsClass] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const [feedbackId, setFeedbackId] = useState([]);

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

  const handlePending = (classes) => {
    console.log(classes);
  };
  const handleDelete = (classes) => {
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
        axiosSecure.delete(`/handleDelete/${classes}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Delete Class",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          refetch();
        });
      }
    });
  };
  const handleDenied = (classes) => {
    setFeedbackId(classes);
    axiosSecure.patch(`/classDenied/${classes}`).then((res) => {
      console.log(res);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Denied Class",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
    });
  };
  const handleApproved = (classes) => {
    console.log(classes);

    axiosSecure.patch(`/changestatus/${classes}`).then((res) => {
      console.log(res);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Approved Class",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
    });
  };

  const handleFeedback = (event) => {
    event.preventDefault();
    const form = event.target;
    const feedback = form.feedback.value;
    axiosSecure
      .patch(`/deniedFeedback/${feedbackId}`, { feedback })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Feedback Send",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="overflow-x-auto w-full px-5">
      <h2 className="text-4xl font-mono mb-12 text-orange-500">
        Manage <span className="text-blue-500">Classes</span>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th> </th>
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
              <td>
                <FaRegTrashAlt
                  onClick={() => handleDelete(classes?._id)}
                  className="text-red-400 text-xl cursor-pointer hover:text-red-700"
                ></FaRegTrashAlt>
              </td>
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
                  className="btn btn-xs bg-blue-600 mt-2 me-2 text-white"
                  disabled={classes?.status === "approved"}
                >
                  approved
                </button>
                <button
                  onClick={() => handlePending(classes)}
                  className="btn btn-xs bg-green-600 mt-2 me-1 text-white"
                  disabled={
                    classes?.status === "approved"
                  }
                >
                  Pending
                </button>
                <button
                  onClick={
                    () => handleDenied(classes?._id) || window.my_modal_2.showModal()
                  }
                  className="btn btn-xs bg-orange-600 mt-3 text-white"
                  // disabled={classes?.status === "approved"}
                >
                  denied
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <dialog id="my_modal_2" className="modal">
        <form onSubmit={handleFeedback} method="dialog" className="modal-box">
          <h3 className="font-bold text-lg mb-4">Feedback Class</h3>
          <textarea
            className="textarea w-full h-36 textarea-primary"
            placeholder="Bio"
            name="feedback"
          ></textarea>
          <input
            className="btn btn-sm mt-4 btn-outline btn-primary"
            type="submit"
            value="Submit"
          />
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageClasses;
