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
      .child(`profile/${"profile" + image.name}`)
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
        <p className=" font-medium text-lg">
          Account Name <span className="text-red-500">*</span>
        </p>
        <input
          type="text"
          defaultValue={user?.labelName}
          disabled={user?.labelName ? true : false}
          ref={labelname}
          className="appearance-none focus:outline-none bg-box  h-14 my-5 w-full px-5 border border-box 
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
        <h1 className="lg:py-4 py-5 px-5 border-b text-2xl font-normal">
          Account Info
        </h1>

        <div className="grid md:grid-cols-3 grid-cols-3">
          <div className=" col lg:p-10 flex justify-center p-5 ">
            {!user?.coverImage ? (
              <div className=" w-64 h-64">
                <label htmlFor="file-for">
                  <div className="border rounded text-center w-64 h-64 flex justify-center items-center bg-box">
                    <i className="fas fa-plus fa-blue"></i> &nbsp;&nbsp;&nbsp;
                    Add a Photo
                  </div>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="file-for"
                  className="hidden"
                  onChange={(e) => imageupload(e)}
                />
              </div>
            ) : (
              <div className=" w-64 h-64 overflow-hidden">
                <img src={user?.coverImage} alt="" className="h-64" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-start p-5">
            <p className=" font-medium">First Name</p>
            <input
              type="text"
              disabled={disable}
              defaultValue={user?.fname}
              className={`appearance-none focus:outline-none bg-box  h-12 my-5 w-full px-5 ${
                disable ? "border" : "border-2 border-blue-300 "
              } `}
            />
            <p className=" font-medium">Email</p>
            <input
              type="text"
              disabled={disable}
              defaultValue={user?.email}
              className={`appearance-none focus:outline-none bg-box  h-12 my-5 w-full px-5 ${
                disable ? "border" : "border-2 border-blue-300 "
              } `}
            />
          </div>
          <div className="flex flex-col justify-start p-5">
            <p className=" font-medium">Last Name</p>
            <input
              type="text"
              disabled={disable}
              defaultValue={user?.lname}
              className={`appearance-none focus:outline-none bg-box  h-12 my-5 w-full px-5 ${
                disable ? "border" : "border-2 border-blue-300 "
              } `}
            />
            <p className=" font-medium">Password</p>
            <input
              disabled={disable}
              placeholder="************"
              type="password"
              className={`appearance-none focus:outline-none bg-box  h-12 my-5 w-full px-5 ${
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
            Cancel
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
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
