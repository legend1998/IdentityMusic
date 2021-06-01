import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { firedb } from "./firebaseconfig";
import AWN from "awesome-notifications";
import moment from "moment";
import { statusSwitch, downloadcsv, downloadxlsx } from "./utis/Utils";

function Dispute() {
  const [show, setshow] = useState(false);
  const [disputes, setdisputes] = useState([]);
  const [filter, setfilter] = useState(false);
  const [{ user }] = useStateValue();

  useEffect(() => {
    firedb.collection("dispute").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data().user === user.email) {
          a.push(snap.data());
        }
      });
      setdisputes(a);
    });
  }, [user.email]);

  function showdetails(dis) {
    if (dis?.message) {
      new AWN().modal(dis?.message);
    }
  }

  return (
    <div className="w-full bg-gray-100 h-full">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8     font-sans ">Dispute</h1>
      </div>

      <div className="lg:px-12 md:px-1  py-5">
        <div className="bg-white">
          <div className="flex h-12 items-center flex-wrap">
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
                placeholder="Search by Date, Link"
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
                <ul className="absolute bg-white w-64 rounded font-Light shadow-lg  border cursor-pointer">
                  <li className="h-7 pt-1  pl-5 hover:bg-gray-100">
                    <Link to="/panel/create_new_dispute">
                      Create new Dispute
                    </Link>
                  </li>
                  <li className="h-6 pl-5  hover:bg-gray-100">
                    <button
                      className="focus:outline-none"
                      onClick={() => downloadcsv(disputes)}
                    >
                      Download full Metadata (CSV)
                    </button>
                  </li>
                  <li className="h-6 pl-5  hover:bg-gray-100">
                    <button
                      className="focus:outline-none"
                      onClick={() => downloadxlsx(disputes)}
                    >
                      Download full Metadata (XLSX)
                    </button>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
          <div className={filter ? "py-5 px-5 bg-black" : "hidden"}>
            <div className="grid grid-rows-1 grid-cols-2 gap-6">
              <div className="">
                <p className="text-white my-3">Date</p>
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
                <p className="text-white my-3">Status</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="consideration">Processing</option>
                  <option value="approved">Approved</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="h-16 py-2 text-sm text-gray-500 flex items-end">
          This table shows all the dispute created by User.
        </div>
        <div className="bg-white">
          <table className="table-fixed text-xs text-gray-700 w-full">
            <thead>
              <tr className="h-12 border">
                <th className=" w-2/6">Date</th>
                <th className=" w-3/6">Link</th>
                <th className=" w-1/6">Status</th>
              </tr>
            </thead>
            <tbody>
              {disputes.map((dispute, index) => (
                <tr
                  key={index}
                  className="text-center h-14 hover:bg-gray-50"
                  onClick={() => showdetails(dispute)}
                >
                  <td>{moment(dispute?.created_at).format("DD-MM-YYYY")}</td>
                  <td>{dispute.youtubeLink}</td>
                  <td>{statusSwitch(dispute?.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {disputes.length === 0 ? (
            <div className="w-full h-56 flex items-center justify-center">
              <p className="text-xs text-gray-500">
                You have no data to display.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Dispute;
