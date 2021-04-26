import React, { useState } from "react";
import { firedb } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import AWN from "awesome-notifications";
import { useHistory } from "react-router";

function CreateNewDispute() {
  const [dispute, setdispute] = useState({
    createdAt: Date.now(),
  });
  const [{ user }] = useStateValue();
  const history = useHistory();

  function createDispute() {
    if (!dispute?.youtubeLink) return;
    firedb
      .collection("user")
      .doc(user.email)
      .update({
        disputes: firebase.firestore.FieldValue.arrayUnion(dispute),
      })
      .then(() => {
        new AWN().success("success");
        history.replace("/panel/dispute");
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }

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
            type="link"
            onChange={(e) =>
              setdispute({ ...dispute, youtubeLink: e.target.value })
            }
            placeholder="paste youtube link here"
            className=" appearance-none focus:outline-none bg-gray-100 border h-12 my-5 w-full px-5"
          />
          <br />
          <p className=" font-normal">Comments</p>
          <textarea
            name="comments"
            onChange={(e) =>
              setdispute({ ...dispute, comments: e.target.value })
            }
            placeholder="any comments"
            className={
              "border w-full h-64 focus:outline-none p-5 bg-gray-50 text-sm"
            }
          ></textarea>
          <button
            onClick={() => createDispute()}
            className=" appearance-none focus:outline-none h-12 w-52 bg-indigo-600 text-white"
          >
            Create Dispute
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewDispute;
