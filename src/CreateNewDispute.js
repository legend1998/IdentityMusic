import React, { useState } from "react";
import { firedb } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";
import AWN from "awesome-notifications";
import { useHistory } from "react-router";

function CreateNewDispute() {
  const [{ user }] = useStateValue();
  const history = useHistory();

  const [dispute, setdispute] = useState({
    createdAt: Date.now(),
    user: user.email,
  });

  function createDispute() {
    if (!dispute?.youtubeLink) return;
    firedb
      .collection("dispute")
      .add(dispute)
      .then(() => {
        new AWN().success("success");
        history.replace("/panel/dispute");
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }

  return (
    <div className="h-screen overflow-y-auto bg-background">
      <div className="w-full bg-white h-24  flex items-center justify-between shadow-sm">
        <h1 className="text-4xl  ml-12 font-medium ">Dispute</h1>
      </div>
      <div className="p-5 lg:m-10 m-5">
        <div className=" my-8 p-5 bg-white">
          <p className=" font-normal">Youtube Video Link</p>
          <input
            type="link"
            onChange={(e) =>
              setdispute({ ...dispute, youtubeLink: e.target.value })
            }
            placeholder="Youtube Video Link"
            className=" appearance-none focus:outline-none bg-box border border-box h-14 my-5 w-full px-5"
          />
          <br />
          <p className=" font-normal">Comments</p>
          <textarea
            name="comments"
            onChange={(e) =>
              setdispute({ ...dispute, comments: e.target.value })
            }
            placeholder="For example: ISRC: UKU932110000 Please remove claim from this video"
            className={
              " w-full h-64 focus:outline-none p-5 bg-box border border-box mt-2  text-sm"
            }
          ></textarea>
          <button
            onClick={() => createDispute()}
            className=" appearance-none focus:outline-none h-12 w-52 mt-6 bg-indigo-600 text-white"
          >
            Create Dispute
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewDispute;
