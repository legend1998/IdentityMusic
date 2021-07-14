import React, { useEffect, useState } from "react";
import { firedb } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";
import moment from "moment";
import { calculateOutstanding } from "./utis/Utils";

function Transactions() {
  const [{ user }] = useStateValue();
  const [trans, settrans] = useState([]);
  useEffect(() => {
    if (user) {
      firedb
        .collection("transactions")
        .where("user", "==", user.email)
        .onSnapshot((snapshot) => {
          var a = [];
          snapshot.forEach((snap) => {
            a.push(snap.data());
          });
          settrans(a);
        });
    }
  }, [user]);

  return (
    <div className="w-full bg-background h-full">
      <div className="w-full bg-white h-24  flex items-center shadow-sm">
        <h1 className="text-4xl font-medium ml-12 ">Balance</h1>
      </div>

      <div className="flex justify-between items-end mx-12 my-5">
        <div className="">
          <p className="text-3xl font-medium">Total Earnings</p>
        </div>
        <div className="">
          <p className="text-md font-medium text-sidetext text-right ">
            Balance
          </p>
          <p className="text-3xl font-medium">
            ₹ {user?.transactionStat?.total}.00
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end mx-12 ">
        <div className="">
          <p className="text-3xl font-medium">Outstanding Earnings</p>
        </div>
        <div className="">
          <p className="text-md font-medium text-sidetext text-right">
            Balance
          </p>
          <p className="text-3xl font-medium">
            ₹ {calculateOutstanding(trans, user?.transactionStat?.total)}.00
          </p>
        </div>
      </div>

      <div>
        <div className="h-14 ml-12 mr-12 mb-6 mt-12 bg-white ">
          <i className="fas fa-search px-4 text-sidetext pt-5"></i>
          <input
            className="flex-grow h-7 w-5/6 outline-none text-gray-700"
            type="text"
            placeholder="Search by text"
          />
        </div>
      </div>
      <div className="lg:px-12 md:px-1  py-5">
        <div className="bg-white">
          <table className="table-fixed text-xs text-black w-full">
            <thead>
              <tr className="h-14 border-b text-sm tracking-wider">
                <th className=" w-1/6">Date</th>
                <th className=" w-2/6">Transaction mode</th>
                <th className=" w-1/6">Amount</th>
                <th className=" w-1/6">Status</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((t, i) => (
                <tr key={i} className="h-14 text-center">
                  <td>{moment(t.date).format("D-M-yy")}</td>
                  <td>{t.mode}</td>
                  <td>{t.amount}</td>
                  <td>{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {trans.length === 0 ? (
            <div className="w-full h-56 flex items-center justify-center">
              <p className="text-md text-gray-500">
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
