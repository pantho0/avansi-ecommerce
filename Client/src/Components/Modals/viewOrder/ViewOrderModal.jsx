import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdBorderColor } from "react-icons/md";
import toast from "react-hot-toast";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";

export default function ViewOrderModal({
  isOpen,
  closeModal,
  productId,
  refetch,
}) {
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState("");
  useEffect(() => {
    axiosSecure(`/singleOrders/${productId}`).then((res) =>
      setOrder(res?.data)
    );
  }, [productId, axiosSecure, isOpen]);

  const handleAction = async (e, productId) => {
    e.preventDefault();
    const status = e.target.value;
    const action = {
      status: status,
    };
    const { data } = await axiosSecure.patch(
      `/updateStatus/${productId}`,
      action
    );

    if (data.modifiedCount > 0) {
      toast.success("Order Status Updated");
      refetch();
    }
  };

  return (
    <div className="-z-10">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full md:w-[60%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="leading-6 text-gray-900 text-center text-2xl font-bold"
                  >
                    Order Details
                  </Dialog.Title>
                  <div className="border mt-[12px] border-gray-200 rounded-md p-2">
                    <div>
                      <p className="text-base">Customer Name : {order?.name}</p>
                      <p className="text-base">
                        Customer Email : {order?.email}
                      </p>
                      <p>
                        Transaction id : {order?.tranId ? order?.tranId : "COD"}
                      </p>
                      <p>Customer Mobile : {order?.delivery_cell}</p>
                      <p>Delivery Division : {order?.delivery_div}</p>
                      <p>Delivery District : {order?.delivery_dist}</p>
                      <p>Delivery Address Line : {order?.delivery_details}</p>
                      <p>
                        Product Price (without deliver charge) :{" "}
                        {order?.productsPrice}
                      </p>
                      <p>
                        Product Price (with deliver charge) :{" "}
                        {order?.totalPriceWithDelivery}
                      </p>
                    </div>
                    <div className="divider"></div>
                    <div>
                      <p>Products:</p>

                      {order?.products && order?.products?.length > 0
                        ? order?.products.map((pro, idx) => (
                            <div key={idx}>
                              <div className="flex flex-col md:flex-row gap-2">
                                {pro?.image?.length > 0 && (
                                  <img
                                    className="w-[40px]"
                                    src={pro.image[0]}
                                    alt=""
                                  />
                                )}

                                <p>Name : {pro.name}</p>
                                <p>Quantity : {pro.quantity}</p>
                              </div>
                            </div>
                          ))
                        : "No Products"}
                    </div>
                    <div className="divider">Select delivery action </div>
                    <div className="mt-2 flex justify-center">
                      <button>
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
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
