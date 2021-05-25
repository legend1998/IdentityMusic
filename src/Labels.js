import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { firedb } from "./firebaseconfig";

function Labels() {
  const [filter, setfilter] = useState(false);
  const [lables, setlabels] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    firedb.collection("label").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        if (snap.data().user === user.email)
          a.push({ ...snap.data(), id: snap.id });
      });
      setlabels(a);
    });
  }, []);
  return (
    <div className="bg-gray-100 pb-10 h-screen">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10 font-sans ">Labels</h1>
      </div>
      <div className="lg:px-12 md:px-1  py-5">
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
              <button className="bg-blue-700 hover:bg-blue-800 w-52 h-12 focus:outline-none text-white">
                <Link to="/panel/add_label">
                  <i className="fas fa-plus"></i> Add Label
                </Link>
              </button>
            </div>
          </div>
          <div className={filter ? "py-5 px-5 bg-black" : "hidden"}>
            <div className="grid grid-rows-1 grid-cols-3 gap-6">
              <div className="">
                <p className="text-white my-3">Date Added</p>
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
          Showing All Labels
        </div>
        <div className="">
          {lables.map((label, index) => (
            <Card data={label} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Labels;
