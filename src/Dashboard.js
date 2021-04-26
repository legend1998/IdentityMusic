import React from "react";
import { useStateValue } from "./StateProvider";
import { Line, Circle } from "rc-progress";

function Dashboard() {
  const [{ user }] = useStateValue();
  return (
    <div className="w-full bg-gray-100">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10 font-sans capitalize">
          Hi, {user.fname}!
        </h1>
      </div>
      <div className="m-10 bg-white p-5">
        <div className=" m-5  py-5 p border-b border-gray-50 flex items-center justify-between text-gray-500">
          <h3>please do the following </h3>
          <div>
            <i className="far fa-times-circle cursor-pointer"></i>
          </div>
        </div>
        <div className=" min-h-56 flex items-center justify-start ">
          <div className=" w-1/3 text-center flex flex-col items-center justify-center">
            <Circle
              percent="10"
              strokeWidth="9"
              trailWidth="8"
              strokeColor="#0000ff"
              className="h-32 text-blue-600"
            />
            <p className="my-5 text-lg font-semibold">setup Progress</p>
          </div>
          <div className="">
            <div className="float-left flex items-center m-3 flex-wrap justify-center">
              <i className="fas fa-check fa-3x text-blue-600 rounded-full border-8 p-3"></i>
              <span className="text-center mx-4">
                Add Payment Info bjaldfaksdhfldakshfalskhl
              </span>
            </div>
            <div className="float-left flex items-center m-3 flex-wrap justify-center">
              <i className="fas fa-check fa-3x text-blue-600 rounded-full border-8 p-3"></i>
              <span className="text-center mx-4">
                Add Payment Info bjaldfaksdhfldakshfalskhl
              </span>
            </div>
            <div className="float-left flex items-center m-3 flex-wrap justify-center">
              <i className="fas fa-check fa-3x text-blue-600 rounded-full border-8 p-3"></i>
              <span className="text-center mx-4">
                Add Payment Info bjaldfaksdhfldakshfalskhl
              </span>
            </div>
            <div className="float-left flex items-center m-3 flex-wrap justify-center">
              <i className="fas fa-check fa-3x text-blue-600 rounded-full border-8 p-3"></i>
              <span className="text-center mx-4">
                Add Payment Info bjaldfaksdhfldakshfalskhl
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="m-10  grid  grid-cols-1 md:grid-cols-2">
        <div className=" h-72   bg-white   mr-3 mb-3">
          <div className=" h-16 px-8 flex items-center">
            <p className="text-xl">Dashboard</p>
          </div>
          <div className="h-56 bg-gray-500 p-8">data</div>
        </div>
        <div className=" h-72  bg-white mr-3 mb-3">
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
