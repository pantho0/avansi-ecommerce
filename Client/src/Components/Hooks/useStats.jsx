import {useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useStats = () => {
    const axiosSecure = useAxiosSecure()

    const {data:stats={}} = useQuery({
        queryKey : ['stats'],
        queryFn : async()=>{
            const {data} = await axiosSecure('/admin-stats')
            console.log(stats);
            return data;
        }
    })

    return stats;
};

export default useStats;