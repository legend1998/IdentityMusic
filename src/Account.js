import React, { useState } from "react";
import AccountInfo from "./AccountInfo";
import PaymentPreferences from "./PaymentPreferences";

function Account() {
  const [tab, settab] = useState(1);
  let active = "border-b-2 border-purple-700 bg-white";
  let passive = "bg-gray-50 text-gray-600 border";

  return (
    <div className="h-screen overflow-y-auto bg-gray-100">
      <div className="w-full bg-white h-24  flex items-center justify-between shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 font-sans ">Account</h1>
        <p className="text-sm font-light mr-8 ">Account>account</p>
      </div>
      <div className="flex border flex-wrap items-center h-14 ">
        <div
          onClick={() => settab(1)}
          className={`flex-grow p-4 px-10 cursor-pointer hover:text-black   ${
            tab === 1 ? active : passive
          }`}
        >
          Account
        </div>
        <div
          onClick={() => settab(2)}
          className={`flex-grow p-4 px-10 cursor-pointer hover:text-black ${
            tab === 2 ? active : passive
          }`}
        >
          Payout Prefrences
        </div>
      </div>
      {tab === 1 ? <AccountInfo /> : null}
      {tab === 2 ? <PaymentPreferences /> : null}
    </div>
  );
}

export default Account;
