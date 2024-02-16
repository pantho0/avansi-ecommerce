import { Link, Outlet } from "react-router-dom";
import Logo from "../Components/Logo/Logo";
import { MdMenuOpen } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import useAuth from "../Components/Hooks/useAuth";

const Dashboard = () => {
  const {logOut} = useAuth();
  const signOut = () => {
    logOut();
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-row items-center">
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
        <ul className="menu p-4 w-56 min-h-full bg-black text-base-content">
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
          <button className="btn btn-secendary w-full rounded-none mt-2">
            Dashboard
          </button>
          <button className="btn btn-secendary w-full rounded-none mt-2">
            Cart
          </button>
          <button className="btn btn-secendary w-full rounded-none mt-2">
            My Orders
          </button>
          <Link to="/dashboard/profile">
            <button className="btn btn-secendary w-full rounded-none mt-2">
              Profile
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
