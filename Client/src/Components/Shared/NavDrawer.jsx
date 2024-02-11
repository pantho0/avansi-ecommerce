import useAuth from "../Hooks/useAuth";
import { LuLogIn } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa6";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
const NavDrawer = () => {
  const {user} = useAuth()
  console.log(user);
  return (
    <div className="fixed w-full shadow-md mb-50 z-20">
      <div className="navbar bg-base-100 w-[1200px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Logo/>
        </div>
        <div className="navbar-center hidden lg:flex w-1/2">
          <ul className="menu menu-horizontal mr-4">
            <li>
              <details>
                <summary className="bg-primary text-white hover:bg-accent">
                  All Category
                </summary>
                <ul className="z-10 w-96">
                  <li>
                    <a>Electronic</a>
                  </li>
                  <li>
                    <a>Body Care</a>
                  </li>
                  <li>
                    <details>
                      <summary>Fashion</summary>
                      <ul>
                        <li>
                          <a>Men</a>
                        </li>
                        <li>
                          <a>Women</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
          </ul>

          <div className="form-control md:block w-full">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-full"
            />
          </div>
        </div>
        <div className="navbar-end ">
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
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow z-10"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {
            user ? <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52 z-10"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
          :
          <>
          <Link to="/login"><button className="btn btn-accent btn-sm text-white ml-2 mr-2">Login<LuLogIn size={20}/></button></Link>
          <Link><button className="btn btn-primary btn-sm text-white">SignUp<FaUserCheck size={20}/></button></Link>
          </>
          }
        </div>
      </div>
    </div>
  );
};

export default NavDrawer;
