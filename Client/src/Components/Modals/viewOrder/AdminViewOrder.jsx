import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdBorderColor } from "react-icons/md";

export default function AdminViewOrder({ isOpen, closeModal }) {
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState("");
  useEffect(() => {
    axiosSecure(`/allOrders`).then((res) => setOrder(res?.data));
  }, [axiosSecure]);
  return (
    <>
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
    </>
  );
}
