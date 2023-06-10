import useAxiosSecure from "../../hooks/useAxiosSecure";


const AllClasses = () => {
    const { axiosSecure } = useAxiosSecure();
    return (
        <div>
            <h2> ALL Classes</h2>
        </div>
    );
};

export default AllClasses;