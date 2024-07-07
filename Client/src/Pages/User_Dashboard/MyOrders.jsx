import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Components/Hooks/useAuth";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import { MdDeleteSweep } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import ViewOrderModal from "../../Components/Modals/viewOrder/ViewOrderModal";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyOrders = () => {
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
      const { data } = await axiosSecure(`/viewOrders/${email}`);
      return data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#000",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#22C55E",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "custom-swal-popup",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/deleteOrder/${id}`);
        if (data.deletedCount > 0) {
          refetch();
        }
        Swal.fire({
          title: "Deleted!",
          background: "#000",
          color: "#fff",
          text: "Order has been deleted.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
          },
        });
      }
    });
  };

  return (
    <div>
      <ViewOrderModal
        isOpen={isOpen}
        closeModal={closeModal}
        productId={productId}
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

export default MyOrders;
