import React, { useEffect, useState } from "react";
import OverViewAlbum from "./OverViewAlbum";
import VIewTrackAlbum from "./VIewTrackAlbum";
import ViewAlbumStats from "./ViewAlbumStats";
import ViewAlbumMore from "./ViewAlbumMore";
import { useParams } from "react-router";
import { firedb } from "./firebaseconfig";
import AWN from "awesome-notifications";

function Viewalbum() {
  const params = useParams();
  const [show, setshow] = useState(false);
  const [tab, setab] = useState(1);
  const [album, setalbum] = useState(null);

  useEffect(() => {
    firedb
      .collection("album")
      .doc(params.id)
      .get()
      .then((res) => {
        setalbum(res.data());
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }, [params.id]);

  const passive =
    "text-gray-500 bg-gray-200 w-1/4 text-center h-16 py-5 cursor-pointer";
  const active =
    "border-b  border-indigo-500 bg-white w-1/4 text-center py-5 h-16 cursor-pointer";
  return (
    <div>
      {/* header */}
      {album ? (
        <div className="flex px-3 py-8 flex-wrap">
          <div className="w-20 text-center">
            <i className="fas fa-arrow-left fa-2x py-5"></i>
          </div>
          <div className="flex-1 flex min-w-max">
            <img src={album?.coverImage} width="180px" alt="" />
            <div className="px-5 w-full">
              <div className="flex items-center justify-center">
                <h2 className=" flex-1 text-3xl font-bold py-5 border-b">
                  {album.title}
                </h2>
                <span className="bg-red-500 text-white p-3 shadow-lg">
                  {album?.status ? album.status : "pending"}
                </span>
              </div>
              <p className="">{album.primaryArtist}</p>
              <p className="">Released at {album.releaseDate}</p>
              <p className="">UPC {album.upcEan}</p>
            </div>
          </div>
          {/* action */}
          <div className="py-3">
            <button
              onClick={() => setshow(!show)}
              className="bg-blue-700 hover:bg-blue-800 w-64 h-12 focus:outline-none text-white"
            >
              Actions &#x2304;
            </button>
            {show ? (
              <ul className="absolute bg-white w-64 rounded text-sm text-center border ">
                <li className="h-10 border-b p-2 hover:bg-gray-300">
                  download Audio
                </li>
                <li className="h-10 border-b p-2 hover:bg-gray-300">
                  Download Artwork
                </li>
                <li className="h-10 border-b p-2 hover:bg-gray-300">
                  Export as csv
                </li>
                <li className="h-10 border-b p-2 hover:bg-gray-300">
                  Export as xlsx
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      ) : (
        <div class="w-full flex items-center justify-center h-44">
          <i className="fas fa-spinner"></i>
        </div>
      )}
      {/* tab */}
      <div className="flex border">
        <span className={tab === 1 ? active : passive} onClick={() => setab(1)}>
          Overview
        </span>
        <span className={tab === 2 ? active : passive} onClick={() => setab(2)}>
          Tracks
        </span>
        <span className={tab === 3 ? active : passive} onClick={() => setab(3)}>
          Stats
        </span>
        <span className={tab === 4 ? active : passive} onClick={() => setab(4)}>
          More
        </span>
      </div>
      {/* body */}
      <div className="bg-gray-100 min-h-screen p-10">
        {tab === 1 ? <OverViewAlbum data={album} /> : null}
        {tab === 2 ? <VIewTrackAlbum id={params.id} /> : null}
        {tab === 3 ? <ViewAlbumStats stats={album?.stats} /> : null}
        {tab === 4 ? <ViewAlbumMore codes={album?.codes} /> : null}
      </div>
    </div>
  );
}

export default Viewalbum;
