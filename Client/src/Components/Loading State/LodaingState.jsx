
import { BounceLoader } from "react-spinners";



const LodaingState = () => {


  return (
    <div className="min-h-screen flex justify-center items-center">
      <BounceLoader
        visible={true}
        height="80"
        width="80"
        color="#8C0327"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LodaingState;
