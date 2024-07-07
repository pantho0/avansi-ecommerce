import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Components/Hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { useEffect } from "react";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { user, login, googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const email = data?.email;
    const password = data?.password;
    login(email, password)
      .then((res) => {
        if (res?.user?.email) {
          navigate("/");
          toast.success("Login Success");
        }
      })
      .catch((error) => {
        if (error) {
          toast.error(error.message);
          console.log("toast");
        }
      });
  };
  const handleGoogleLogin = () => {
    googleLogin().then((res) => {
      const userInfo = {
        email: res.user.email,
        role: "user",
      };
      axiosPublic
        .post("/saveUserInfo", userInfo)
        .then((res) => console.log(res?.data));

      navigate("/");
      toast.success("Login Success");
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet title="Avansi Fashion || LOGIN" />
      {!user ? (
        <div className="px-0 py-20 mx-auto max-w-7xl sm:px-4">
          <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-none shadow-xl sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6">
            <h1 className="mb-4 text-lg font-semibold text-left text-gray-900">
              Log in to your account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email")}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  {...register("password")}
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <input
                type="submit"
                className="w-full py-3 mt-1 btn btn-primary"
                value="Login"
              />
            </form>
            <div className="space-y-8">
              <div className="divider">OR</div>
              <div
                onClick={handleGoogleLogin}
                className="flex justify-center w-full"
              >
                <a href="#" className="py-3 btn btn-icon btn-google w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-1"
                  >
                    <path d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28	c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233	c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934	C20.485,11.453,20.404,10.884,20.283,10.356z" />
                  </svg>
                  <span className="sr-only">Continue with</span> Google
                </a>
              </div>
            </div>
            <p className="text-center mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen pt-20 flex justify-center items-center">
          <p className="text-2xl font-bold">Youre Logged In</p>
        </div>
      )}
    </>
  );
};

export default Login;
