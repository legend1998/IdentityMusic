import React from "react";

function Transactions() {
  return (
    <div className="w-full bg-gray-100 h-full">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8     font-sans ">Balance</h1>
      </div>
      <div className="flex justify-between items-end mx-10 my-5">
        <div className="">
          <select
            name=""
            id=""
            className="text-3xl font-bold appearance-none focus:outline-none bg-gray-100"
          >
            <option value="alll" className="text-sm">
              All
            </option>
            <option value="tm" className="text-sm">
              This Month
            </option>
            <option value="lm" className="text-sm">
              Last Month
            </option>
            <option value="tq" className="text-sm">
              This Quarter
            </option>
            <option value="lq" className="text-sm">
              Last Quarter
            </option>
            <option value="ty" className="text-sm">
              This Year
            </option>
            <option value="ly" className="text-sm">
              Last Year
            </option>
          </select>
        </div>
        <div className="">
          <p className="text-sm">Balance</p>
          <h3 className="text-3xl fa fa-inr font-bold"> 0.00</h3>
        </div>
      </div>
      <div className="lg:px-12 md:px-1  py-5">
        <div className="h-16 py-2 text-xs text-gray-500 flex items-end">
          Nothing to show
        </div>
        <div className="bg-white">
          <table className="table-fixed text-xs text-gray-700 w-full h-60">
            <thead>
              <tr className="h-12 border">
                <th className=" w-2/6">Date</th>
                <th className=" w-1/6">Contract Name</th>
                <th className=" w-1/6">Transaction Type</th>
                <th className=" w-1/6">Amount</th>
                <th className=" w-1/6">Balance</th>
              </tr>
            </thead>
          </table>
          <div className="w-full h-56 flex items-center justify-center">
            <p className="text-xs text-gray-500">
              You have no data to display.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
