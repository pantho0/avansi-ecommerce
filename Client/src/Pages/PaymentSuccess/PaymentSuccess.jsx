import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  return (
    <>
      <div className="pt-20 min-h-full block">
        <h1>Payment success:{tranId} </h1>
      </div>
    </>
  );
};

export default PaymentSuccess;
