import useAuth from "../Hooks/useAuth";
import { LuLogIn } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa6";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useCart from "../Hooks/useCart";
import { useEffect, useState } from "react";

const NavForMobileTablet = () => {
  const { user, logOut } = useAuth();
  const [cartData, , totalPrice] = useCart();
  const [categories, setCategories] = useState([]);

  const signOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    fetch("/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="fixed w-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] z-20 lg:hidden  ">
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <div className="navbar bg-transparent text-white">
            <div className="navbar-start flex-1 lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="navbar-center">
              <Logo />
            </div>
            <div className="navbar-end flex-1">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#ffffff"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="badge badge-sm bg-primary border-none text-white indicator-item">
                        {cartData?.length}
                      </span>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow z-10"
                  >
                    <div className="card-body bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
                      <span className="font-bold text-lg">
                        {" "}
                        {cartData?.length} Items
                      </span>
                      <span className="text-accent">
                        Subtotal: ${totalPrice?.total}
                      </span>
                      <div className="card-actions">
                        <Link to="/dashboard/cart" className="w-full">
                          <button className="btn btn-primary btn-block">
                            View cart
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={
                          user.photoURL
                            ? `${user?.photoURL}`
                            : "https://w7.pngwing.com/pngs/39/283/png-transparent-user-user-people-linear-icon-user-infographic-people-monochrome-thumbnail.png"
                        }
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52 z-10"
                  >
                    <li>
                      <Link to="/dashboard/profile">
                        <div className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a onClick={signOut}>Logout</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* Page content here */}
          {/* Content */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 min-h-full w-8/12 md:w-4/12  bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
            {/* Sidebar content here */}
            {categories.map((category, idx) => (
              <li key={idx}>
                <a>{category.name}</a>
              </li>
            ))}
            {
              !user && <div className="flex flex-col justify-center items-center gap-2">
              <Link to="/login">
                <button className="btn btn-accent btn-sm text-white">
                  Login
                  <LuLogIn size={20} />
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary btn-sm text-white">
                  SignUp
                  <FaUserCheck size={20} />
                </button>
              </Link>
            </div>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavForMobileTablet;
