import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";



const useCart = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();



    const {data:cartData=[], refetch}= useQuery({
       queryKey : ["cartData", user?.email],
       queryFn: async()=>{
        const {data}= await axiosPublic(`/getCartItem/?email=${user?.email}`)
        return data;
       } 
    })

    const {data:totalPrice=[], refetch:reloadTotalPrice}=useQuery({
        queryKey:['totalPrice', user?.email],
        queryFn: async()=>{
            const {data} = await axiosPublic(`/cartTotal/${user?.email}`)
            return data;
        }
    })
   return [cartData, refetch, totalPrice, reloadTotalPrice];

};

export default useCart;