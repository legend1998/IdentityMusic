import React, { useEffect, useState } from "react";
import { firedb } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";

function Transactions() {
  const [{ user }] = useStateValue();
  const [trans, settrans] = useState([]);
  const [stats, setstats] = useState({});
  useEffect(() => {
    firedb
      .collection("user")
      .doc(user.email)
      .get()
      .then((user) => {
        setstats(user?.stats);
      });
    firedb
      .collection("user")
      .doc(user.email)
      .collection("transactions")
      .onSnapshot((snapshot) => {
        var a = [];
        snapshot.forEach((snap) => {
          a.push(snap.data());
        });
        settrans(a);
      });
  }, [user.email]);
  return (
    <div className="w-full bg-gray-100 h-full">
      <div className="w-full bg-white h-24 font-Graphik flex items-center shadow-sm">
        <h1 className="text-3xl font-Graphikmedium ml-8  ">Balance</h1>
      </div>
      <div className="flex justify-between items-end mx-10 my-5">
        <div className="">
          <p className="">OutStanding Earnings</p>
          <h3 className="text-3xl fa fa-inr font-bold">
            {stats?.outstanding ? stats?.outstanding : 0.0}
          </h3>
        </div>
        <div className="">
          <p className="text-sm">Balance</p>
          <h3 className="text-3xl fa fa-inr font-bold">
            {stats?.total ? stats?.total : 0.0}
          </h3>
        </div>
      </div>
      <div className="lg:px-12 md:px-1  py-5">
        <div className="h-16 py-2 text-xs text-gray-500 flex items-end">
          {trans.length === 0 ? "Nothing to show" : "showing all transactions"}
        </div>
        <div className="bg-white">
          <table className="table-fixed text-xs text-gray-700 w-full h-60">
            <thead>
              <tr className="h-12 border">
                <th className=" w-2/6">Date</th>
                <th className=" w-1/6">Contract Name</th>
                <th className=" w-1/6">Transaction Mode</th>
                <th className=" w-1/6">Amount</th>
                <th className=" w-1/6">Status</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>{t.name}</td>
                  <td>{t.mode}</td>
                  <td>{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {trans.length === 0 ? (
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

export default Transactions;
