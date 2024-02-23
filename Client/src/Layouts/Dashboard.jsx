import { Link, Outlet } from "react-router-dom";
import Logo from "../Components/Logo/Logo";
import { MdMenuOpen } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import useAuth from "../Components/Hooks/useAuth";
import useRole from "../Components/Hooks/useRole";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import UserDashboard from "../Components/Dashboard/User/UserDashboard";
import AdminDashboard from "../Components/Dashboard/Admin/AdminDashboard";

const Dashboard = () => {
  const [enabled, setEnabled] = useState(false);
  const { logOut } = useAuth();
  const isAdmin = useRole();
  const signOut = () => {
    logOut();
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="flex justify-end">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-blue-950 border-gray-400 rounded-none z-10 drawer-button fixed lg:hidden"
          >
            <MdMenuOpen color="white" size={20} />
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
                <TbLogout
                  onClick={signOut}
                  size={25}
                  className="cursor-pointer text-accent"
                />
              </div>
            </div>
            { isAdmin &&
              <div className="text-white flex flex-col items-center mb-4">
              <Switch.Group>
                <Switch.Label passive>Switch To Admin Dashboard</Switch.Label>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${enabled ? "bg-primary" : "bg-secondary"}
          relative inline-flex h-[24px] w-[45px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </Switch.Group>
            </div>}
            <div className="divider divider-primary"></div>
          </div>
          {enabled ? "" : <UserDashboard />}
          {enabled ? <AdminDashboard /> : ""}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
