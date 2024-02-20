import useAuth from "../Hooks/useAuth";
import { LuLogIn } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa6";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useCart from "../Hooks/useCart";

const NavDrawer = () => {
  const { user, logOut } = useAuth();
  const [cartData, , totalPrice] = useCart();

  const signOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <>
    
    <div className="fixed lg:hidden w-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] z-20">
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-[1200px] mx-auto navbar bg-transparent text-white">
            <div className="flex-none lg:hidden">
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
            <div className="px-2 mx-2">
              <Logo />
            </div>
            <div className="flex-none hidden lg:flex-1 lg:block">
              <ul className="menu menu-horizontal mr-4">
                <li>
                  <details>
                    <summary className="bg-primary text-white hover:bg-accent">
                      All Category
                    </summary>
                    <ul className="z-10 w-96 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-base-200">
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
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-3/4"
              />
              
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
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
            <li>
                  <details>
                    <summary className="bg-primary text-white hover:bg-accent">
                      All Category
                    </summary>
                    <ul className="z-10 w-96 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-base-200">
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
                <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-3/4"
              />
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
                  <span className="font-bold text-lg"> {cartData?.length} Items</span>
                  <span className="text-accent">Subtotal: ${totalPrice?.total}</span>
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
            <>
              <Link to="/login">
                <button className="btn btn-accent btn-sm text-white ml-2 mr-2">
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
            </>
          )}
          </ul>
        </div>
      </div>
    </div>
    <div className="hidden lg:block fixed w-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] shadow-md mb-50 z-20">
      <div className="navbar bg-transparent w-[1200px] mx-auto">
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
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex w-1/2">
    <ul className="menu menu-horizontal mr-4">
      <li>
        <details>
          <summary className="bg-primary text-white hover:bg-accent">
            All Category
          </summary>
          <ul className="z-10 w-96 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-base-200">
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
                  <span className="font-bold text-lg"> {cartData?.length} Items</span>
                  <span className="text-accent">Subtotal: ${totalPrice?.total}</span>
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
            <>
              <Link to="/login">
                <button className="btn btn-accent btn-sm text-white ml-2 mr-2">
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
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default NavDrawer;
