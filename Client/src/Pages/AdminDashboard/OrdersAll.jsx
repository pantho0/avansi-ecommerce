import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Components/Hooks/useAuth";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import { MdDeleteSweep } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import ViewOrderModal from "../../Components/Modals/viewOrder/ViewOrderModal";
import { useState } from "react";
import toast from "react-hot-toast";
import AdminViewOrder from "./../../Components/Modals/viewOrder/AdminViewOrder";

const OrderAll = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  const openModal = (id) => {
    setProductId(id);
    setIsOpen(true);
  };
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders", user?.email, email],
    queryFn: async () => {
      const { data } = await axiosSecure("/allOrders");
      return data;
    },
  });

  const handleDelete = async (id) => {
    const { data } = await axiosSecure.delete(`/deleteOrder/${id}`);
    if (data.deletedCount > 0) {
      refetch();
      toast.success("Order Deleted");
    }
  };

  return (
    <div>
      <AdminViewOrder
        isOpen={isOpen}
        closeModal={closeModal}
        productId={productId}
        refetch={refetch()}
      />
      <div className="flex z-50 flex-col text-center p-4 lg:flex-row justify-center bg-black text-white">
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
                <th>Transaction ID</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...orders].reverse().map((order) => (
                <tr key={order._id}>
                  <th>{new Date(order?.date).toLocaleString()}</th>
                  {/* <td>
                    {order.products && order.products.length > 0 ? (
                      order.products.map((pro, idx) => (
                        <div key={idx}>
                          <p>Name : {pro.name}</p>
                          <p>Quantity : {pro.quantity}</p>
                        </div>
                      ))
                    ) : (
                      <p>No product found</p>
                    )}
                  </td> */}
                  <td>{order?.tranId ? order.tranId : "COD"}</td>
                  <td>{order?.paidStatus ? "PAID" : "COD"}</td>
                  <td>{order?.status}</td>
                  <td>
                    <MdRemoveRedEye
                      onClick={() => openModal(order._id)}
                      className="text-green-700 cursor-pointer"
                      size={20}
                    />
                  </td>
                  {order.status === "Pending" ? (
                    <td>
                      <MdDeleteSweep
                        onClick={() => handleDelete(order._id)}
                        className="text-red-500 cursor-pointer"
                        size={20}
                      />
                    </td>
                  ) : (
                    "Confirmed By Store"
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderAll;
