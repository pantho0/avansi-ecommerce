import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://avansi-backend.vercel.app/api/v1",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
