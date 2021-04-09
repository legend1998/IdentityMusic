import React from "react";

function AccountInfo() {
  return (
    <div className="p-5 lg:m-10 m-5">
      <div className=" my-8 p-5 bg-white">
        <p className=" font-normal">Account Name</p>
        <input
          type="password"
          className=" appearance-none focus:outline-none bg-gray-100 border h-12 my-5 w-full px-5"
        />
        <br />
        <button className=" appearance-none focus:outline-none h-12 w-52 bg-indigo-600 text-white">
          save
        </button>
      </div>
      <div className="bg-white p-5">
        <h1 className="lg:py-8 py-5 px-5 border-b text-2xl font-normal">
          Account Info
        </h1>

        <div className="grid md:grid-cols-3 grid-cols-3">
          <div className=" col lg:p-10 flex justify-center p-5 ">
            <div className=" w-64 h-64">
              <label htmlFor="file-for">
                <div className="border rounded text-center w-64 h-64 flex justify-center items-center bg-gray-50">
                  <i className="fas fa-plus"></i>
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                id="file-for"
                className="hidden"
                onChange={(e) => {}}
              />
              <p className="text-xs text-center text-gray-400">
                Upload your image file here
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start p-5">
            <p className=" font-normal">First Name</p>
            <input
              type="text"
              className=" appearance-none focus:outline-none bg-gray-100 border h-12 my-5 px-2"
            />
            <p className=" font-normal">Email</p>
            <input
              type="text"
              className=" appearance-none focus:outline-none bg-gray-100 border h-12 my-5 px-2"
            />
          </div>
          <div className="flex flex-col justify-start p-5">
            <p className=" font-normal">Last Name</p>
            <input
              type="text"
              className=" appearance-none focus:outline-none bg-gray-100 border h-12 my-5 px-2"
            />
            <p className=" font-normal">password</p>
            <input
              type="password"
              className=" appearance-none focus:outline-none bg-gray-100 border h-12 my-5 px-2"
            />
          </div>
        </div>

        <div className="flex justify-end items-center px-5">
          <button className=" appearance-none focus:outline-none h-12 w-52 bg-transparent text-gray-600">
            cancel
          </button>
          <button className=" appearance-none focus:outline-none h-12 w-52 bg-indigo-600 text-white">
            save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
