import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic();
    const [isAdmin, setIsAdmin] = useState(false);
    const email = user?.email;
    axiosPublic(`/isAdmin/?email=${email}`)
    .then(res=> setIsAdmin(res.data))
    return isAdmin;

    
};

export default useRole;