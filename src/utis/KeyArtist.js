import React, { useRef, useState } from "react";
import validateRefs from "./Utils";

function KeyArtist({ close, keyartist, addArtist }) {
  const [artists, setArtists] = useState({});
  const [disable, setdisable] = useState(false);

  async function pushArtist() {
    if (artists?.artistname === "") {
      return;
    }
    if (!disable) {
      addArtist(artists);
      setdisable(true);
    }
  }

  function handleclose() {
    if (!disable) close(keyartist - 1);
  }

  return (
    <div className="flex items-center justify-start m-5">
      <select
        name="artisttype"
        disabled={disable}
        className="h-12 w-52 text-center border focus:outline-none"
        onChange={(e) => setArtists({ ...artists, type: e.target.value })}
      >
        <option value="default" defaultValue>
          --select--
        </option>
        <option value="composer">Composer</option>
        <option value="lyricist">Lyricist</option>
        <option value="producer">Producer</option>
        <option value="producer">Secondary Artist</option>
      </select>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setArtists({ ...artists, artistname: e.target.value })}
        disabled={disable}
        className="h-12 w-full pl-5 bg-gray-50 appearance-none outline-none border focus:border-purple-700"
      />
      <span
        className="mx-3 text-green-400 cursor-pointer"
        onClick={() => pushArtist()}
        disabled={disable}
      >
        <i className="fas fa-check"></i>
      </span>
      <span
        className="mx-3 text-red-400 cursor-pointer"
        disabled={disable}
        onClick={() => handleclose()}
      >
        <i className="fas fa-times"></i>
      </span>
    </div>
  );
}

export default KeyArtist;
