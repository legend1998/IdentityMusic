import React from "react";
import LabelInfo from "./LabelInfo";

function AddLabel() {
  return (
    <div className="bg-gray-100 pb-10">
      <div className="w-full bg-white h-24 lg:pl-12 pl-5 flex items-center justify-start shadow-sm">
        <button className="focus:outline-none appearance-none">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-3xl font-semibold pl-2 font-sans ">
          Create New Label
        </h1>
      </div>
      <div className="bg-white lg:m-10">
        <p className="px-5 text-xl border-b py-3 ">Label Image</p>

        <div className="grid md:grid-cols-3 grid-cols-1">
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
          <div className=" col-span-2  flex flex-col justify-start p-5">
            <h5 className="text-sm text-gray-800 font-semibold lg:p-3">
              Please follow these rules so your release isn't rejected by the
              stores & services.
            </h5>
            <ul className="pl-10 list-disc text-sm pr-5">
              <li>File format: JPG or JPEG</li>
              <li>Recommended minimum width or height: 1400 pixels</li>
            </ul>
          </div>
        </div>
      </div>
      <LabelInfo />
    </div>
  );
}

export default AddLabel;
