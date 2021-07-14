import React, { useState } from "react";
import { firedb } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";
import AWN from "awesome-notifications";

function PaymentPreferences() {
  const [Payment, setPayment] = useState(null);
  const [id, setId] = useState(null);
  const [{ user }] = useStateValue();

  function saveId() {
    firedb
      .collection("user")
      .doc(user.email)
      .update({
        paymentPreference: {
          mode: Payment,
          id: id,
        },
      })
      .then(() => {
        new AWN().success("success");
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }

  return (
    <div className="p-5 bg-background">
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
              className=" appearance-none focus:outline-none bg-box  h-14 px-5"
            />
          </div>
          <div className="flex flex-col justify-start px-5 m-2">
            <p className=" font-semibold mb-2">Statement Currency</p>
            <input
              type="text"
              value="INR"
              readOnly
              className=" appearance-none focus:outline-none bg-box  h-14 px-5"
            />
          </div>
          <div className="flex flex-col justify-start px-5 m-2">
            <p className=" font-semibold mb-2">Payment Method</p>
            <select
              type="text"
              defaultValue={user?.paymentPreference?.mode}
              className=" appearance-none focus:outline-none bg-box  h-14 px-5"
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
              <p className="text-md  font-semibold my-4">
                PayPal Email / UPI ID
              </p>
              <input
                onChange={(e) => setId(e.target.value)}
                defaultValue={user?.paymentPreference?.id}
                type="text"
                placeholder="abc@xyz.com"
                className=" appearance-none focus:outline-none bg-box  h-14 px-2 w-1/2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end h-12 mx-5">
        <button className="h-full w-52 focus:outline-none appearance-none">
          Cancel
        </button>
        <button
          onClick={() => saveId()}
          className="h-full w-52 bg-indigo-600 text-white focus:outline-none appearance-none"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default PaymentPreferences;
