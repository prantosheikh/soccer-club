import useAxiosSecure from "../../hooks/useAxiosSecure";

const PopuleIntructor = () => {
    const [axiosSecure] = useAxiosSecure()
    axiosSecure.get("/instructors").then((res) => {
      console.log(res.data);
    });
    return (
        <div>
            
        </div>
    );
};

export default PopuleIntructor;