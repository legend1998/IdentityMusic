import React, { useState } from "react";
import MainInfo from "./MainInfo";
import NewTracks from "./NewTracks";
import Stores from "./Stores";
import ReviewandSave from "./ReviewandSave";
import { useHistory } from "react-router-dom";

function CreateNewRelease() {
  const [tab, settab] = useState(1);
  let history = useHistory();

  let active = "border-b-2 border-purple-700 bg-white";
  let passive = "bg-gray-50 text-gray-600 border";

  const approve = () => {
    // do nothing

    document.getElementById("approved").classList.remove("hidden");
    document.getElementById("approved").classList.add("flex");
  };
  const goback = () => {
    // do nothing
    history.replace("/panel/assets");
  };

  return (
    <div className="h-screen">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10 font-sans ">
          Add New Release
        </h1>
      </div>
      <div className="flex border flex-wrap items-center h-14 ">
        <div
          onClick={() => settab(1)}
          className={`flex-grow py-4 cursor-pointer hover:text-black   ${
            tab === 1 ? active : passive
          }`}
        >
          <span className="mx-5">01</span> Main info
        </div>
        <div
          onClick={() => settab(2)}
          className={`flex-grow py-4 cursor-pointer hover:text-black ${
            tab === 2 ? active : passive
          }`}
        >
          <span className="mx-5">02</span> Tracks
        </div>
        <div
          onClick={() => settab(3)}
          className={`flex-grow py-4 pl-6 hover:text-black cursor-pointer ${
            tab === 3 ? active : passive
          }`}
        >
          <span className="mx-5">03</span> Stores
        </div>
        <div
          onClick={() => settab(4)}
          className={`flex-grow py-4 pl-6 hover:text-black cursor-pointer ${
            tab === 4 ? active : passive
          }`}
        >
          <span className="mx-5">04</span> Review & save
        </div>
      </div>
      {tab === 1 ? <MainInfo /> : null}
      {tab === 2 ? <NewTracks /> : null}
      {tab === 3 ? <Stores /> : null}
      {tab === 4 ? <ReviewandSave /> : null}

      <div
        className="hidden fixed top-0 left-0 z-40 w-screen h-screen bg-transparent-back items-center justify-center"
        id="approved"
      >
        <div className=" h-80 w-96 bg-white flex p-6 text-center items-center justify-center flex-col shadow-lg rounded">
          <i className="fas fa-check text-green-500 fa-7x p-2"></i>

          <p className="text-2xl ">
            your release has been created and waiting for approval.
          </p>
          <button
            onClick={goback}
            className="my-2 h-10 w-28 text-white bg-gradient-to-t focus:outline-none from-blue-400 to-blue-500 rounded"
          >
            Close
          </button>
        </div>
      </div>
      <div className=" flex items-center justify-between bg-black h-14 text-gray-200 sticky bottom-0  w-full">
        <button
          className={
            tab === 1
              ? "hidden"
              : " h-full w-52 bg-gray-600 focus:outline-none hover:bg-gray-700"
          }
        >
          <i className="fas fa-arrow-left mx-3"></i> Back
        </button>
        <button className=" h-full  focus:outline-none w-full">Cancel</button>
        {tab === 4 ? (
          <button
            onClick={approve}
            className="w-52 h-full bg-blue-800 focus:outline-none hover:bg-blue-900"
          >
            Approve
            <i className="fas fa-arrow-right mx-3"></i>
          </button>
        ) : (
          <button className="w-52 h-full bg-blue-800 focus:outline-none hover:bg-blue-900">
            Next
            <i className="fas fa-arrow-right mx-3"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateNewRelease;
