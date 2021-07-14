import React, { useEffect, useState } from "react";
import Language from "./utis/Language";
import Title from "./utis/Title";
import ArtistComponent from "./utis/ArtistComponent";
import ReleaseInfo from "./utis/ReleaseInfo";
import { firedb, storage } from "./firebaseconfig";
import AWN from "awesome-notifications";
import { useStateValue } from "./StateProvider";

function MainInfo({ nextab, albumid, setalbumid }) {
  //stats
  const [{ user }] = useStateValue();

  const [album, setalbum] = useState({
    email: user.email,
  });

  //hooks

  useEffect(() => {
    if (albumid) {
      firedb
        .collection("album")
        .doc(albumid)
        .get()
        .then((res) => {
          setalbum(res.data());
        });
    }
  }, [albumid]);
  // objects

  //refs
  //functions

  const getLangugae = (lang) => {
    setalbum({ ...album, language: lang });
  };

  const imageupload = (e) => {
    var image = e.target.files[0];
    if (!image) {
      new AWN().alert("no image file selected", { position: "bottom-right" });
      return;
    }
    var storageRef = storage.ref();
    storageRef
      .child(`thumbnail/${Date.now() + user.labelName + " - " + image.name}`)
      .put(image)
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then(function (downloadURL) {
            setalbum({ ...album, coverImage: downloadURL });
          })
          .catch((err) => {
            new AWN().alert(e.message, { position: "bottom-right" });
          });
      });
  };

  function createRelase() {
    if (album?.info) {
      new AWN().info("submitted", { position: "bottom-right" });
      nextab(2, 2);
      return;
    }
    if (Object.keys(album).length < 4) {
      new AWN().alert("fill all details ", { position: "bottom-right" });
      return;
    }
    firedb
      .collection("album")
      .add({ ...album, info: true })
      .then((res) => {
        setalbumid(res.id);
        new AWN().success("successfully written", { position: "bottom-right" });
        nextab(2, 2);
      })
      .catch((e) => {
        new AWN().alert(e.message, { position: "bottom-right" });
      });
  }

  return (
    <div className="lg:p-10 p-2 bg-background">
      <div className="bg-white ">
        <p className="px-5 text-2xl border-b  py-5 mx-8 font-normal text-black">
          Cover Art
        </p>

        <div className="grid grid-cols-3">
          <div className=" col lg:p-10 flex justify-center ">
            {!album.coverImage ? (
              <div className=" ">
                <label htmlFor="file-for">
                  <div className=" text-center w-80 h-80  justify-center items-center cursor-pointer bg-box">
                    <i className="fas fa-plus mt-32 fa-blue  text-lg"></i>

                    <p className="text-sm text-center font-normal text-sidetext pt-32">
                      Click here to Upload Album Artwork
                    </p>
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
              <div className=" w-72 h-72 overflow-hidden">
                <img src={album.coverImage} alt="" className="h-72" />
              </div>
            )}
          </div>
          <div className=" col-span-2  flex flex-col justify-start">
            <h5 className="text-sm text-black font-semibold lg:p-3">
              Please follow these rules so your release isn't rejected by the
              stores & services.
            </h5>
            <ul className="pl-10 list-disc text-base pb-10 pr-5">
              <li>File format: JPG or JPEG</li>
              <li>Color space: RGB</li>
              <li>
                Minimum dimensions: 1400x1400 pixels, but recommend 3000x3000
                pixels.
              </li>
              <li>Square image: width and height must be the same.</li>
              <li>
                Images may not contain more than 50 megapixels or be larger than
                10 Mb.
              </li>
              <li>
                Your image cannot be stretched, upscaled, or appear to be
                low-resolution.
              </li>
              <li>
                The information on your cover art must match your album title
                and artist name.
              </li>
              <li>
                Website addresses, social media links and contact information
                are not permitted on album artwork.
              </li>
              <li>Your cover art may not include sexually explicit imagery.</li>
              <li>
                Your cover art cannot be misleading by figuring another artist's
                name more prominently than yours.
              </li>
              <li>
                You may not use a third-party logo or trademark without the
                express written permission from the trademark holder.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Language somefun={getLangugae} language={album} />
      <Title somefun={setalbum} album={album} />
      <ArtistComponent somefun={setalbum} album={album} />
      <ReleaseInfo somefun={setalbum} album={album} />

      <div className=" flex items-center justify-between bg-black h-14 text-gray-200 bottom-0  w-full">
        <button className=" h-full  focus:outline-none w-full">Cancel</button>
        <button
          className="w-52 h-full bg-blue-800 focus:outline-none hover:bg-blue-900"
          onClick={() => createRelase()}
        >
          Next
          <i className="fas fa-arrow-right mx-3"></i>
        </button>
      </div>
    </div>
  );
}

export default MainInfo;
