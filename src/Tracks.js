import React, { useEffect, useState } from "react";
import { firedb } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";

function Tracks() {
  const [show, setshow] = useState(false);
  const [filter, setfilter] = useState(false);
  const [{ user }] = useStateValue();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getTracks();
  }, []);

  async function getTracks() {
    var a = [];
    firedb.collection("album").onSnapshot((snapshot) => {
      snapshot.forEach((snap) => {
        if (snap.data().user === user.email) {
          firedb
            .collection("album")
            .doc(snap.id)
            .collection("tracks")
            .onSnapshot((trackshot) => {
              trackshot.forEach((snaptrack) => {
                a.push(snaptrack.data());
              });
              setTracks(a);
            });
        }
      });
    });
  }

  return (
    <div className="lg:px-12 md:px-1 py-5 ">
      <div className="bg-white">
        <div className="flex h-12 items-center">
          <button
            onClick={() => setfilter(!filter)}
            className={`px-7 md:hidden lg:block focus:outline-none ${
              filter ? "bg-black text-white h-full" : null
            } `}
          >
            Filters &#x2304;
          </button>
          <div className="flex-grow flex items-center">
            <i className="fas fa-search p-2"></i>
            <input
              className="flex-grow h-7 outline-none text-gray-700"
              type="text"
              placeholder="Search by title, artist, label, UPC"
            />
          </div>
          <div className="duration-200">
            <button
              onClick={() => setshow(!show)}
              className="bg-blue-700 hover:bg-blue-800 w-64 h-12 focus:outline-none text-white"
            >
              Actions &#x2304;
            </button>
            {show ? (
              <ul className="absolute bg-white w-64 rounded text-sm text-center border ">
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
        <div className={filter ? "py-5 px-5 bg-black" : "hidden"}>
          <div className="grid grid-rows-2 grid-cols-3 gap-6">
            <div className="">
              <p className="text-white my-3">Release Date</p>
              <select
                className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                type="text"
                placeholder="Type"
              >
                <option value="all">All</option>
                <option value="l7d">Last 7 days</option>
                <option value="tm">This Month</option>
                <option value="lm">Last Month</option>
                <option value="ty">This Year</option>
              </select>
            </div>
            <div className="">
              <p className="text-white my-3">Artist</p>
              <select
                className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                type="text"
                placeholder="Type"
              >
                <option value="all">All</option>
              </select>
            </div>
            <div className="">
              <p className="text-white my-3">Status</p>
              <select
                className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                type="text"
                placeholder="Type"
              >
                <option value="all">All</option>
              </select>
            </div>
            <div className="">
              <p className="text-white my-3">Genre</p>
              <select
                className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                type="text"
                placeholder="Type"
              >
                <option value="all">All</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16 py-2 text-xs text-gray-500 flex items-end">
        {tracks.length === 0 ? "nothing to show" : "showing all tracks"}
      </div>
      <div className="bg-white">
        <table className="table-fixed text-xs text-gray-700 w-full h-60">
          <thead className="text-left">
            <tr className="h-12 border">
              <th className=" w-1/12"></th>
              <th className=" w-2/12">Track Name</th>
              <th className="w-2/12">Artist</th>
              <th className=" w-1/12">ISRC</th>
              <th className="w-4/12">Audio</th>
              <th className=" w-1/12">Language</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((t) => (
              <tr className="h-12 text-left text-lg font-semibold border-b hover:bg-gray-50">
                <td>
                  <input
                    type="checkbox"
                    className="w-8 h-8 border focus:outline-none mx-4"
                  />
                </td>
                <td>{t.releaseTitle}</td>
                <td>{t.primaryArtist}</td>
                <td>{t.isrc}</td>
                <td>
                  <audio src={t.trackURL} controls></audio>
                </td>
                <td>{t.lyricLanguage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {tracks.length === 0 ? (
          <div className=" h-56 flex items-center justify-center">
            <p className="text-xs text-gray-500">
              you have no data to display.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tracks;
