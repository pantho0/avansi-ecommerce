import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/paymentFailed.json";

const PaymentFailed = () => {
  return (
    <>
      <div className="h-screen">
        <div>
          <h2 className="pt-32 text-4xl font-bold text-center text-red-800">
            Payment Failed
          </h2>
          <Link to="/">
            <p className="text-center underline font-bold cursor-pointer mt-5 hover:text-primary">
              Go To Home
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

export default PaymentFailed;
