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
    <div className="w-full bg-background h-full">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className=" text-4xl font-medium ml-12   ">Dispute</h1>
      </div>

      <div className="lg:px-12 md:px-1  py-5">
        <div className="bg-white mt-10 ml-5 mr-5">
          <div className="flex h-14 items-center text-md flex-wrap">
            <button
              onClick={() => setfilter(!filter)}
              className={`px-7 hidden lg:block focus:outline-none ${
                filter ? "bg-filter text-white h-full" : null
              } `}
            >
              Filters <i class="fas fa-chevron-down ml-6"></i>
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
                className="bg-blue-700 hover:bg-blue-800 w-64 h-14 focus:outline-none text-white"
              >
                <span className="mx-16"> Actions</span>
                <i class="fas fa-chevron-down"></i>
              </button>
              {show ? (
                <ul className="absolute bg-white w-64 rounded font-Light shadow-lg  border cursor-pointer">
                  <li className="h-7 pt-1  pl-5 hover:bg-tab">
                    <Link to="/panel/create_new_dispute">
                      Create new Dispute
                    </Link>
                  </li>
                  <li className="h-6 pl-5  hover:bg-tab">
                    <button
                      className="focus:outline-none"
                      onClick={() => downloadcsv(disputes)}
                    >
                      Download full Metadata (CSV)
                    </button>
                  </li>
                  <li className="h-6 pl-5  hover:bg-tab">
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
          <div className={filter ? "py-5 px-5 bg-filter" : "hidden"}>
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
        <div className="h-16 py-6 text-sm ml-5 mr-5 text-gray-500 flex items-end">
          This table shows all the dispute created by User.
        </div>
        <div className="bg-white  ml-5 mr-5">
          <table className="table-fixed text-xs  w-full">
            <thead>
              <tr className="h-14 border text-base ">
                <th className=" w-2/6 text-left font-medium tracking-wider px-20">
                  Date
                </th>
                <th className=" w-3/6 text-left font-medium tracking-wider">
                  Link
                </th>
                <th className=" w-1/6 text-left font-medium tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {disputes.map((dispute, index) => (
                <tr
                  key={index}
                  className="text-center h-14 hover:bg-hover text-sm"
                  onClick={() => showdetails(dispute)}
                >
                  <td className="text-left px-20 text-filter">
                    {moment(dispute?.createdAt).format("DD-MM-YYYY")}
                  </td>
                  <td className="text-left text-filter">
                    <a href={dispute?.youtubeLink} target="blank">
                      {dispute?.youtubeLink}
                    </a>
                  </td>
                  <td className="text-left text-filter">
                    {statusSwitch(dispute?.status)}
                  </td>
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
