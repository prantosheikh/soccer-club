import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const PaymentHistory = () => {

    const [axiosSecure] = useAxiosSecure()

    axiosSecure.get("/paymenthistory")
        .then(res => {
        console.log(res.data)
    })

    return (
        <div>
            
        </div>
    );
};

export default PaymentHistory;