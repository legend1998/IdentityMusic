import React, { useState } from "react";

function PaymentPreferences() {
  const [Payment, setPayment] = useState(null);

  return (
    <div className="p-5 bg-gray-100">
      <div className="bg-white m-5">
        <h1 className="text-xl font-semibold py-8 border-b pl-5">
          Payment Prefrences
        </h1>
        <div className="grid grid-rows-2 lg:grid-cols-2 grid-cols-1 p-3">
          <div className="flex flex-col justify-start px-5 m-2">
            <p className=" font-semibold mb-2">Min. Payment Threshold</p>
            <input
              type="text"
              value="5000 INR"
              readOnly
              className=" appearance-none focus:outline-none bg-gray-100 border h-12 px-2"
            />
          </div>
          <div className="flex flex-col justify-start px-5 m-2">
            <p className=" font-semibold mb-2">Statement Currency</p>
            <input
              type="text"
              value="INR"
              readOnly
              className=" appearance-none focus:outline-none bg-gray-100 border h-12 px-2"
            />
          </div>
          <div className="flex flex-col justify-start px-5 m-2">
            <p className=" font-semibold mb-2">Payment Method</p>
            <select
              type="text"
              className=" appearance-none focus:outline-none bg-gray-100 border h-12 px-2"
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value="paypal">PayPal</option>
              <option value="upi">UPI</option>
            </select>
          </div>
        </div>
        <div className="p-10">
          <h1 className="text-xl font-semibold py-8 border-b ">Payment Info</h1>
          <div className="">
            <div className="">
              <p className="text-md  font-semibold my-4">PayPal Email</p>
              <input
                type="text"
                value="INR"
                readOnly
                className=" appearance-none focus:outline-none bg-gray-100 border h-12 px-2 w-1/2"
              />
            </div>
            <div className="my-5">
              <p className="text-md font-semibold my-4">UPI Id</p>
              <input
                type="text"
                value="INR"
                readOnly
                className=" appearance-none focus:outline-none bg-gray-100 border h-12 px-2 w-1/2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end h-12 mx-5">
        <button className="h-full w-52 focus:outline-none appearance-none">
          cancel
        </button>
        <button className="h-full w-52 bg-indigo-600 text-white focus:outline-none appearance-none">
          Save
        </button>
      </div>
    </div>
  );
}

export default PaymentPreferences;
