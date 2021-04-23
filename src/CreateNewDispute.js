import React from "react";

function CreateNewDispute() {
  return (
    <div className="h-screen overflow-y-auto bg-gray-100">
      <div className="w-full bg-white h-24  flex items-center justify-between shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 font-sans ">Dispute</h1>
        <p className="text-sm font-light mr-8 ">Dispute</p>
      </div>
      <div className="p-5 lg:m-10 m-5">
        <div className=" my-8 p-5 bg-white">
          <p className=" font-normal">Youtube Link</p>
          <input
            type="password"
            className=" appearance-none focus:outline-none bg-gray-100 border h-12 my-5 w-full px-5"
          />
          <br />
          <button className=" appearance-none focus:outline-none h-12 w-52 bg-indigo-600 text-white">
            save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewDispute;
