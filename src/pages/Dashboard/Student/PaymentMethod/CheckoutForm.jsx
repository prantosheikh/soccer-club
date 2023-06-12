import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const CheckoutForm = ({classes, price}) => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transationId, setTransationId] = useState("");
  console.log(clientSecret);


  useEffect(() => {
    if (price > 0) {
      console.log(price);
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, []);

    // if (loading) {
    //   return <span className="loading loading-spinner loading-lg"></span>;
    // }
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);
    console.log(card);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError('')
      console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
      
    if (confirmError) {
      console.log(confirmError);
    }

    console.log("pay", paymentIntent);
    setProcessing(false);
    if (paymentIntent?.status === 'succeeded') {
      setTransationId(paymentIntent.id)
       
      const payment = {
        email: user?.email,
        transationId: paymentIntent.id,
        price,
        data: new Date(),
        status: "service pending",
        newId: classes.map((cla) => cla?._id),
        ClassId: classes,
        ClassName: classes.map((cla) => cla?.selecteClass.ClassName),
      };
    //  console.log(newId);
      axiosSecure.post("/payments", payment)
        .then(res => {
          if (res.data.insertedId) {
            // // clg
            // fe
          }
        })
       
    }
  }
    return (
      <>
        <form className="w-full px-8" onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn btn-sm text-white btn-primary px-8 mt-3"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </form>
        <p className="text-xl text-orange-600 my-6">{cardError}</p>
        {transationId && (
          <p className="text-green-600 ">
            Transation complete whit transationId :{transationId}
          </p>
        )}
      </>
    );
};

export default CheckoutForm;
