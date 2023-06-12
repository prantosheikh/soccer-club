import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PopuleIntructor = () => {
    const [instructorss, setInstructor] = useState();
    console.log(instructorss);
    const [axiosSecure] = useAxiosSecure()
    useEffect(() => {
        axiosSecure.get("/instructors").then((res) => {
          setInstructor(
            res.data.filter((instructor) => instructor.role === "instructor")
          );
        });
    },[])
    return (
      <>
        <h2 className="text-4xl text-center mt-20">Popular instructors</h2>
        <div className="grid md:grid-cols-3 gap-10 my-32">
          {instructorss &&
            instructorss.map((c) => (
              <div key={c?._id} className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src={c?.photo} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{c?.name}</h2>
                  <p>{c?.email}</p>
                  <p>{c?.role}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
};

export default PopuleIntructor;