import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";

const AllOrders = () => {
  const axiosPublic = useAxiosPublic();
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/allOrders`);
      return data;
    },
  });
  return (
    <div>
      <div className="flex z-50 flex-col text-center p-4 lg:flex-row justify-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <div className="lg:p-6">
          <p className="text-2xl font-bold">All Orders ({orders.length})</p>
          <p className="text-sm text-white">Orders History</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Product</th>
              <th>Delivery Information</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <th>{new Date(order?.date).toLocaleString()}</th>
                <td>
                  {order && order.products.length > 0
                    ? order.products.map((pro, idx) => (
                        <div key={idx}  className="flex items-center gap-3">
                    <div className="avatar flex flex-col">
                            <div
                              className="mask mask-squircle w-12 h-12"
                            >
                              <img src={pro.image} alt="" />
                            </div>

                    </div>
                    <div>
                      <div className="">
                        <p>
                            No:{idx+1}
                        </p>
                        <p className="font-bold">
                            {pro.name}
                        </p>
                        <p>
                            Quantity :{pro.quantity}
                        </p>
                      </div>
                      <div className="text-sm opacity-50">
                      <div className="divider"></div> 
                      </div>
                    </div>
                  </div>
                      ))
                    : ""}
                </td>
                <td>
                  Division : {order?.delivery_div},
                  <br />
                  District: {order?.delivery_dist},
                    <br />
                    Address Line : {order?.delivery_details}
                    <br />
                    Mobile No : {order?.delivery_cell}
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
