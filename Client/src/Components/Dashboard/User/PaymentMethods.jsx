import { Switch } from "@headlessui/react";
import { useState } from "react";

const PaymentMethods = ({ isCashOn, setIsCashOn, enabled, setEnabled }) => {
  const handleCashonDelivery = (e) => {
    e.preventDefault();
    setIsCashOn(!isCashOn);
  };
  console.log(isCashOn);
  return (
    <div>
      {/* <div className="text-center p-4 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white ">
        <p>Select Your Payment Method</p>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Cash On Delivery</span>
          <input
            type="checkbox"
            onChange={handleCashonDelivery}
            className="checkbox checkbox-primary"
            checked={isCashOn}
          />
        </label>
      </div> */}
      <div className="text-white flex flex-row justify-between items-center mb-4">
              <Switch.Group>
                <Switch.Label passive className={'text-primary'}>Cash On Delivery</Switch.Label>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${enabled ? "bg-primary" : "bg-secondary"}
          relative inline-flex h-[24px] w-[45px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </Switch.Group>
            </div>
    </div>
  );
};

export default PaymentMethods;
