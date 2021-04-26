import React, { useState } from "react";
import Album from "./Album";
import Tracks from "./Tracks";

function Assets() {
  const [tab, settab] = useState(1);

  let active = "border-b-2 border-purple-700 bg-white";
  let passive = "bg-gray-50 text-gray-600 border";

  return (
    <div className="bg-gray-100  h-screen">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10 font-graphik ">
          Music
        </h1>
      </div>
      <div className="flex border flex-wrap items-center h-16 ">
        <div
          onClick={() => settab(1)}
          className={`flex-grow py-5 cursor-pointer hover:text-black   ${
            tab === 1 ? active : passive
          }`}
        >
          <i className="fas fa-record-vinyl mx-5"></i>Albums
        </div>
        <div
          onClick={() => settab(2)}
          className={`flex-grow py-5 cursor-pointer hover:text-black ${
            tab === 2 ? active : passive
          }`}
        >
          <i className="fas fa-music mx-5"></i> Tracks
        </div>
      </div>
      {tab === 1 ? <Album /> : null}
      {tab === 2 ? <Tracks /> : null}
    </div>
  );
}

export default Assets;
