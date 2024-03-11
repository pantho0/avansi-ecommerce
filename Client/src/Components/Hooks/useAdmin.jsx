import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading,} = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled : !loading,
    queryFn: async () => {
      const { data } = await axiosSecure(`/isAdmin?email=${user?.email}`);
      return data;
    },
  });
  console.log(isAdmin);
  return [isAdmin, isAdminLoading]
};

export default useAdmin;
