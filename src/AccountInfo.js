import React, { useRef, useState } from "react";
import { useStateValue } from "./StateProvider";
import { firedb, storage } from "./firebaseconfig";
import AWN from "awesome-notifications";

function AccountInfo() {
  const [{ user }, dispatch] = useStateValue();
  const [accountInfo, setaccount] = useState({});
  const [disable, setdisable] = useState(true);
  let labelname = useRef();

  function handleLabelSave() {
    if (labelname.current.value === "") {
      return;
    }
    if (!user?.labelName) {
      firedb
        .collection("user")
        .doc(user.email)
        .update({
          labelName: labelname.current.value,
        })
        .then((u) => {
          firedb
            .collection("user")
            .doc(user.email)
            .get()
            .then((u) => {
              dispatch({
                type: "SET_USER",
                user: u.data(),
              });
              new AWN().success("success");
            })
            .catch((e) => {
              new AWN().alert("something went wrong relogin to solve this.");
            });
        })
        .catch((e) => {
          new AWN().alert(e.message);
        });
    }
  }

  const imageupload = (e) => {
    var image = e.target.files[0];
    if (!image) {
      new AWN().alert("no image file selected", { position: "bottom-right" });
      return;
    }
    var storageRef = storage.ref();
    storageRef
      .child(`profile/${image.name + Date.now()}`)
      .put(image)
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then(function (downloadURL) {
            setaccount({ ...accountInfo, coverImage: downloadURL });
          })
          .catch((err) => {
            new AWN().alert(e.message, { position: "bottom-right" });
          });
      });
  };

  function handleInfo() {
    return;
  }

  return (
    <div className="p-5 lg:m-10 m-5">
      <div className=" my-8 p-5 bg-white">
        <p className=" font-normal">
          Label/White-Label Name <span className="text-red-800">*</span>
          <span className="text-gray-500 text-sm">(one time only)</span>
        </p>
        <input
          type="text"
          defaultValue={user?.labelName}
          disabled={user?.labelName ? true : false}
          ref={labelname}
          className="appearance-none focus:outline-none bg-gray-100  h-12 my-5 w-full px-5 border  
           "
        />
        <br />
        {user?.labelName ? null : (
          <button
            onClick={() => handleLabelSave()}
            className=" appearance-none focus:outline-none h-12 w-52 bg-indigo-600 text-white"
          >
            save
          </button>
        )}
      </div>
      <div className="bg-white p-5">
        <h1 className="lg:py-8 py-5 px-5 border-b text-2xl font-normal">
          Account Info
        </h1>

        <div className="grid md:grid-cols-3 grid-cols-3">
          <div className=" col lg:p-10 flex justify-center p-5 ">
            {!user?.coverImage ? (
              <div className=" w-64 h-64">
                <label htmlFor="file-for">
                  <div className="border rounded text-center w-64 h-64 flex justify-center items-center bg-gray-50">
                    <i className="fas fa-plus"></i>
                  </div>
                </label>
                <input
                  type="file"
                  disabled={disable}
                  accept="image/*"
                  id="file-for"
                  className="hidden"
                  onChange={(e) => imageupload(e)}
                />
                <p className="text-xs text-center text-gray-400">
                  Upload your image file here
                </p>
              </div>
            ) : (
              <div className=" w-64 h-64 overflow-hidden">
                <img src={user?.coverImage} alt="" className="h-64" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-start p-5">
            <p className=" font-normal">First Name</p>
            <input
              type="text"
              disabled={disable}
              defaultValue={user?.fname}
              className={`appearance-none focus:outline-none bg-gray-100  h-12 my-5 w-full px-5 ${
                disable ? "border" : "border-2 border-blue-300 "
              } `}
            />
            <p className=" font-normal">Email</p>
            <input
              type="text"
              disabled={disable}
              defaultValue={user?.email}
              className={`appearance-none focus:outline-none bg-gray-100  h-12 my-5 w-full px-5 ${
                disable ? "border" : "border-2 border-blue-300 "
              } `}
            />
          </div>
          <div className="flex flex-col justify-start p-5">
            <p className=" font-normal">Last Name</p>
            <input
              type="text"
              disabled={disable}
              defaultValue={user?.lname}
              className={`appearance-none focus:outline-none bg-gray-100  h-12 my-5 w-full px-5 ${
                disable ? "border" : "border-2 border-blue-300 "
              } `}
            />
            <p className=" font-normal">Password</p>
            <input
              disabled={disable}
              type="password"
              className={`appearance-none focus:outline-none bg-gray-100  h-12 my-5 w-full px-5 ${
                disable ? "border" : "border-2 border-blue-300 "
              } `}
            />
          </div>
        </div>

        <div className="flex justify-end items-center px-5">
          <button
            onClick={() => setdisable(true)}
            className=" appearance-none focus:outline-none h-12 w-52 bg-transparent text-gray-600"
          >
            cancel
          </button>
          {disable ? (
            <button
              onClick={() => setdisable(false)}
              className=" appearance-none focus:outline-none h-12 w-52 bg-indigo-600 text-white"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => handleInfo()}
              className=" appearance-none focus:outline-none h-12 w-52 bg-indigo-600 text-white"
            >
              save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
