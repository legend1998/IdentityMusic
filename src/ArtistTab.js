import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Link, useHistory } from "react-router-dom";
import { firedb } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";
import AWN from "awesome-notifications";

function ArtistTab() {
  const [filter, setfilter] = useState(false);
  const [label, setlabel] = useState([]);
  const [artists, setartists] = useState([]);
  const [{ user, subArtist }] = useStateValue();
  const history = useHistory();

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

  useEffect(() => {
    firedb.collection("artist").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        if (snap.data().user === user.email)
          a.push({ ...snap.data(), id: snap.id });
      });
      setartists(a);
    });
  }, [user.email]);

  return (
    <div className="bg-background pb-10 min-h-full ">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-4xl font-medium ml-8 pl-10 ">Artists</h1>
      </div>
      <div className="lg:px-12 md:px-1  py-5 ">
        <div className=" bg-white ml-10 mr-10 mt-10">
          <div className="flex h-14 items-center">
            <button
              onClick={() => setfilter(!filter)}
              className={`px-7 md:hidden lg:block focus:outline-none ${
                filter ? "bg-black text-white h-full" : null
              } `}
            >
              Filters <i class="fas fa-chevron-down ml-6"></i>
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
              <button className="bg-blue-700 hover:bg-blue-800 w-52 h-14 focus:outline-none text-white">
                <Link to="/panel/add_new_artist">
                  <i class="fas fa-plus text-xs mr-2 scale-50 "></i>Add Artist
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
        <h1 className="h-16 py-2  ml-10 mr-10 font-normal text-sm text-gray-500 flex items-end">
          Showing All Artists
        </h1>

        <div className="relative m-5 min-h-screen">
          {artists.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistTab;
