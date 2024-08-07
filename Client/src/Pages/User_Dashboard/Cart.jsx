import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { MdDeleteSweep } from "react-icons/md";
import useAuth from "../../Components/Hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Checkout from "../../Components/Modals/Checkout/Checkout";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import { TbCurrencyTaka } from "react-icons/tb";

const Cart = () => {
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [price, setPrice] = useState("");
  const { user } = useAuth();
  const [priceTotal, setPriceTotal] = useState(0);

  let [isOpen, setIsOpen] = useState(false);
  const [paymentTrigger, setPaymentTrigger] = useState(false);
  function closeModal() {
    setPaymentTrigger(false);
    setIsOpen(false);
  }

  // const openModal = () => {
  //   setIsOpen(true)
  // }

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products", user?.email, price],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/getCartItem/?email=${user?.email}&sortField=priceWithQuantity&sortOrder=${price}`
      );
      return data;
    },
  });

  const { data: totalPrice = [], refetch: reload } = useQuery({
    queryKey: ["totalPrice", user?.email, priceTotal],
    queryFn: async () => {
      const { data } = await axiosSecure(`/cartTotal/${user.email}`);
      setPriceTotal(data.total);
      return data;
    },
  });

  const handleDelete = async (id) => {
    console.log(id);
    const { data } = await axiosSecure.delete(`/deleteCartItem/${id}`);
    if (data.deletedCount > 0) {
      refetch();
      reload();
      toast.success("Item deleted from cart");
    }
  };

  const handleIncreaseQuantity = async (id, quantity) => {
    const quantityInfo = {
      quantity: quantity,
    };
    const { data } = await axiosSecure.patch(
      `/quantityPrice/${id}`,
      quantityInfo
    );
    refetch();
    reload();
  };

  const handleDecreaseQuantity = async (id, quantity) => {
    if (quantity <= 1) {
      return alert('You can"t set quantity to below 1');
    }
    const quantityInfo = {
      quantity: quantity,
    };
    const { data } = await axiosSecure.patch(
      `/quantityPriceDecrease/${id}`,
      quantityInfo
    );
    refetch();
    reload();
  };

  const handleFilter = (e) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="z-0">
        {/* check out modal */}
        <Checkout
          isOpen={isOpen}
          closeModal={closeModal}
          priceTotal={priceTotal}
          products={products}
          paymentTrigger={paymentTrigger}
          setPaymentTrigger={setPaymentTrigger}
        />
      </div>
      <div className="z-50">
        <Helmet title="Avansi Fashion || User-Cart" />
        <div className="flex z-50 flex-col text-center p-4 lg:flex-row justify-between bg-black text-white">
          <div className="lg:p-6">
            <p className="text-2xl font-bold">Shopping Cart</p>
            <p className="text-sm text-white">Showing your choosed product</p>
          </div>
          <div className="flex items-center justify-center md:p-0 lg:gap-2 p-6">
            <p className="text-sm">Price:</p>
            <select
              onChange={handleFilter}
              className="select select-bordered text-black select-sm w-full max-w-xs"
            >
              <option defaultValue={""} disabled selected>
                Slect One
              </option>
              <option value={"asc"}>Low to high</option>
              <option value={"desc"}>High to low</option>
            </select>
          </div>
        </div>
        {/* Cart Summary */}
        <div className="flex flex-col md:flex-row z-10">
          <div className="min-h-screen  md:w-[67%] bg-gary-300 m-5 shadow-2xl rounded-2xl lg:w-[66%]">
            {products.length === 0 ? (
              <div>
                <p className="flex w-full items-center justify-center h-[calc(100vh-30vh)] font-bold">
                  No Products Added Yet
                </p>
              </div>
            ) : (
              <>
                {products.map((item, idx) => (
                  <div
                    className="flex flex-col md:flex-row items-center border-b-2 gap-2 p-8"
                    key={item?._id}
                  >
                    <div>
                      <div className="avatar gap-2">
                        <div>
                          <p>{idx + 1}.</p>
                        </div>
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item?.image} />
                        </div>
                      </div>
                    </div>
                    <div className="text-center md:flex-grow md:text-left">
                      <p className="font-bold">{item?.name}</p>
                      <p>{item?.priceWithQuantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex border">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(item._id, item?.quantity)
                          }
                          className="btn btn-xs rounded-none btn-accent mr-4"
                        >
                          -
                        </button>
                        {item?.quantity}
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(item._id, item?.quantity)
                          }
                          className="btn btn-xs rounded-none btn-accent ml-4"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-primary btn-xs"
                      >
                        <MdDeleteSweep size={18} color="white" />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="md:min-w-[33%] lg:m-5 h-1/2 rounded-2xl shadow-2xl">
            <div className="w-full md:w-full lg:w-full bg-white rounded-lg">
              <div className="text-center p-4 bg-black text-white rounded-tr-2xl rounded-tl-2xl">
                <p>Billing Summary</p>
              </div>
              <div className="flex justify-between px-4 pt-4 text-sm text-gray-500">
                <p>Total Price</p>
                <p className="flex items-center">
                  <TbCurrencyTaka />
                  {totalPrice?.total?.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between px-4 pt-4 text-sm text-gray-500">
                <p>Total Price Discount</p>
                <p className="flex items-center">
                  <TbCurrencyTaka />
                  0.0
                </p>
              </div>
              <div className="flex justify-between px-4 pt-4 text-sm text-gray-500">
                <p>Vat & Tax</p>
                <p className="flex items-center">
                  <TbCurrencyTaka />
                  0.0
                </p>
              </div>
              <hr className="mt-6" />
              <div className="flex justify-between px-4 pt-4 text-sm text-black font-medium">
                <p>Sub Total Price</p>
                <p>{priceTotal?.toFixed(2)}</p>
              </div>
              {/* <div className="flex justify-between px-4 pt-4 text-sm text-black font-medium">
                <p>
                  Grand Total Price <br />{" "}
                  <span>
                    <small className="text-red-600 font-bold">
                      With delivery charge included (inside dhaka 80tk,
                      <br /> outside 120tk),it will calculated when you select
                      your delivery address
                    </small>
                  </span>
                </p>
                <p>{priceWithDeliveryCharge?.toFixed(2)}</p>
              </div> */}
              <hr className="mt-6" />

              <div className="p-3 mt-4">
                <button
                  disabled={products?.length === 0}
                  onClick={() => setIsOpen(true)}
                  className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black btn-md rounded-md w-full"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
