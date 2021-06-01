import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";
import { firedb } from "./firebaseconfig";

function Dashboard() {
  const [{ user }] = useStateValue();
  const history = useHistory();
  const [vidoes, setvidoes] = useState([]);

  useEffect(() => {
    firedb.collection("video").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        a.push(snap.data());
      });
      setvidoes(a);
    });
  }, []);
  return (
    <div className="w-full h-max bg-gray-100">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10  capitalize">
          Hi, {user.fname}!
        </h1>
      </div>
      <div className="m-16 bg-white ">
        <div className=" m-5  py-3   border-b flex items-center justify-between text-gray-500">
          <h3 className="font-regular text-2xl text-black ">
            Please do the following
          </h3>
          <div>
            <i className="far fa-times-circle cursor-pointer"></i>
          </div>
        </div>
        <div className=" min-h-56 pl-40 flex items-center justify-center ">
          <div className="">
            <div className="float-left flex items-center m-3 flex-wrap justify-center cursor-pointer">
              <span className="text-blue-600 h-20 w-20 rounded-full border-4  border-black p-3 flex items-center justify-center">
                <i
                  className="fas fa-user fa-2x  "
                  onClick={() => {
                    history.push("/panel/account");
                  }}
                ></i>
              </span>
              <span className="text-center text-2xl mx-4">
                Add Account info&nbsp;
              </span>
            </div>
            <div className="float-left flex items-center pl-24 m-3 flex-wrap justify-center cursor-pointer">
              <span className="text-blue-600 h-20 w-20 rounded-full border-4 border-black p-3 flex items-center justify-center">
                <i
                  className="fas fa-money-bill-wave fa-2x  "
                  onClick={() => {
                    history.push("/panel/account/");
                  }}
                ></i>
              </span>
              <span className="text-center  text-2xl mx-4">
                Add Payout Preferences
              </span>
            </div>
            <div className="float-left flex items-center m-3 flex-wrap justify-center cursor-pointer">
              <span className="text-blue-600 h-20 w-20 rounded-full border-4 border-black p-3 flex items-center justify-center">
                <i
                  className="fas fa-record-vinyl fa-3x  "
                  onClick={() => {
                    history.push("/panel/create_new_release");
                  }}
                ></i>
              </span>
              <span className="text-center  text-2xl mx-4">
                Create New Release
              </span>
            </div>
            <div className="float-left flex items-center pl-20 pb-6 m-3 flex-wrap justify-center cursor-pointer">
              <span className="text-blue-600 h-20 w-20 rounded-full border-4  border-black p-3 flex items-center justify-center">
                <i
                  className="fas fa-dollar-sign fa-2x  "
                  onClick={() => {
                    history.push("/panel/transactions");
                  }}
                ></i>
              </span>
              <span className="text-center  text-2xl mx-4">
                Receive Payments
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="m-16 bg-white ">
        <div className=" m-5  py-3  border-b flex items-center justify-between text-gray-500">
          <h3 className="font-regular text-2xl text-black ">
            Account Setup Tutorials
          </h3>
          <div>
            <i className="far fa-times-circle cursor-pointer"></i>
          </div>
        </div>
        <div className="h-auto py-6  items-center justify-items-center bg-gray-100  flex flex-col md:flex-row  border-4 border-white ">
          {vidoes.map((v, i) => (
            <div className="float-left m-5 bg-white">
              <div className="px-4 p-3 font-medium ">{v.title} </div>
              <iframe
                width="560"
                height="315"
                src={v.src}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
