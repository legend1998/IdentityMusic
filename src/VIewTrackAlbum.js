import React, { useEffect, useState } from "react";
import { firedb } from "./firebaseconfig";

function VIewTrackAlbum({ id }) {
  const [tracks, setracks] = useState([]);

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
    <div className="bg-white font-Graphik">
      <table className="table-fixed text-gray-700 w-full h-full">
        <thead className="text-left">
          <tr className="h-12 border-b">
            <th className=" w-2/12 pl-10 font-medium ">Track Name</th>
            <th className="w-2/12 pl-5 font-medium ">Artist</th>
            <th className=" w-2/12 font-medium ">ISRC</th>
            <th className=" w-1/12 text-center font-medium ">CRBT Time</th>
            <th className="w-2/12 text-center font-medium ">Language</th>
            <th className="w-3/12 text-center font-medium ">Audio</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((t) => (
            <tr className="h-20 text-lg font-regular hover:bg-gray-50 border-b cursor-pointer">
              <td className=" w-2/12 pl-10 ">{t.releaseTitle}</td>
              <td className=" w-2/12 pl-5">{t.mainArtist}</td>
              <td className=" w-2/12">{t.isrc}</td>
              <td className=" w-1/12 text-center">{t.crbt}</td>
              <td className=" w-2/12 text-center">{t.lyricLanguage}</td>
              <td className=" w-3/12 ">
                <audio src={t.trackURL} controls></audio>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VIewTrackAlbum;
