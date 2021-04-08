import React, { useState } from "react";

function ArtistInfo() {
  const [show, setshow] = useState(false);

  return (
    <div className="lg:my-4 lg:mx-10 p-5 bg-white">
      <h2 className=" py-10 mb-5 border-b text-xl font-semibold">Info</h2>
      <div className="">
        <p className="text-lg my-3 font-semibold">Official artist/band name</p>
        <input
          type="text"
          placeholder="Written exactly as you want it to appear everywhere."
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Biography</p>
        <textarea
          type="text"
          placeholder="Written exactly as you want it to appear everywhere."
          className=" px-5 w-full bg-gray-50 appearance-none h-36 outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Location</p>
        <input
          type="text"
          placeholder="Fans like to know! Can be country or city"
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Sign to Label</p>
        <label htmlFor="">
          <input
            type="radio"
            name="signedlabel"
            className="mx-2"
            onClick={() => setshow(false)}
          />
          No
        </label>
        <label htmlFor="" className="ml-10">
          <input
            type="radio"
            name="signedlabel"
            className="mx-2"
            onClick={() => setshow(true)}
          />
          Yes
        </label>
      </div>
      {show ? (
        <div className="">
          <select
            type="text"
            placeholder="Fans like to know! Can be country or city"
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          >
            <option value="default" defaultValue>
              --select--
            </option>
          </select>
        </div>
      ) : null}
    </div>
  );
}

export default ArtistInfo;
