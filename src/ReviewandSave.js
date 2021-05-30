import AWN from "awesome-notifications";
import React, { useEffect, useState } from "react";
import { firedb } from "./firebaseconfig";
import { useHistory } from "react-router-dom";

function ReviewandSave({ albumid, setid }) {
  const [album, setalbum] = useState({});
  const [tracks, setracks] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (albumid) {
      firedb
        .collection("album")
        .doc(albumid)
        .get()
        .then((res) => {
          setalbum(res.data());
        });
      firedb
        .collection("album")
        .doc(albumid)
        .collection("tracks")
        .onSnapshot((snapshot) => {
          var a = [];
          snapshot.forEach((snap) => {
            a.push(snap.data());
          });
          setracks(a);
        });
    }
  }, []);

  function approveALbum() {
    let notifier = new AWN();
    let onOk = () => {
      firedb
        .collection("album")
        .doc(albumid)
        .update({ finalSubmit: true })
        .then(() => {
          setid(null);
          notifier.info("submitted successfully");
          history.replace("/panel/assets");
        })
        .catch((e) => {
          notifier.alert(e.message);
        });
    };
    let onCancel = () => {
      notifier.info("You pressed Cancel");
    };
    notifier.confirm(
      "You are going to approve this album finally. Is the Given Information correct?",
      onOk,
      onCancel,
      {
        labels: {
          confirm: "Final Submission",
        },
      }
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gray-200">
      <div className="my-8 h-12 bg-limegreen py-2 px-7    text-white w-full">
        <p>Review and approve the information you entered is correct.</p>
      </div>
      <div className="bg-white p-6">
        <div className="grid grid-cols-4 gap-8">
          <div className="">
            <img className="h-full w-full" src={album?.coverImage} alt="" />
          </div>
          <div className=" col-span-3 text-md">
            <h1 className="font-semibold text-xl">{album?.title}</h1>
            <h4 className="font-medium italic text-md mb-5">
              by {album?.primaryArtist}
            </h4>

            <p className="mt-5">
              Genre(S): {album?.genre1}, {album?.genre2}
            </p>
            <p className="">Label: {album?.recordLabel}</p>
            <p className="">(P): {album?.pCopyright} </p>
            <p className="">(C): {album?.Ccopyright}</p>
          </div>
        </div>
      </div>
      <div className="my-8 p-2 lg:p-8 bg-white">
        <p className="text-xl font border-b py-5">Tracks</p>
        {tracks.map((track, index) => (
          <div key={index} className="flex border-b my-3">
            <div className="my-4 mr-7 text-lg font-semibold">{index + 1}.</div>
            <div className="my-4">
              <h1 className="font-semibold text-xl">{track?.releaseTitle}</h1>
              <h4 className="font-medium italic text-md mb-5">
                by {track?.mainArtist}
              </h4>

              <p className="mt-5">Language: {track?.lyricLanguage}</p>
              <p className="">ISRC: {track?.isrc}</p>
              <p className="">CRBT Time: {track?.crbt} </p>
              <p className="">Lyrics: {track?.lyrics}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex items-center justify-between bg-black h-14 text-gray-200 bottom-0  w-full">
        <button className=" h-full w-52 bg-gray-600 focus:outline-none hover:bg-gray-700">
          <i className="fas fa-arrow-left mx-3"></i> Back
        </button>
        <button className=" h-full  focus:outline-none w-full">Cancel</button>
        <button
          className="w-52 h-full bg-blue-800 focus:outline-none hover:bg-blue-900"
          onClick={() => approveALbum()}
        >
          Approve
          <i className="fas fa-arrow-right mx-3"></i>
        </button>
      </div>
    </div>
  );
}

export default ReviewandSave;
