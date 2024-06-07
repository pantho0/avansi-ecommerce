import { CgProfile } from "react-icons/cg";
import { MdBorderColor, MdDashboard } from "react-icons/md";
import { PiShoppingCartFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <>
      {/* <button className="btn btn-primary w-full rounded-none mt-2 ">
            <MdDashboard size={20} />
            Dashboard
          </button> */}
      <Link to="/dashboard/profile">
        <button className="btn btn-primary w-full rounded-none mt-2 ">
          <CgProfile size={20} />
          Profile
        </button>
      </Link>
      <Link to="/dashboard/cart">
        <button className="btn btn-primary w-full rounded-none mt-2 ">
          <PiShoppingCartFill size={20} />
          Cart
        </button>
      </Link>
      <Link to="/dashboard/myorders">
        <button className="btn btn-primary w-full rounded-none mt-2">
          <MdBorderColor size={20} />
          My Orders
        </button>
      </Link>
    </>
  );
};

export default UserDashboard;
