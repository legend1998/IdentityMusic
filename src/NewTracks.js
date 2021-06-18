import React, { useEffect, useState } from "react";
import { firedb } from "./firebaseconfig";
import TrackInfo from "./TrackInfo";
import { useStateValue } from "./StateProvider";

function NewTracks({ nextab, albumid }) {
  const [tracks, settracks] = useState(0);
  const [artist, setartist] = useState([]);
  const [trackData, seTtrackData] = useState([]);
  const [{ user }] = useStateValue();

  //hooks

  useEffect(() => {
    firedb
      .collection("album")
      .doc(albumid)
      .collection("tracks")
      .onSnapshot((snapshot) => {
        var a = [];
        snapshot.forEach((snap) => {
          a.push(snap.data());
        });
        settracks(a.length);
        seTtrackData(a);
      });
    firedb.collection("artist").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        if (snap.data().user === user.email) {
          a.push(snap.data());
        }
      });
      setartist(a);
    });
  }, []);
  console.log(tracks);
  const handletracks = () => {
    settracks(tracks + 1);
  };
  return (
    <div className=" lg:p-10 p-2 bg-background min-h-screen border border-red-800">
      <div className="my-4 min-h-0">
        {Array.from(Array(tracks)).map((data, index) => (
          <TrackInfo
            track={tracks}
            data={trackData[index] ? trackData[index] : null}
            close={settracks}
            key={index}
            index={index}
            albumid={albumid}
            artist={artist}
          />
        ))}

        <button
          onClick={handletracks}
          className="w-full text-white h-14  hover:bg-indigo-800 bg-indigo-700 focus:outline-none"
        >
          <i className="fas fa-plus"></i> Upload new track
        </button>
      </div>
      <div className=" flex items-center justify-between bg-black h-14 text-gray-200 bottom-0  w-full">
        <button className=" h-full w-52 bg-gray-600 focus:outline-none hover:bg-gray-700">
          <i className="fas fa-arrow-left mx-3"></i> Back
        </button>
        <button className=" h-full  focus:outline-none w-full">Cancel</button>
        <button
          className="w-52 h-full bg-blue-800 focus:outline-none hover:bg-blue-900"
          onClick={() => nextab(3, 3)}
        >
          Next
          <i className="fas fa-arrow-right mx-3"></i>
        </button>
      </div>
    </div>
  );
}

export default NewTracks;
