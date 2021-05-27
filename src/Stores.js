import React, { useEffect, useState } from "react";
import raw from "./storelist.txt";
import AWN from "awesome-notifications";
import { firedb } from "./firebaseconfig";

function Stores({ nextab, albumid }) {
  const [checkall, setcheckall] = useState(false);
  const [select, setselect] = useState([]);
  const [storelist, setStorelist] = useState([]);
  const [saved, setsaved] = useState(false);
  const [storeobject, setstoreobject] = useState({});

  //effects

  var telecom = ["jio", "vi", "bsnl", "mtnl", "Airtel", "Tata Docomo"];

  useEffect(() => {
    firedb
      .collection("album")
      .doc(albumid)
      .get()
      .then((res) => {
        setstoreobject(res.data()?.storInfo);
      });

    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        var a = [];
        text = text.split("\n");
        text.forEach((t) => {
          a.push(t);
        });
        setStorelist(a);
        setselect(a);
      });
  }, []);

  function handlecheck(e) {
    if (storeobject?.submitted) {
      return;
    }
    let ischecked = e.target.checked;

    if (e.target.value === "youtube content id") {
      setstoreobject({ ...storeobject, youtube: e.target.value });
      return;
    }

    if (ischecked) {
      setselect([...select, e.target.value]);
    } else {
      setselect(select.filter((store) => store !== e.target.value));
    }
  }

  function handleTelecom() {
    if (storeobject?.submitted) {
      return;
    }
    if (!checkall) {
      setstoreobject({ ...storeobject, telecomPartners: telecom });
    } else {
      setstoreobject({ ...storeobject, telecomPartners: null });
    }
  }

  function saveStores() {
    if (storeobject?.submitted) {
      new AWN().info("already submitted", {
        position: "bottom-right",
      });
      nextab(4, 4);
      return;
    }
    if (Object.keys(storeobject).length < 1) {
      new AWN().alert("select atleast one platform ", {
        position: "bottom-right",
      });
      return;
    }
    if (!albumid) {
      new AWN().alert("no album found to put this store", {
        position: "bottom-right",
      });
      return;
    }
    firedb
      .collection("album")
      .doc(albumid)
      .update({ storInfo: { ...storeobject, stores: select, submitted: true } })
      .then((res) => {
        new AWN().success("saved", {
          position: "bottom-right",
        });
        setsaved(true);
        nextab(4, 4);
      })
      .catch((e) => {
        new AWN().alert(e.message, {
          position: "bottom-right",
        });
      });
  }

  return (
    <div className="lg:p-10 p-2 bg-gray-100">
      <table className="table-fixed w-full bg-white font-sans text-center">
        <thead>
          <tr className=" font-normal h-14 border ">
            <th className="w-1/12 ">#</th>
            <th className="w-4/12 ">select</th>
            <th className=" w-3/12 text-left">Store</th>
          </tr>
        </thead>
        <tbody>
          {storelist.map((store, index) => (
            <tr key={index} className="h-12 border">
              <td>{index + 1}</td>
              <td>
                <input
                  type="checkbox"
                  disabled={storeobject?.submitted}
                  className="w-6 h-6 "
                  defaultChecked
                  value={store}
                  onChange={(e) => handlecheck(e)}
                />
              </td>
              <td className="text-left">{store}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="table-fixed w-full bg-white font-sans text-center my-5">
        <thead>
          <tr className=" font-normal h-14 border">
            <th className="w-1/12 ">#</th>
            <th className="w-4/12 ">select</th>
            <th className=" w-3/12 text-left capitalize">telecom partneres</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12 border">
            <td>1</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
            </td>
            <td className="text-left">Jio</td>
          </tr>
          <tr className="h-12 border">
            <td>2</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
            </td>
            <td className="text-left">Airtel</td>
          </tr>
          <tr className="h-12 border">
            <td>3</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
            </td>
            <td className="text-left">VI</td>
          </tr>
          <tr className="h-12 border">
            <td>4</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
            </td>
            <td className="text-left">BSNL</td>
          </tr>
          <tr className="h-12 border">
            <td>5</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
            </td>
            <td className="text-left">MTNL</td>
          </tr>
          <tr className="h-12 border">
            <td>6</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
            </td>
            <td className="text-left">Tata Docomo</td>
          </tr>
        </tbody>
      </table>
      <table className="table-fixed w-full bg-white font-sans text-center my-5  ">
        <thead>
          <tr className=" font-normal h-14 border">
            <th className="w-1/12 ">#</th>
            <th className="w-4/12 ">select</th>
            <th className=" w-3/12 text-left">Youtube</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12 border">
            <td>1</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                defaultChecked={storeobject?.youtube}
                disabled={storeobject?.submitted}
                value="youtube content id"
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td className=" text-left capitalize"> Youtube Content ID</td>
          </tr>
        </tbody>
      </table>
      <div className="pb-4 bg-gray-100  text-blue-600 border-b">
        <p className="h-14 bg-white pt-1 pl-6">
          * Note: Videos may claimed by any one of these Partners( Merlin
          TrapBassHDTV, Merlin FUGA, Sony Music, RoutNote, Merlin Coin Digital).
          We may use our Youtube deal or Mentioned Partnered depending upon use
          have choosed for Synchronisation Purpose.
        </p>
      </div>
      <div className=" flex items-center justify-between bg-black h-14 text-gray-200 bottom-0  w-full">
        <button className=" h-full w-52 bg-gray-600 focus:outline-none hover:bg-gray-700">
          <i className="fas fa-arrow-left mx-3"></i> Back
        </button>
        <button className=" h-full  focus:outline-none w-full">Cancel</button>
        <button
          className="w-52 h-full bg-blue-800 focus:outline-none hover:bg-blue-900"
          onClick={() => saveStores()}
        >
          Next
          <i className="fas fa-arrow-right mx-3"></i>
        </button>
      </div>
    </div>
  );
}

export default Stores;
