import React, { useEffect, useState } from "react";
import LabelInfo from "./LabelInfo";
import AWN from "awesome-notifications";
import { firedb, storage } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

function AddLabel() {
  const [label, setlabel] = useState({});
  const [disabled, setdisabled] = useState(false);
  const [{ user }] = useStateValue();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      firedb
        .collection("label")
        .doc(params.id)
        .get()
        .then((res) => {
          setlabel(res.data());
          setdisabled(true);
        })
        .catch((e) => {
          new AWN().alert(e.messge);
        });
    }
  }, [params.id]);

  const imageupload = (e) => {
    var image = e.target.files[0];
    if (!image) {
      new AWN().alert("no image file selected", { position: "bottom-right" });
      return;
    }
    var storageRef = storage.ref();
    storageRef
      .child(`thumbnail/${image.name + Date.now()}`)
      .put(image)
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then(function (downloadURL) {
            setlabel({ ...label, coverImage: downloadURL });
          })
          .catch((err) => {
            new AWN().alert(e.messge);
          });
      });
  };

  function addLabelNow() {
    if (disabled) return;
    if (Object.keys(label).length < 6) {
      new AWN().alert("fill all details");
    }

    firedb
      .collection("label")
      .add({ user: user.email, ...label })
      .then(() => {
        new AWN().success("success");
        history.replace("/panel/labels");
      })
      .catch((e) => {
        new AWN().alert(e.messge);
      });
  }

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
            {!label?.coverImage ? (
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
                  onChange={(e) => imageupload(e)}
                />
                <p className="text-xs text-center text-gray-400">
                  Upload your image file here
                </p>
              </div>
            ) : (
              <div className=" w-64 h-64 overflow-hidden">
                <img src={label?.coverImage} alt="" className="h-64" />
              </div>
            )}
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
      <LabelInfo label={label} setlabel={setlabel} disabled={disabled} />
      <button
        onClick={() => addLabelNow()}
        className="h-14 w-44 text-white text-center focus:outline-none bg-indigo-500 ml-10 hover:bg-indigo-700"
      >
        Add Label
      </button>
    </div>
  );
}

export default AddLabel;
