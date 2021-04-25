import React, { useState } from "react";
import KeyArtist from "./KeyArtist";

function ArtistComponent({ somefun, album }) {
  const [keyartist, setkeyartist] = useState(0);
  const [person, setperson] = useState([]);

  function getartist(secondaryartist) {
    if (album?.info) {
      return;
    }
    setperson([...person, secondaryartist]);
    somefun({ ...album, artist: [...person, secondaryartist] });
  }

  return (
    <div className="lg:p-10 p-2 bg-white my-10">
      <p className="px-5 text-xl border-b py-3 mb-5">Artist</p>
      <p className="px-5 text-md">Is this a compilation of various artists?</p>
      <div className="px-5 py-3  flex items-center w-40 justify-between">
        <label>
          <input type="radio" name="compilation" />
          Yes
        </label>
        <label>
          <input type="radio" name="compilation" />
          No
        </label>
      </div>
      <p className="px-5 text-sm font-bold">
        Artist(s) – indicate ONLY ONE per field
      </p>
      <select
        type="text"
        placeholder="Artist Name"
        defaultValue={album.primaryArtist}
        disabled={album.info ? true : false}
        onChange={(e) => {
          somefun({
            ...album,
            primaryArtist: e.target.value,
          });
        }}
        className="h-12 mx-5 px-5 mt-2 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
      >
        <option value=""></option>
      </select>
      {Array.from(Array(keyartist)).map((data, index) => (
        <KeyArtist
          close={setkeyartist}
          keyartist={keyartist}
          key={index}
          addArtist={getartist}
        />
      ))}

      <button
        onClick={() => (album?.artist ? null : setkeyartist(keyartist + 1))}
        className="text-purple-900 py-3 focus:outline-none mx-5"
      >
        <i className="fas fa-plus"></i> add other key artist.
      </button>
    </div>
  );
}

export default ArtistComponent;
