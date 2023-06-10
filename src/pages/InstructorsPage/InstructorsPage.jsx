import { useEffect, useState } from "react";

const InstructorsPage = () => {
  const [instructors, setInstructor] = useState();
  console.log(instructors);

 useEffect(() => {
   fetch("http://localhost:3000/instructors")
     .then((res) => res.json())
     .then((data) => {
       setInstructor(
         data.filter((instructor) => instructor.role === "instructor")
       );
       console.log(instructors);
     });
 }, []); 




    return (
      <div className="mb-80 mt-20 px-10">
        <h2 className="text-center text-4xl mb-7">Instructor Page</h2>
        <div className="overflow-x-auto">
          <tbody>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>

              {instructors &&
                instructors.map((instructor, index) => (
                  <tr key={instructor._id}>
                    {index + 1}
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={instructor?.photo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{instructor?.name}</td>
                    <td>{instructor?.email}</td>

                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
            </table>
          </tbody>
        </div>
      </div>
    );
};

export default InstructorsPage;