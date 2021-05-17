import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { firedb } from "./firebaseconfig";

function ArtistInfo({ artist, setartist, disabled }) {
  const [show, setshow] = useState(false);
  const [lables, setlabels] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (disabled) return;
    firedb.collection("label").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        if (snap.data().user === user.email) a.push(snap.data());
      });

      setlabels(a);
    });
  }, [disabled, user.email]);

  return (
    <div className="lg:my-4 lg:mx-10 p-5 bg-white">
      <h2 className=" py-10 mb-5 border-b text-xl font-semibold">Info</h2>
      <div className="">
        <p className="text-lg my-3 font-semibold">
          Official artist/band name <span className="text-red-500 px-1">*</span>
        </p>
        <input
          type="text"
          disabled={disabled}
          defaultValue={artist?.name}
          onChange={(e) => setartist({ ...artist, name: e.target.value })}
          placeholder="Written exactly as you want it to appear everywhere."
          className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Biography</p>
        <textarea
          type="text"
          disabled={disabled}
          defaultValue={artist?.biography}
          onChange={(e) => setartist({ ...artist, biography: e.target.value })}
          placeholder="Written exactly as you want it to appear everywhere."
          className=" px-5 w-full bg-gray-50 appearance-none h-36 outline-none border focus:border-purple-700"
        />
      </div>
      <div className="">
        <p className="text-lg my-3 font-semibold">Location</p>
        <input
          type="text"
          onChange={(e) => setartist({ ...artist, locaiton: e.target.value })}
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
          {disabled ? (
            <input
              type="text"
              disabled
              defaultValue={artist?.label}
              placeholder="No label present"
              className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
            />
          ) : (
            <select
              type="text"
              disabled={disabled}
              defaultValue={artist?.label}
              onChange={(e) => setartist({ ...artist, label: e.target.value })}
              placeholder="Fans like to know! Can be country or city"
              className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
            >
              {lables.map((label, index) => (
                <option value={label.label} key={index}>
                  {label.label}
                </option>
              ))}
              <option value="none">--select--</option>
            </select>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default ArtistInfo;
