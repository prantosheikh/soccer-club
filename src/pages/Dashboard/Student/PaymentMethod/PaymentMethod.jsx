import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useClass from "../../../../hooks/useClass";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentMethod = () => {
  const [classes, refetch] = useClass();
  console.log(classes);
  const total = classes.reduce((sum, pay) => sum + pay.selecteClass.price, 0);
  
    // const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2))
  console.log(stripePromise);
    
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm refetch={refetch} classes={classes} price={price}></CheckoutForm>
      </Elements>
    );
};

export default PaymentMethod;