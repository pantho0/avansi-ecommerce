import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Components/Hooks/useAuth";
// import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";

const MyOrders = () => {
    const {user} = useAuth();
    const email = user?.email;
    const axiosSecure = useAxiosSecure()
    // const axiosPublic = useAxiosPublic();
    const {data:orders=[]} = useQuery({
        queryKey:['orders', user?.email, email],
        queryFn : async()=>{
            const {data} = await axiosSecure(`/viewOrders/${email}`)
            console.log(data);
            return data; 
        }
    })


  return (
    <div>
      <div className="flex z-50 flex-col text-center p-4 lg:flex-row justify-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <div className="lg:p-6">
          <p className="text-2xl font-bold">My Orders ({orders.length})</p>
          <p className="text-sm text-white">Orders History</p>
        </div>
      </div>
      <div>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Date</th>
        <th>Product Name</th>
        <th>Division</th>
        <th>District</th>
        <th>Address Line</th>
        <th>Mobile</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {
        orders.map(order =><tr key={order._id}>
            <th>{new Date(order?.date).toLocaleString()}</th>
            <td>{order.products && order.products.length>0 ? (
                order.products.map((pro, idx)=><div key={idx}>
                    <p>Name : {pro.name}</p>
                    <p>Quantity : {pro.quantity}</p>
                </div>
                
                
                
                )
            )
            :(<p>No product found</p>)}</td>
            <td>{order?.delivery_div}</td>
            <td>{order?.delivery_dist}</td>
            <td>{order?.delivery_details}</td>
            <td>{order?.delivery_cell}</td>
            <td>{order?.status}</td>
            
          </tr>)
      }
      
      
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default MyOrders;
