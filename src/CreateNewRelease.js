import React, { useState } from "react";
import MainInfo from "./MainInfo";
import NewTracks from "./NewTracks";
import Stores from "./Stores";
import ReviewandSave from "./ReviewandSave";
import { useHistory } from "react-router-dom";

function CreateNewRelease() {
  const [tab, settab] = useState(1);
  const [allowed, setallowed] = useState([1]);
  const [id, setid] = useState(null);

  let history = useHistory();

  let active = "border-b-2 border-purple-700 bg-white";
  let passive = "bg-gray-50 text-gray-600 border";

  function handletab(tab, next) {
    if (next) {
      setallowed([...allowed, next]);
    }
    if (allowed.includes(tab) || tab === next) {
      settab(tab);
    }
  }

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
          onClick={() => handletab(1)}
          className={`flex-grow py-4 cursor-pointer hover:text-black   ${
            tab === 1 ? active : passive
          }`}
        >
          <span className="mx-5">01</span> Main info
        </div>
        <div
          onClick={() => handletab(2)}
          className={`flex-grow py-4 cursor-pointer hover:text-black ${
            tab === 2 ? active : passive
          }`}
        >
          <span className="mx-5">02</span> Tracks
        </div>
        <div
          onClick={() => handletab(3)}
          className={`flex-grow py-4 pl-6 hover:text-black cursor-pointer ${
            tab === 3 ? active : passive
          }`}
        >
          <span className="mx-5">03</span> Stores
        </div>
        <div
          onClick={() => handletab(4)}
          className={`flex-grow py-4 pl-6 hover:text-black cursor-pointer ${
            tab === 4 ? active : passive
          }`}
        >
          <span className="mx-5">04</span> Review & save
        </div>
      </div>
      {tab === 1 ? (
        <MainInfo nextab={handletab} albumid={id} setalbumid={setid} />
      ) : null}
      {tab === 2 ? <NewTracks nextab={handletab} albumid={id} /> : null}
      {tab === 3 ? <Stores nextab={handletab} albumid={id} /> : null}
      {tab === 4 ? <ReviewandSave albumid={id} setid={setid} /> : null}

      <div
        className="hidden fixed top-0 left-0 z-40 w-screen h-screen bg-transparent-back items-center justify-center"
        id="approved"
      >
        <div className=" h-80 w-96 bg-white flex p-6 text-center items-center justify-center flex-col shadow-lg rounded">
          <i className="fas fa-check text-green-500 fa-7x p-2"></i>

          <p className="text-2xl ">
            Your release has been created and waiting for approval.
          </p>
          <button
            onClick={goback}
            className="my-2 h-10 w-28 text-white bg-gradient-to-t focus:outline-none from-blue-400 to-blue-500 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewRelease;
