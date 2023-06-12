import { useEffect, useState } from "react";

const InstructorsPage = () => {
  const [instructors, setInstructor] = useState();
  // console.log(instructors);

 useEffect(() => {
   fetch("http://localhost:3000/instructors")
     .then((res) => res.json())
     .then((data) => {
      //  console.log(data);
       setInstructor(
         data.filter((instructor) => instructor.role === "instructor")
       );
      //  console.log(instructors);
     });
 }, []); 




    return (
      <>
        <h2 className="text-center text-4xl my-7 ms-7">Instructor Page</h2>
        <div className=" mt-20  grid md:grid-cols-3 gap-6 mx-8">
          {instructors &&
            instructors.map((instructor, index) => (
              <div key={index} className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src={instructor?.photo} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    <p>{instructor?.name}</p>
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>
                    <p>{instructor?.email}</p>
                  </p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">instructor</div>
                    <div className="badge badge-outline">intelligent</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
    );
};

export default InstructorsPage;