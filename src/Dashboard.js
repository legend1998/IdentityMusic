import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { Circle } from "rc-progress";
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
    <div className="w-full bg-gray-100">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10  capitalize">
          Hi, {user.fname}!
        </h1>
      </div>
      <div className="m-10 bg-white p-5">
        <div className=" m-5  py-5 p border-b border-gray-50 flex items-center justify-between text-gray-500">
          <h3>Please do the following </h3>
          <div>
            <i className="far fa-times-circle cursor-pointer"></i>
          </div>
        </div>
        <div className=" min-h-56 flex items-center justify-start ">
          <div className=" w-1/3 text-center flex flex-col items-center justify-center">
            <Circle
              percent="10"
              strokeWidth="9"
              trailWidth="8"
              strokeColor="#0000ff"
              className="h-32 text-blue-600"
            />
            <p className="my-5 text-lg font-semibold">Setup Progress</p>
          </div>
          <div className="">
            <div className="float-left flex items-center m-3 flex-wrap justify-center">
              <span className="text-blue-600 h-24 w-24 rounded-full border-8 p-3 flex items-center justify-center">
                <i className="fas fa-user fa-2x  "></i>
              </span>
              <span
                className="text-center  text-2xl mx-4"
                onClick={() => {
                  history.push("/panel/account");
                }}
              >
                Add Account Info
              </span>
            </div>
            <div className="float-left flex items-center m-3 flex-wrap justify-center">
              <span className="text-blue-600 h-24 w-24 rounded-full border-8 p-3 flex items-center justify-center">
                <i className="fas fa-podcast fa-2x  "></i>
              </span>
              <span
                className="text-center  text-2xl mx-4"
                onClick={() => {
                  history.push("/panel/assets");
                }}
              >
                Distribute your Music
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="m-10">
        {vidoes.map((v, i) => (
          <div className="  bg-white   mr-3 mb-3 float-left w-96 m-5" key={i}>
            <div className="h-56 bg-gray-500">
              <iframe
                src={v?.src}
                width="100%"
                allowfullscreen
                height="100%"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
