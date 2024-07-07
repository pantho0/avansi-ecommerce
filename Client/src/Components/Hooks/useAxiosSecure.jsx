import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import toast from "react-hot-toast";
// baseURL: "https://avansi-backend.onrender.com/api/v1",
const axiosSecure = axios.create({
  baseURL: "https://avansi-backend.onrender.com/api/v1",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

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
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          signOut();
          navigate("/login");
        }
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
