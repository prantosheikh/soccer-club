import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddClasses = () => {
  const { register, handleSubmit, watch } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const onSubmit = (Addclass) => {
    const {
      AvailableSeats,
      ClassImage,
      ClassName,
      InstructorEmail,
      InstructorName,
      Price,
      status,
    } = Addclass;

    const newCalss = {
      AvailableSeats,
      ClassImage,
      ClassName,
      InstructorEmail,
      InstructorName,
      price: parseFloat(Price),
      status,
    };
    // console.log(newCalss);

    // console.log(Addclass);
    axiosSecure.post("/instructorsclass", { newCalss }).then((data) => {
      console.log(data.data);
      if (data.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    // fetch("http://localhost:3000/instructorsclass", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(newCalss)
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    // })


  };

  console.log(watch("example")); // watch input value by passing the name of it

  const { user } = useAuth();
  console.log(user);

  return (
    <div className="w-full px-16">
      <h2 className=" text-4xl font-semibold mb-12">Add Classes !</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 mt-4">
          <div className=" w-1/2">
            <label className="label">
              <span className="label-text">Class Name</span>
            </label>
            <input
              className="py-3 ps-3 border border-cyan-500 me-4 rounded-md w-full  
        "
              //   defaultValue="test"
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
              readOnly
              {...register("InstructorEmail", { required: true })}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-2/6">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <input
              className="py-3 ps-3   border border-cyan-500 rounded-md w-full
        "
              placeholder="Status"
              defaultValue="pending"
              readOnly
              {...register("status", { required: true })}
            />
          </div>
          <div className="w-4/5">
            <label className="label">
              <span className="label-text">Available seats</span>
            </label>
            <input
              className="py-3 ps-3   border border-cyan-500 rounded-md w-full
        "
              placeholder="Available seats"
              {...register("AvailableSeats", { required: true })}
            />
          </div>
        </div>

        <input
          type="submit"
          className="btn btn-primary btn-block text-white font-bold mt-6"
          value="Add Class"
        />
      </form>
    </div>
  );
};

export default AddClasses;
