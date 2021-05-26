import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firedb } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";

function Album() {
  const [show, setshow] = useState(false);
  const [filter, setfilter] = useState(false);
  const [{ user }] = useStateValue();
  const [album, setalbum] = useState([]);
  const history = useHistory();
  useEffect(() => {
    firedb.collection("album").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        if (snap.data().email === user.email)
          a.push({ ...snap.data(), id: snap.id });
      });
      setalbum(a);
      updateTotal();
    });
  }, [user.email]);

  function updateTotal() {
    var total = 0;

    album.forEach((alb) => {
      alb?.stats?.forEach((st) => {
        total += Number.parseInt(st.earnings);
      });
      console.log(alb);
    });
    console.log(total);
    firedb
      .collection("user")
      .doc(user.email)
      .update({ "transactionStat.total": total });
  }

  function handleClick(id) {
    history.push("/panel/viewAlbum/" + id);
  }

  return (
    <div className="lg:px-12 md:px-1 py-5 ">
      <div className="bg-white">
        <div className="flex h-14 items-center flex-wrap">
          <button
            onClick={() => setfilter(!filter)}
            className={`px-7 hidden lg:block focus:outline-none ${
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
              className=" bg-blue-700 hover:bg-blue-800 w-64 h-14  focus:outline-none text-white"
            >
              Actions &#x2304;
            </button>
            {show ? (
              <ul className="absolute bg-white w-64 rounded font-Light shadow-lg  border cursor-pointer">
                <li className="h-7 pt-1  pl-5 hover:bg-gray-100">
                  <Link to="/panel/create_new_release">Create new release</Link>
                </li>
                <li className="h-6 pl-5  hover:bg-gray-100">
                  Download full catalog (CSV)
                </li>
                <li className="h-6 pl-5 hover:bg-gray-100">
                  Download full catalog (XLSX)
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
      <div className=" h-16 py-2 text-xs text-gray-500 flex items-end">
        {album.length === 0 ? "Nothing to show" : " Showing all Albums"}
      </div>
      <div className="bg-white">
        <table className=" capitalize table-fixed text-sm text-gray-700 w-full text-left">
          <thead>
            <tr className="h-14 border ">
              <th className=" w-24 "></th>
              <th className=" w-2/6 pl-2 ">Album Name</th>
              <th className=" w-1/6">Artist</th>
              <th className=" w-1/6">Label</th>
              <th className=" w-1/6">UPC</th>
              <th className=" w-1/6">Release Date</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer">
            {album.map((a, index) => (
              <tr
                key={index}
                onClick={() => handleClick(a.id)}
                className="h-20 text-lg font-Regular hover:bg-gray-50 border-b"
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
                <td className=" w-2/6">{a.label}</td>
                <td className=" w-1/6">{a.upcEan}</td>
                <td className=" w-1/6">{a.releaseDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {album.length === 0 ? (
          <div className="w-full h-56 flex items-center justify-center">
            <p className="text-xs text-gray-500">
              You have no data to display.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Album;
