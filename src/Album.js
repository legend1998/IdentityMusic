import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firedb } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";
import { AWN } from "awesome-notifications";
import moment from "moment";

function Album() {
  const [show, setshow] = useState(false);
  const [filter, setfilter] = useState(false);
  const [{ user }] = useStateValue();
  const [artist, setartist] = useState([]);
  const [label, setlabel] = useState([]);
  const [album, setalbum] = useState([]);
  const history = useHistory();
  useEffect(() => {
    firedb
      .collection("label")
      .where("user", "==", user.email)
      .onSnapshot((snapshot) => {
        var a = [];
        snapshot.forEach((snap) => {
          a.push(snap.data());
        });
        setlabel(a);
      });

    firedb.collection("album").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        if (snap.data().email === user.email)
          a.push({ ...snap.data(), id: snap.id });
      });
      setalbum(a);
    });
  }, [user.email]);
  updateTotal();

  function updateTotal() {
    var total = 0;
    if (album.length !== 0) {
      album.forEach((alb) => {
        alb?.stats?.forEach((st) => {
          total += Number.parseInt(st.earnings);
        });
      });
      firedb
        .collection("user")
        .doc(user.email)
        .update({ "transactionStat.total": total });
    }
  }
  function handleClick(id) {
    history.push("/panel/viewAlbum/" + id);
  }
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
              placeholder="Search by Title, Artist, Label, UPC"
            />
          </div>
          <div className="duration-200">
            <button
              onClick={() => setshow(!show)}
              className=" bg-tabborder hover:bg-indigo-700 w-64 h-14   focus:outline-none text-white"
            >
              <span className="mx-16"> Actions</span>
              <i class="fas fa-chevron-down ml-6"></i>
            </button>
            {show ? (
              <ul className="absolute bg-white w-64  font-Light shadow-md  border cursor-pointer">
                <li className="h-10 pt-3  pl-5 hover:bg-tab">
                  <Link to="/panel/create_new_release">Create new release</Link>
                </li>
                <li className="h-7 pl-5  hover:bg-tab">
                  Download full catalog (CSV)
                </li>
                <li className="h-8 pl-5  hover:bg-tab">
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
              <p className="text-white my-3">Label</p>
              <select
                className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                type="text"
                placeholder="Type"
              >
                <option value="default" defaultValue>
                  All
                </option>
                {label.map((lab, i) => (
                  <option key={i} value={lab.label}>
                    {lab.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-16 mt-2 text-sm text-gray-500 flex items-end">
        {album.length === 0 ? "Nothing to show" : " Showing all Albums"}
      </div>
      <div className="bg-white mt-2 ">
        <table className="  capitalize table-fixed text-sm text-black w-full text-left">
          <thead className="">
            <tr className="h-16 border-b 	 ">
              <th className=" w-24 font-medium tracking-wide text-base"></th>
              <th className=" w-2/6 pl-2 font-medium tracking-wide text-base">
                Album Name
              </th>
              <th className=" w-1/6 font-medium tracking-wide text-base">
                Artist
              </th>
              <th className=" w-1/6 font-medium tracking-wide text-base">
                Label
              </th>
              <th className=" w-1/6 font-medium tracking-wide text-base">
                UPC
              </th>
              <th className=" w-1/6 font-medium tracking-wide text-base">
                Release Date
              </th>
            </tr>
          </thead>
          <tbody className="cursor-pointer ">
            {album.map((a, index) => (
              <tr
                key={index}
                onClick={() => handleClick(a.id)}
                className="h-20 text-lg font-Regular text-filter hover:bg-hover border-b"
              >
                <td className="text-center pl-6">
                  <img src={a.coverImage} width="50px" alt="" />
                </td>
                <td className=" w-2/6  ">
                  <div className="flex justify-start items-center">
                    <p className="pl-2"> {a.title}</p>
                  </div>
                </td>
                <td className=" w-1/6">{a.primaryArtist}</td>
                <td className=" w-2/6">{a.recordLabel}</td>
                <td className=" w-1/6">{a.upcEan}</td>
                <td className=" w-1/6">{a.releaseDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {album.length === 0 ? (
          <div className="w-full h-56 flex items-center justify-center">
            <p className="text-sm text-sidetext">
              You have no data to display.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Album;
