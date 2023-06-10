import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClass from "../../../hooks/useClass";

const SelectedClass = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [classes, refetch] = useClass();
    console.log(classes);
    
    const handleDelete = (id) => {
        axiosSecure.delete(`/deleteSelectedClass/${id}`)
            .then(res => {
            console.log(res.data);
        })
    }

  return (
    <div className="overflow-x-auto">
      <tbody>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Class name</th>
              <th> Instructor name</th>
              <th>Instructor email</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

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
                <button className="btn btn-warning btn-xs">PAY</button>
                <td>{cla?.selecteClass?.price}</td>
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
