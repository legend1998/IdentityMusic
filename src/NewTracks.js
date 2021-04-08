import React, { useState } from "react";
import TrackInfo from "./TrackInfo";

function NewTracks() {
  const [tracks, settracks] = useState(0);

  const handletracks = () => {
    settracks(tracks + 1);
  };
  return (
    <div className="lg:p-10 p-2 bg-gray-100 min-h-screen">
      {Array.from(Array(tracks)).map((data, index) => (
        <TrackInfo track={tracks} close={settracks} key={index} index={index} />
      ))}

      <button
        onClick={handletracks}
        className="w-full text-white h-14 rounded hover:bg-indigo-800 bg-indigo-700 focus:outline-none"
      >
        <i className="fas fa-plus"></i> Upload new track
      </button>
    </div>
  );
}

export default NewTracks;
