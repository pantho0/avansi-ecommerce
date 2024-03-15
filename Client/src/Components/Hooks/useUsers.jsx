import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUsers = () => {
    const axiosSecure = useAxiosSecure()
    const {data:users=[]} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const {data} = await axiosSecure('/allUsers')
            return data
        }
    })
    return users
};

export default useUsers;