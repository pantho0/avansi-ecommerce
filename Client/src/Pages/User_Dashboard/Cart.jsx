import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { MdDeleteSweep } from "react-icons/md";
import useAuth from "../../Components/Hooks/useAuth";

const Cart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/getCartItem/${user?.email}`);
      return data;
    },
  });

  const handleDelete = async(id) =>{
      console.log(id);
      const {data} = await axiosPublic.delete(`/deleteCartItem/${id}`)
      if(data.deletedCount>0){
        refetch()
        alert('Item Deleted')
        
      }
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="p-6">
          <p className="text-2xl font-bold">Shopping Cart</p>
          <p className="text-sm text-gray-800">Showing your choosed product</p>
        </div>
        <div className="p-6 flex items-center gap-2">
          <p className="text-sm">Price:</p>
          <select className="select select-bordered select-sm w-full max-w-xs">
            <option>Low to high</option>
            <option>High to low</option>
          </select>
        </div>
      </div>
      {/* Cart Summary */}
      <div className="flex z-10">
        <div className="w-[66%] h-screen bg-gary-300 m-5 shadow-2xl rounded-2xl">
          {
            products.length === 0  ? <div><p className="flex w-full items-center justify-center h-[calc(100vh-30vh)] font-bold">No Products Added Yet</p></div> : 
            <>
            {products.map((item, idx) => (
              <div className="flex items-center border-b-2 gap-2 p-8" key={item?._id}>
                <div>
                  
                  <div className="avatar gap-2">
                    <div>
                    <p>{idx+1}.</p>
                  </div>
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item?.image} />
                    </div>
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="font-bold">{item?.name}</p>
                  <p>{item?.price}</p>
                </div>
                <div className="">
                  <button onClick={()=>handleDelete(item._id)} className="btn btn-primary btn-xs">
                    <MdDeleteSweep size={18} color="white"/>
                  </button>
                </div>
              </div>
          
            ))}
            </>
          }
        </div>
        <div className="flex-1 m-5 w-full h-1/2 rounded-2xl shadow-2xl">
          <div className="fixed w-[300px] bg-white rounded-lg">
          <div className="text-center p-4 bg-primary text-white rounded-tr-2xl rounded-tl-2xl">
            <p>Billing Summary</p>
          </div>
          <div className="flex justify-between px-4 pt-4 text-sm text-gray-500">
            <p>Total Price</p>
            <p>$0.0</p>
          </div>
          <div className="flex justify-between px-4 pt-4 text-sm text-gray-500">
            <p>Total Price Discount</p>
            <p>$0.0</p>
          </div>
          <div className="flex justify-between px-4 pt-4 text-sm text-gray-500">
            <p>Vat & Tax</p>
            <p>$0.0</p>
          </div>
          <hr  className="mt-6"/>
          <div className="flex justify-between px-4 pt-4 text-sm text-black font-medium">
            <p>Total Price</p>
            <p>$0.0</p>
          </div>
         <div className="p-3 mt-4">
         <button className="btn btn-primary btn-md rounded-md w-full">Check Out</button>
         </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
