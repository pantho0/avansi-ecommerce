import { Link, Outlet } from "react-router-dom";
import Logo from "../Components/Logo/Logo";
import { MdMenuOpen } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import useAuth from "../Components/Hooks/useAuth";
import { MdDashboard } from "react-icons/md";
import { PiShoppingCartFill } from "react-icons/pi";
import { MdBorderColor } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
  const {logOut} = useAuth();
  const signOut = () => {
    logOut();
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div>
          <label
            htmlFor="my-drawer-2"
            className="btn bg-primary drawer-button fixed lg:hidden"
          >
            <MdMenuOpen color="white" size={25} />
          </label>
        </div>
        {/* Page content here */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-56 min-h-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-base-content">
          {/* Sidebar content here */}
          <div className="">
            <Logo />
            <div className="divider divider-primary"></div>
            <div className="flex justify-center mb-6">
              <div className="tooltip tooltip-primary" data-tip="Home">
                <Link to="/">
                <IoMdHome size={25} className="cursor-pointer text-accent" />
                </Link>
              </div>
              <div className="divider divider-primary divider-horizontal"></div> 
              <div className="tooltip tooltip-primary" data-tip="Logout">
                <TbLogout onClick={signOut} size={25} className="cursor-pointer text-accent" />
              </div>
            </div>
          </div>
          <button className="btn btn-primary w-full rounded-none mt-2 ">
            <MdDashboard size={20} />
            Dashboard
          </button>
          <Link to="/dashboard/cart">
          <button className="btn btn-primary w-full rounded-none mt-2 ">
            <PiShoppingCartFill size={20} />
            Cart
          </button>
          </Link>
          <button className="btn btn-primary w-full rounded-none mt-2">
            <MdBorderColor size={20} />
            My Orders
          </button>
          <Link to="/dashboard/profile">
            <button className="btn btn-primary w-full rounded-none mt-2 ">
              <CgProfile size={20}/>
              Profile
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
