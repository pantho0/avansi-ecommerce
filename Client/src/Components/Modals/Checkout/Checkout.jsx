import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useDivisions from "../../Hooks/useDivisions";
import PaymentMethods from "../../Dashboard/User/PaymentMethods";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export default function Checkout({ isOpen, closeModal, priceTotal, products }) {
  const [isCashOn, setIsCashOn] = useState(false)
  const [enabled, setEnabled] = useState(false);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [divisions] = useDivisions();
  const [districts, setDistricts] = useState([]);
  const [deliveryDiv, setDeliveryDiv] = useState('')
  const [deliveryDist, setDeliveryDist] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [detailsAddress, setDetailAddress] = useState('')
  const price = priceTotal;
  const [priceWithDeliveryCharge, setPriceWithDeliveryCharge] = useState(price);

  const handleDivision = (e) => {
    e.preventDefault();
    const division = e.target.value;
    setDeliveryDiv(division);
    const singleDivision = divisions.find((div) => div.division === division);
    if (singleDivision) {
      setDistricts(singleDivision.districts);
    } else {
      setDistricts([]);
    }
  };

  const handleDeliveryCharge = (e) => {
    e.preventDefault();
    const dist = e.target.value;
    setDeliveryDist(dist)
    const isInsideDhaka = dist === "Dhaka";
    const deliveryCharge = isInsideDhaka ? 80 : 120;
    const totalCost = priceTotal + deliveryCharge;
    setPriceWithDeliveryCharge(totalCost);
  };

  //Save the payment info in db 
  const paymentInfo = {
    name : user?.displayName,
    email : user?.email,
    products : products,
    status : 'Pending',
    date : Date.now(),
    productsPrice :  priceTotal,
    totalPriceWithDelivery : priceWithDeliveryCharge,
    delivery_div : deliveryDiv,
    delivery_dist :deliveryDist,
    delivery_cell : mobileNo,
    delivery_details: detailsAddress
  }
  //Managing State for Mobile No. & Details Address:
  const handleMobile = (e) =>{
    e.preventDefault();
    setMobileNo(e.target.value)
  }
  const handleDetailsAddress = (e) =>{
    e.preventDefault();
    setDetailAddress(e.target.value);
  }
  console.log(paymentInfo);
  //Submission for cash on delivery : 
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const {data} = await axiosPublic.post('/savePayment',paymentInfo)
    console.log(data);
  }


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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="text-center p-4 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white ">
                      <p>Shipping Address</p>
                    </div>
                  </Dialog.Title>

                  <div>
                    <div className="flex justify-between px-4 pt-4 text-sm text-black font-medium">
                      <p>Sub Total Price</p>
                      <p>{priceTotal?.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between px-4 pt-4 text-sm text-black font-medium">
                      <p>
                        Grand Total Price <br />{" "}
                        <span>
                          <small className="text-red-600 font-bold">
                            With delivery charge included (inside dhaka 80tk,
                            <br /> outside 120tk),it will calculated when you
                            select your delivery address
                          </small>
                        </span>
                      </p>
                      <p>{priceWithDeliveryCharge?.toFixed(2)}</p>
                    </div>
                    <div>
                      <form onSubmit={handleSubmit} className="px-4 pt-4">
                        <label className="input bg-white input-bordered flex items-center mb-2 gap-2">
                          Name :
                          <input
                            readOnly
                            defaultValue={user?.displayName}
                            type="text"
                            className="grow bg-white"
                            placeholder="Daisy"
                          />
                        </label>
                        <label className="input bg-white input-bordered flex items-center gap-2 mb-2">
                          Email :
                          <input
                            readOnly
                            defaultValue={user?.email}
                            type="text"
                            className="grow bg-white"
                            placeholder="Daisy"
                          />
                        </label>
                        <select
                          onChange={handleDivision}
                          className="select w-full mb-2"
                        >
                          <option disabled selected>
                            Pick your division
                          </option>
                          {divisions.map((division) => (
                            <option key={division.name}>
                              {division.division}
                            </option>
                          ))}
                        </select>
                        <select
                          onChange={handleDeliveryCharge}
                          className="select w-full mb-2"
                        >
                          <option disabled selected>
                            Pick your District
                          </option>
                          {districts &&
                            districts.map((dis) => (
                              <option key={dis}>{dis}</option>
                            ))}
                        </select>
                        <label className="input bg-white input-bordered flex items-center gap-2 mb-2">
                          Mobile :
                          <input
                            type="text"
                            onChange={handleMobile}
                            className="grow bg-white"
                            placeholder="Enter your phone number"
                          />
                        </label>
                        <textarea
                          onChange={handleDetailsAddress}
                          className="textarea w-full textarea-bordered"
                          placeholder="Enter your details address"
                        ></textarea>
                        <hr className="mt-6 mb-4" />
                        <PaymentMethods isCashOn={isCashOn} setIsCashOn={setIsCashOn} enabled={enabled} setEnabled={setEnabled} />
                        <div className="w-full">
                        <button disabled={!enabled} className="btn btn-primary w-full">
                        <input type="submit" value="Confirm Order" />
                        </button>
                        </div>
                      </form>
                    </div>
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
