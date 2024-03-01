import { useState } from "react";

const PaymentMethods = ({isCashOn, setIsCashOn}) => {
    const handleCashonDelivery = (e) =>{
        e.preventDefault()
        setIsCashOn(!isCashOn)
    }
    console.log(isCashOn);
    return (
        <div>
            <div className="text-center p-4 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white ">
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
                        </div>
        </div>
    );
};

export default PaymentMethods;