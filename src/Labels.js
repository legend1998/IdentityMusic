import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { firedb } from "./firebaseconfig";
import { AWN } from "awesome-notifications";

function Labels() {
  const [filter, setfilter] = useState(false);
  const [lables, setlabels] = useState([]);
  const [artists, setartists] = useState([]);
  const [{ user, subLabel }] = useStateValue();
  const history = useHistory();
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

  const gotolabel = () => {
    if (user?.subType) {
      if (subLabel[user.subType] >= lables.length) {
        history.push("/panel/add_label");
      } else {
        let notifier = new AWN();
        let onOk = () => {
          notifier.info("You pressed OK");
        };
        let onCancel = () => {
          notifier.info("You pressed Cancel");
        };
        notifier.confirm("you reached to a limit.", onOk, onCancel, {
          labels: {
            confirm: "Limit reached",
          },
        });
      }
    } else {
      let notifier = new AWN();
      let onOk = () => {
        notifier.info("You pressed OK");
      };
      let onCancel = () => {
        notifier.info("You pressed Cancel");
      };
      notifier.confirm(
        "you have no any subscription get one to access.",
        onOk,
        onCancel,
        {
          labels: {
            confirm: "No Subscription",
          },
        }
      );
    }
  };

  return (
    <div className="bg-background pb-10 min-h-full">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10 font-sans ">Labels</h1>
      </div>
      <div className="lg:px-12 md:px-1  py-5">
        <div className="bg-white ml-10 mr-10 mt-10">
          <div className="flex h-14  items-center">
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
                placeholder="Search by Label"
              />
            </div>
            <div className="duration-200">
              <button
                onClick={() => gotolabel()}
                className="bg-blue-700 hover:bg-blue-800 w-52 h-14 focus:outline-none text-white"
              >
                <i class="fas fa-plus text-xs mr-2 scale-50 "></i>
                Add Label
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
        <h1 className="h-16 py-2  ml-10 mr-10 font-normal text-sm text-gray-500 flex items-end">
          Showing All Labels
        </h1>
        <div className="relative m-5 min-h-screen">
          {lables.map((label, index) => (
            <Card data={label} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Labels;
