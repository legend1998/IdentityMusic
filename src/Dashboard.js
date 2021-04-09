import React from "react";

function Dashboard() {
  return (
    <div className="w-full bg-gray-100">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10 font-sans ">
          Hi, Yash!
        </h1>
      </div>
      <div className="m-10 bg-white p-5">
        <div className=" m-5  py-5 p border-b border-gray-50 flex items-center justify-between text-gray-500">
          <h3>please do the following </h3>
          <div>
            <i className="far fa-times-circle cursor-pointer"></i>
          </div>
        </div>
        <div className=" h-56 flex items-center justify-center">
          <h1 className="text-gray-300"> add some data here</h1>
        </div>
      </div>
      <div className="m-10  flex flex-wrap">
        <div className=" h-72 w-96 bg-white   mr-3 mb-3">
          <div className=" h-16 px-8 flex items-center">
            <p className="text-xl">Dashboard</p>
          </div>
          <div className="h-56 bg-gray-500 p-8">data</div>
        </div>
        <div className=" h-72 w-96 bg-white mr-3 mb-3">
          <div className=" h-16 px-8 flex items-center">
            <p className="text-xl">Dashboard</p>
          </div>
          <div className="h-56 bg-gray-500 p-8">data</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
