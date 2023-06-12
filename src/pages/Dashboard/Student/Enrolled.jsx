import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const Enrolled = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [payments, setPayment] = useState()
    console.log(payments);
    // console.log(user.email);

    // const py = payments.filter(payment => payment)

    // console.log(py);

    
        // payments;
  
    
    useEffect(() => {
        axiosSecure.get(`/enrolled?email=${user?.email}` ).then((res) => {
          setPayment(res.data);
        });
   
 },[])

    return (
        <div>
            <h2>Enroled</h2>
        </div>
    );
};

export default Enrolled;