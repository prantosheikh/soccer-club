import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [displayClass, setDisplayClass] = useState([]);
    const { user } = useAuth();
  const [selectedClasses, setSelectedClasses] = useState([]);
  // console.log(displayClass);
  //  const total = cart.reduce((sum, item) => item.price + sum, 0);


  // const [classes] = useClass()
  // console.log(classes);



  useEffect(() => {
    axiosSecure
      .get("/allClasses")
      .then((res) => {
        const approvedClass = res.data.filter(
          (res) => res.status === "approved"
        );
        setDisplayClass(approvedClass);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSelected = (selectedClass) => {
    console.log(selectedClass);
    const {
      AvailableSeats,
      ClassImage,
      ClassName,
      InstructorEmail,
      InstructorName,
      price,
    } = selectedClass.newCalss;

    if (user && user?.email) {
      const selecteClass = {
        AvailableSeats,
        ClassImage,
        ClassName,
        InstructorEmail,
        InstructorName,
        price,
        ClassId: selectedClass._id,
        email: user?.email,
      };
        console.log(selecteClass);
         setSelectedClasses((prevSelectedClasses) => [
           ...prevSelectedClasses,
           selectedClass._id,
         ]);
      //   console.log(selectedClass);
      axiosSecure.post("/seleteClass", { selecteClass }).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
            toast.success("Class Selected");
            
    
        }
      });
      }
       
    };
     const isClassSelected = (classId) => {
       return selectedClasses.includes(classId);
     };

  return (
    <>
      <h3 className="text-2xl">Total Class {displayClass.length}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-20">
        {displayClass.map((classItem) => (
          <div className="" key={classItem._id}>
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={classItem?.newCalss?.ClassImage} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title ">
                  {classItem?.newCalss?.ClassName}
                </h2>
                <p className="text-xl">{classItem?.newCalss?.InstructorName}</p>
                <div className="flex justify-center my-6">
                  <p className="">
                    Available Seats :{classItem?.newCalss?.AvailableSeats}
                  </p>
                  <p className="ms-6">Price$ {classItem?.newCalss?.price}</p>
                  <ToastContainer />
                </div>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleSelected(classItem)}
                    disabled={isClassSelected(classItem._id)}
                    className="btn btn-primary btn-block font-bold text-white"
                  >
                    Select{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllClasses;
