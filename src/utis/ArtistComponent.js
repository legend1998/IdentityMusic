import React, { useEffect, useState } from "react";
import { firedb } from "../firebaseconfig";
import KeyArtist from "./KeyArtist";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";

function ArtistComponent({ somefun, album }) {
  const [keyartist, setkeyartist] = useState(0);
  const [person, setperson] = useState([]);
  const [artist, setartist] = useState([]);
  const [{ user }] = useStateValue();

  console.log(album);

  useEffect(() => {
    firedb.collection("artist").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        if (snap.data().user === user.email) {
          a.push(snap.data());
        }
      });
      setartist(a);
    });
  }, [user.email]);

  function getartist(secondaryartist) {
    if (album?.info) {
      return;
    }
    setperson([...person, secondaryartist]);
    somefun({ ...album, artist: [...person, secondaryartist] });
  }

  return (
    <div className="lg:p-10 p-2 bg-white my-10">
      <p className="px-5 text-2xl border-b py-3 mb-5">Artist</p>
      <p className="px-5 font-medium text-lg">
        Is this a compilation of various artists ?
      </p>
      <div className="px-5 py-1  flex items-center w-40 justify-between">
        <label>
          <input
            onChange={(e) => {
              somefun({
                ...album,
                compilation: "yes",
              });
            }}
            type="radio"
            name="compilation"
          />
          Yes
        </label>
        <label>
          <input
            onChange={(e) => {
              somefun({
                ...album,
                compilation: "no",
              });
            }}
            type="radio"
            name="compilation"
          />
          No
        </label>
      </div>
      <p className="px-5 pt-5 text-lg font-medium">
        Artist(s) – indicate ONLY ONE per field
      </p>
      {artist.length === 0 ? (
        <Link
          to="/panel/add_new_artist"
          className="p-2 w-44 bg-blue-500 text-white focus:outline-none hover:bg-blue-700 cursor-pointer"
        >
          Add new Artist
        </Link>
      ) : (
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
          className="h-14 mx-5 px-5 mt-2 pr-10 w-full text-lg bg-box appearance-none outline-none  focus:border-purple-700"
        >
          <option value="default" defaultChecked>
            --Select--
          </option>
          {artist.map((art, index) => (
            <option value={art.name} key={index}>
              {art.name}
            </option>
          ))}
        </select>
      )}
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
        className="text-indigo-500 py-3 focus:outline-none mx-5"
      >
        <i className="fas fa-plus mr-3"></i> Add other key artist.
      </button>
    </div>
  );
}

export default ArtistComponent;
