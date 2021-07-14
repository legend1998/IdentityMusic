import React, { useEffect, useState } from "react";
import AWN from "awesome-notifications";
import { firedb } from "./firebaseconfig";
import "./app.css";

function Stores({ nextab, albumid }) {
  const [checkall, setcheckall] = useState(false);
  const [checkdsp, setdsp] = useState(false);
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

  function handlemusicstores() {
    if (storeobject?.submitted) {
      return;
    }
    if (!checkdsp) {
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
        new AWN().success("Saved", {
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
    <div className="lg:p-10 p-2 bg-background">
      <table className="table-fixed w-full bg-white font-sans text-center my-5  ">
        <thead>
          <tr className=" font-normal h-14 border">
            <th className="w-1/12 ">#</th>
            <th className="w-1/12 pb-6">
              <input
                type="checkbox"
                id="box-41"
                onChange={(e) => setdsp(!checkdsp)}
              />
              <label for="box-41"> </label>
            </th>
            <th className="w-6/12 "></th>
            <th className=" w-2/12 text-left">Music Platforms</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12 border">
            <td>1</td>
            <td className="pb-6 ">
              <input
                type="checkbox"
                id="box-1"
                disabled={storeobject?.submitted}
                value="Youtube"
                checked={checkdsp}
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-1"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fyt%20music.png?alt=media&token=b33254a5-9d2f-4bcc-b3d3-697adbf665b3"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize">
              {" "}
              Youtube Music / Content ID
            </td>
          </tr>
          <tr className="h-12 border">
            <td>2</td>
            <td className="pb-6">
              <input
                type="checkbox"
                className="w-6 h-6"
                id="box-2"
                checked={checkdsp}
                disabled={storeobject?.submitted}
                value="Pandora "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-2"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fpandora.png?alt=media&token=d73f4391-b1a8-484c-b60e-f9babe6911f5"
                alt="logo"
              ></img>
            </td>

            <td className=" text-left capitalize"> Pandora</td>
          </tr>

          <tr className="h-12 border">
            <td>3</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-3"
                className="w-6 h-6"
                checked={checkdsp}
                disabled={storeobject?.submitted}
                value="Spotify "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-3"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fspotify.png?alt=media&token=183ad3fe-3e58-4c11-96e2-0e4d6c8894ab"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> Spotify</td>
          </tr>

          <tr className="h-12 border">
            <td>4</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-4"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Itunes "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-4"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fitunes.png?alt=media&token=5bcd4dca-1103-4f7a-aa45-99d694633c06"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> Itunes</td>
          </tr>

          <tr className="h-12 border">
            <td>5</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-5"
                className="w-6 h-6"
                checked={checkdsp}
                disabled={storeobject?.submitted}
                value="Apple Music "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-5"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fapple.png?alt=media&token=28e9f65b-7215-49d6-ae4b-9b68b6c89afa"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> Apple Music</td>
          </tr>

          <tr className="h-12 border">
            <td>6</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-6"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Amazon Music "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-6"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Famazon.png?alt=media&token=325a6c0d-4712-452d-8eae-6e6030a4166a"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> Amazon Music</td>
          </tr>

          <tr className="h-12 border">
            <td>7</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-7"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Jio Saavan "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-7"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fsaavan.png?alt=media&token=72d7273e-32b4-43e8-ba63-1f8d808a349d"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> Jio Saavan</td>
          </tr>

          <tr className="h-12 border">
            <td>8</td>
            <td className="pb-6">
              <input
                type="checkbox"
                checked={checkdsp}
                id="box-8"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Gaana "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-8"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fgaana.png?alt=media&token=532e2fb2-a8d6-46ca-a623-ccfd8d194641"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> Gaana</td>
          </tr>

          <tr className="h-12 border">
            <td>9</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-9"
                className="w-6 h-6"
                checked={checkdsp}
                disabled={storeobject?.submitted}
                value="Wynk Music "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-9"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fwynk.png?alt=media&token=8a27c10e-a2f0-465c-bb2a-cc4b9d9cc94f"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize">Wynk Music</td>
          </tr>

          <tr className="h-12 border">
            <td>10</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-10"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Hungama "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-10"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fhungama.png?alt=media&token=f9428176-4a60-45ce-a6f3-06888e3d70e1"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> Hungama</td>
          </tr>

          <tr className="h-12 border">
            <td>11</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-11"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Resso "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-11"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fresso.png?alt=media&token=74e7f658-a9d2-4c7e-a6d6-ff7e3c99a426"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> Resso / Tik Tok</td>
          </tr>

          <tr className="h-12 border">
            <td>12</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-12"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="MX Player "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-12"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fmx%20player.png?alt=media&token=c31c7e99-cc0d-4c05-b3cf-f6d14631bc8f"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> MX Player</td>
          </tr>

          <tr className="h-12 border">
            <td>13</td>
            <td className="pb-6">
              <input
                type="checkbox"
                checked={checkdsp}
                id="box-13"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Boomplay "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-13"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fboomplay.png?alt=media&token=3961159e-680a-4e65-ab0c-5be54b1345c6"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize">Boomplay</td>
          </tr>

          <tr className="h-12 border">
            <td>14</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-14"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Anghami "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-14"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fanghami.png?alt=media&token=05639ba4-ac87-4cae-9145-78012d06d37d"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize">Anghami</td>
          </tr>

          <tr className="h-12 border">
            <td>15</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-15"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Shazam "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-15"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fshazam.png?alt=media&token=ca750879-e0d5-4db9-9584-876599c1e37d"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize">Shazam</td>
          </tr>

          <tr className="h-12 border">
            <td>16</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-16"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Napster "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-16"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fnapster.png?alt=media&token=e949674d-aa0b-4fcd-88d5-d2871dc9a079"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize">Napster</td>
          </tr>

          <tr className="h-12 border">
            <td>17</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-17"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="7 Digital "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-17"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2F7%20digital.png?alt=media&token=076da77c-e2e0-42fd-bb40-6c2e0ef4b55a"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize">7 Digital</td>
          </tr>

          <tr className="h-12 border">
            <td>18</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-18"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Facebook  "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-18"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Ffb.png?alt=media&token=c94c18c3-8eec-47b4-97bc-9f35582e17f0"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize">Facebook/Instagram</td>
          </tr>

          <tr className="h-12 border">
            <td>19</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-19"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Deezer "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-19"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fdeezer.png?alt=media&token=ea1ce859-f51c-4c7c-a11e-184a64803770"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> Deezer</td>
          </tr>

          <tr className="h-12 border">
            <td>20</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-20"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Tidal "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-20"></label>
            </td>
            <td className=" w-1/6 ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Ftidal.png?alt=media&token=08d33620-4af3-4fc3-bb3e-5d8a8bebc5c3"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> Tidal</td>
          </tr>

          <tr className="h-12 border">
            <td>21</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-21"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Tencent "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-21"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Ftencent.png?alt=media&token=4b055798-4b46-49e6-87e8-53bf29f6adec"
                alt="logo"
              ></img>
            </td>
            <td className=" text-left capitalize"> Tencent/ Ultimate China</td>
          </tr>

          <tr className="h-12 border">
            <td>22</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-22"
                checked={checkdsp}
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="more 200+ stores. "
                onChange={(e) => handlecheck(e)}
              />
              <label for="box-22"></label>
            </td>
            <td className=" w-1/6  "></td>
            <td className=" text-left capitalize"> More 200+ DSP's.</td>
          </tr>
        </tbody>
      </table>
      <table className="table-fixed w-full bg-white  text-center my-5">
        <thead>
          <tr className=" font-normal h-14 border">
            <th className="w-1/12 ">#</th>
            <th className="w-1/12 "></th>
            <th className="w-6/12 "></th>
            <th className=" w-2/12 text-left">Telecom Partners</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12 border-b">
            <td>1</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-31"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
              <label for="box-31"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fjio.png?alt=media&token=950ae35d-5156-4df9-83e8-86f57e981357"
                alt="logo"
              ></img>
            </td>
            <td className="text-left">Jio</td>
          </tr>
          <tr className="h-12 border-b">
            <td>2</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-32"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
              <label for="box-32"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 w-10 rounded-full  mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fairtel.png?alt=media&token=b0aa92bd-0142-40a4-bce1-718f62602255"
                alt="logo"
              ></img>
            </td>
            <td className="text-left">Airtel</td>
          </tr>
          <tr className="h-12 border-b">
            <td>3</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-33"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
              <label for="box-33"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 w-10 rounded-full  mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fvi.png?alt=media&token=dc47759a-638c-47c0-ba9b-a7b089676155"
                alt="logo"
              ></img>
            </td>
            <td className="text-left">VI</td>
          </tr>
          <tr className="h-12 border-b">
            <td>4</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-34"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
              <label for="box-34"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 w-10 rounded-full mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fbsnl.png?alt=media&token=550745e5-3e8d-423f-a573-c3c398b52369"
                alt="logo"
              ></img>
            </td>
            <td className="text-left">BSNL</td>
          </tr>
          <tr className="h-12 border-b">
            <td>5</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-35"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
              <label for="box-35"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 w-10 rounded-full  mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fmtnl.png?alt=media&token=dbcf32a0-358d-4399-84c6-b9094e3b1fc8"
                alt="logo"
              ></img>
            </td>
            <td className="text-left">MTNL</td>
          </tr>
          <tr className="h-12 border-b">
            <td>6</td>
            <td className="pb-6">
              <input
                type="checkbox"
                id="box-36"
                className="w-6 h-6"
                value={checkall}
                checked={checkall}
                onChange={() => {
                  setcheckall(!checkall);
                  handleTelecom();
                }}
              />
              <label for="box-36"></label>
            </td>
            <td className=" w-1/6  ">
              <img
                className="h-10 w-10 rounded-full  mx-12"
                src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Ftata.png?alt=media&token=e9052111-ea3b-40a0-854e-e00a904b1bbe"
                alt="logo"
              ></img>
            </td>
            <td className="text-left">Tata Docomo</td>
          </tr>
        </tbody>
      </table>

      <div className="pb-4 bg-gray-100  text-blue-600 border-b">
        <p className="h-14 bg-white pt-1 pl-6">
          * Note: Videos may claimed by any one of these Partners( Merlin
          TrapBassHDTV, The Source, Repost Network).
          <p className="px-14">
            We may use our own Youtube deal or Mentioned Partnered depending
            upon which region you belongs too.
          </p>
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
