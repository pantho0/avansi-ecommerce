import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { RiListUnordered } from "react-icons/ri";
import { IoBagAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { PiUsersFourFill } from "react-icons/pi";

const AdminDashboard = () => {
    return (
       <>
        <button className="btn btn-primary w-full rounded-none mt-2 ">
            <MdDashboard size={20} />
            Dashboard
          </button>
          <Link to="/dashboard/addProducts">
            <button className="btn btn-primary w-full rounded-none mt-2 ">
              <IoBagAddSharp size={20} />
              Add Products
            </button>
          </Link>
          <button className="btn btn-primary w-full rounded-none mt-2">
            <GrUpdate size={20} />
            Update Products
          </button>
          <button className="btn btn-primary w-full rounded-none mt-2">
            <RiListUnordered size={20} />
            All Orders
          </button>
          <Link to={'/dashboard/users'}>
          <button className="btn btn-primary w-full rounded-none mt-2">
            <PiUsersFourFill size={20} />
            All Users
          </button>
          </Link>
          <Link to="/dashboard/profile">
            <button className="btn btn-primary w-full rounded-none mt-2 ">
              <CgProfile size={20} />
              Profile
            </button>
          </Link>
       </>
    );
};

export default AdminDashboard;