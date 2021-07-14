import React, { useEffect, useState } from "react";
import { firedb } from "./firebaseconfig";
import ReactAudioPlayer from "react-audio-player";

function VIewTrackAlbum({ id }) {
  const [tracks, setracks] = useState([]);
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    firedb
      .collection("album")
      .doc(id)
      .collection("tracks")
      .onSnapshot((trackshot) => {
        var a = [];
        trackshot.forEach((snaptrack) => {
          a.push(snaptrack.data());
          console.log(snaptrack.data());
        });
        setracks(a);
      });
  }, []);
  return (
    <div className="bg-white ">
      <table className="table-fixed text-black w-full h-full">
        <thead className="text-left">
          <tr className="h-12 border-b">
            <th className=" w-2/12 pl-10 font-medium ">Track Name</th>
            <th className="w-2/12 pl-5 font-medium ">Artist</th>
            <th className=" w-2/12 font-medium ">ISRC</th>
            <th className=" w-1/12 text-left font-medium ">Explicit</th>
            <th className="w-1/12 text-left pl-4 font-medium ">Language</th>
            <th className="w-4/12 text-center font-medium ">Audio</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((t) => (
            <tr className="h-20 text-lg font-regular text-filter hover:bg-gray-50 border-b cursor-pointer">
              <td className=" w-2/12 pl-10 ">{t.releaseTitle}</td>
              <td className=" w-2/12 pl-5">{t.mainArtist}</td>
              <td className=" w-2/12">{t.isrc}</td>
              <td className=" w-1/12 text-left capitalize">{t.explicit}</td>
              <td className=" w-1/12 text-left pl-4">{t.lyricLanguage}</td>
              <td className=" w-4/12 pl-5 text-left">
                <audio src={t.trackURL} className="w-full" controls></audio>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VIewTrackAlbum;
