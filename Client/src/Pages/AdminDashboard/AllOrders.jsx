import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { toast } from "react-hot-toast";

const AllOrders = () => {
  const axiosPublic = useAxiosPublic();
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/allOrders`);
      return data;
    },
  });

  const handleAction = async (e, id) => {
    e.preventDefault();
    const status = e.target.value;
    const action = {
      status: status,
    };
    const { data } = await axiosPublic.patch(`/updateStatus/${id}`, action);
    if (data.modifiedCount > 0) {
      refetch();
      toast.success("Order Status Updated");
    }
  };
  return (
    <div>
      <div className="flex z-50 flex-col text-center p-4 lg:flex-row justify-center bg-black text-white">
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
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[...orders].reverse().map((order, idx) => (
              <tr key={idx}>
                <th>{new Date(order?.date).toLocaleString()}</th>
                <td>
                  {order && order.products.length > 0
                    ? order.products.map((pro, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="avatar flex flex-col">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={pro.image} alt="" />
                            </div>
                          </div>
                          <div>
                            <div className="">
                              <p>No:{idx + 1}</p>
                              <p className="font-bold">{pro.name}</p>
                              <p>Quantity :{pro.quantity}</p>
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
                <td>
                  Product Price : {order?.productsPrice}
                  <br />
                  Price with delivery charge : {order?.totalPriceWithDelivery}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">
                    {order?.status}
                  </button>
                </th>
                {/* <th>
                  <select
                    onChange={(e) => handleAction(e, order._id)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled selected>
                      Select an action
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Product Picked Up From Warehouse">
                      Product Picked Up From Warehouse
                    </option>
                    <option value="Assigned To Delivery Man">
                      Assigned To Delivery Man
                    </option>
                    <option value="Shipped">Shipped</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </th> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
