import React, { useEffect, useState } from "react";
import ArtistInfo from "./ArtistInfo";
import { firedb, storage } from "./firebaseconfig";
import AWN from "awesome-notifications";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

function AddNewArtist() {
  const [artist, setArtist] = useState({});
  const [disabled, setdisabled] = useState(false);

  const [{ user }] = useStateValue();
  const history = useHistory();

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      firedb
        .collection("artist")
        .doc(params.id)
        .get()
        .then((res) => {
          setArtist(res.data());
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
            setArtist({ ...artist, coverImage: downloadURL });
          })
          .catch((err) => {
            new AWN().alert(e.message);
          });
      });
  };

  function addnewArtist() {
    if (disabled) return;
    if (artist?.label === "none") {
      new AWN().alert("select label");
      return;
    }
    if (artist?.name === "") {
      new AWN().alert("Name required");
      return;
    }

    firedb
      .collection("artist")
      .add({ user: user.email, ...artist })
      .then((res) => {
        new AWN().success("success");
        history.replace("/panel/artist");
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }

  return (
    <div className="bg-gray-100 pb-10">
      <div className="w-full bg-white h-24 lg:pl-12 pl-5 flex items-center justify-start shadow-sm">
        <button onClick={()=>history.goBack()} className="focus:outline-none appearance-none">
          <i  className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-3xl font-semibold pl-2 font-sans "> 
          {disabled ? "Artist" : "Create New Artist"}
        </h1>
      </div>
      <div className="bg-white lg:m-10">
        <p className="px-5 text-xl border-b py-3 ">Cover Image</p>

        <div className="grid md:grid-cols-3 grid-cols-1">
          <div className=" col lg:p-10 flex justify-center p-5 ">
            {!artist?.coverImage ? (
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
                <img src={artist.coverImage} alt="" className="h-64" />
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
      <ArtistInfo artist={artist} setartist={setArtist} disabled={disabled} />

      <button
        className="h-14 w-44 text-white text-center bg-indigo-500 hover:bg-indigo-700 mx-10"
        onClick={() => addnewArtist()}
      >
        Add new Artist
      </button>
    </div>
  );
}

export default AddNewArtist;
