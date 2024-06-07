import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/paymentSuccess.json";

const PaymentSuccess = () => {
  return (
    <>
      <div className="h-screen">
        <div>
          <h2 className="pt-32 text-4xl font-bold text-center text-green-800">
            Payment Successful
          </h2>
          <Link to="/dashboard/myorders">
            <p className="text-center underline font-bold cursor-pointer mt-5 hover:text-primary">
              Go To My Orders
            </p>
          </Link>
        </div>

        <div className="w-full h-full flex justify-center">
          <Lottie
            className="h-[400px]"
            animationData={animationData}
            loop={true}
          />
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
