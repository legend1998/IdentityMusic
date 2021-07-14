import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firedb } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";
import Language from "./utis/Language";
import { useHistory } from "react-router";
import raw from "./languageList.txt";

function Tracks() {
  const [show, setshow] = useState(false);
  const [filter, setfilter] = useState(false);
  const [{ user }] = useStateValue();
  const [artist, setartist] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [language, setlanguage] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        var a = [];
        text = text.split("\n");
        text.forEach((t) => {
          a.push(t);
        });
        setlanguage(a);
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

    getTracks();
  }, []);

  async function getTracks() {
    var a = await firedb.collection("album").get();
    var b = [];
    for (const doc of a.docs) {
      if (doc.data().email !== user.email) continue;
      var tracks = await firedb
        .collection("album")
        .doc(doc.id)
        .collection("tracks")
        .get();

      for (const track of tracks.docs) {
        b.push(track.data());
      }
    }

    setTracks(b);
  }

  return (
    <div className="lg:px-12 md:px-1 py-5 ">
      <div className="bg-white">
        <div className="flex h-14 mt-8 items-center flex-wrap">
          <button
            onClick={() => setfilter(!filter)}
            className={`px-7 hidden lg:block focus:outline-none ${
              filter ? "bg-filter text-white h-full" : null
            } `}
          >
            Filters <i class="fas fa-chevron-down ml-6"></i>
          </button>
          <div className="flex-grow flex items-center">
            <i className="fas fa-search p-2 text-gray-700 mt-2"></i>
            <input
              className="flex-grow h-7 outline-none text-gray-700"
              type="text"
              placeholder="Search by Title, Artist, ISRC"
            />
          </div>
          <div className="duration-200">
            <button
              onClick={() => setshow(!show)}
              className=" bg-tabborder hover:bg-indigo-700 w-64 h-14  focus:outline-none text-white"
            >
              <span className="mx-16"> Actions</span>
              <i class="fas fa-chevron-down ml-6"></i>
            </button>
            {show ? (
              <ul className="absolute bg-white w-64 rounded font-Light shadow-lg   border cursor-pointer">
                <li className="h-10 pt-3  pl-5 hover:bg-tab">
                  <Link to="/panel/create_new_release">Create new release</Link>
                </li>
                <li className="h-6 pl-5  hover:bg-tab">
                  Download full catalog (CSV)
                </li>
                <li className="h-10 pl-5 pt-1 hover:bg-tab">
                  Download full catalog (XLSX)
                </li>
              </ul>
            ) : null}
          </div>
        </div>
        <div className={filter ? "py-5 px-5 bg-filter" : "hidden"}>
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

                {artist.map((art, index) => (
                  <option value={art.name} key={index}>
                    {art.name}
                  </option>
                ))}
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
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="injested">Ingested</option>
                <option value="moderation">Moderation</option>
                <option value="approved">Approved</option>
                <option value="live">Live</option>
              </select>
            </div>
            <div className="">
              <p className="text-white my-3">Languague</p>
              <select
                className="sticky h-12 p-2 outline-none text-gray-700 w-full"
                type="text"
                placeholder="Type"
              >
                <option value="default" defaultValue>
                  All
                </option>
                {language.map((lang, index) => (
                  <option className="capitalize  " value={lang} key={index}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16 py-2 text-sm  text-sidetext flex items-end">
        {tracks.length === 0 ? "Nothing to show" : "Showing all tracks"}
      </div>
      <div className="bg-white mt-2 ">
        <table className="table-fixed  w-full h-full ">
          <thead className="text-left border-b-2 ">
            <tr className="h-16 text-black tracking-wide text-base">
              <th className="w-2/12 pl-8 font-medium ">Track Name</th>
              <th className="w-1/12 pl-3 font-medium ">Version</th>
              <th className="w-2/12 font-medium pl-5">Artist</th>
              <th className="w-2/12 text-left font-medium ">ISRC</th>
              <th className="w-2/12 text-center font-medium ">Language</th>
              <th className="w-4/12 text-center font-medium ">Audio</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((t) => (
              <tr className="h-20 text-lg font-Regular text-filter hover:bg-hover border-b ">
                <td className="w-2/12 pl-8 font-Regular">{t.releaseTitle}</td>
                <td className="w-1/12 pl-3 font-Regular  ">{t.titleVersion}</td>
                <td className="w-2/12 font-Regular pl-5 ">{t.mainArtist}</td>
                <td className="w-2/12 text-left font-Regular ">{t.isrc}</td>
                <td className="w-2/12 text-center font-Regular">
                  {t.lyricLanguage}
                </td>
                <td className="w-4/12 text-center font-thin pr-5">
                  <audio src={t.trackURL} className="w-full " controls></audio>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tracks.length === 0 ? (
          <div className=" h-56 flex items-center justify-center">
            <p className="text-sm text-sidetext">
              You have no data to display.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tracks;
