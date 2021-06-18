import React, { useEffect, useState } from "react";
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
            <th className="w-1/12 ">Select</th>
            <th className="w-6/12 "></th>
            <th className=" w-2/12 text-left">Music Platforms</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12 border">
            <td>1</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Youtube Content ID "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://idistro.online/assets/img/portfolio/stores/yt.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Youtube Content ID</td>
          </tr>
          <tr className="h-12 border">
            <td>2</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Youtube Music "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/yt%20music.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Youtube Music</td>
          </tr>

          <tr className="h-12 border">
            <td>3</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Spotify "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/spotify.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Spotify</td>
          </tr>

          <tr className="h-12 border">
            <td>4</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Itunes "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/itunes.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Itunes</td>
          </tr>

          <tr className="h-12 border">
            <td>5</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Apple Music "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/apple%20music.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Apple Music</td>
          </tr>

          <tr className="h-12 border">
            <td>6</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Amazon Music "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/amamzon%20music.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Amazon Music</td>
          </tr>

          <tr className="h-12 border">
            <td>7</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Jio Saavan "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/jio%20saavan.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Jio Saavan</td>
          </tr>

          <tr className="h-12 border">
            <td>8</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Gaana "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/Gaana.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Gaana</td>
          </tr>

          <tr className="h-12 border">
            <td>9</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Wynk Music "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/wynk.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize">Wynk Music</td>
          </tr>

          <tr className="h-12 border">
            <td>10</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Hungama "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/Hungama.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Hungama</td>
          </tr>

          <tr className="h-12 border">
            <td>11</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Resso "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/resso.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Resso / Tik Tok</td>
          </tr>

          <tr className="h-12 border">
            <td>12</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="MX Player "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/mx%20player.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> MX Player</td>
          </tr>

          <tr className="h-12 border">
            <td>13</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Boomplay "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/boomplay.png"
              ></img>
            </td>
            <td className=" text-left capitalize">Boomplay</td>
          </tr>

          <tr className="h-12 border">
            <td>14</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Anghami "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/anghami.png"
              ></img>
            </td>
            <td className=" text-left capitalize">Anghami</td>
          </tr>

          <tr className="h-12 border">
            <td>15</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Shazam "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/shazam.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize">Shazam</td>
          </tr>

          <tr className="h-12 border">
            <td>16</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Napster "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/napster.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize">Napster</td>
          </tr>

          <tr className="h-12 border">
            <td>17</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="7 Digital "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/7%20digital.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize">7 Digital</td>
          </tr>

          <tr className="h-12 border">
            <td>18</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Facebook  "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/fb.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize">Facebook/Instagram</td>
          </tr>

          <tr className="h-12 border">
            <td>19</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Deezer "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/Deezer.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Deezer</td>
          </tr>

          <tr className="h-12 border">
            <td>20</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Tidal "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/tidal.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Tidal</td>
          </tr>

          <tr className="h-12 border">
            <td>21</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Tencent "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/tencent.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Tencent/ Ultimate China</td>
          </tr>

          <tr className="h-12 border">
            <td>22</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="Tik Tok "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/tik%20tok.jpg"
              ></img>
            </td>
            <td className=" text-left capitalize"> Tik Tok</td>
          </tr>

          <tr className="h-12 border">
            <td>23</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6"
                disabled={storeobject?.submitted}
                value="more 200+ stores. "
                onChange={(e) => handlecheck(e)}
              />
            </td>
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/many%20more.png"
              ></img>
            </td>
            <td className=" text-left capitalize"> More 200+ DSP's.</td>
          </tr>
        </tbody>
      </table>
      <table className="table-fixed w-full bg-white  text-center my-5">
        <thead>
          <tr className=" font-normal h-14 border">
            <th className="w-1/12 ">#</th>
            <th className="w-1/12 ">Select</th>
            <th className="w-6/12 "></th>
            <th className=" w-2/12 text-left">Telecom Partners</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12 border-b">
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
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/crbt/jio.jpg"
              ></img>
            </td>
            <td className="text-left">Jio</td>
          </tr>
          <tr className="h-12 border-b">
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
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/crbt/Airtel.jpg"
              ></img>
            </td>
            <td className="text-left">Airtel</td>
          </tr>
          <tr className="h-12 border-b">
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
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/crbt/vi.jpg"
              ></img>
            </td>
            <td className="text-left">VI</td>
          </tr>
          <tr className="h-12 border-b">
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
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/crbt/bsnl.jpg"
              ></img>
            </td>
            <td className="text-left">BSNL</td>
          </tr>
          <tr className="h-12 border-b">
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
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/crbt/mtnl.jpg"
              ></img>
            </td>
            <td className="text-left">MTNL</td>
          </tr>
          <tr className="h-12 border-b">
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
            <td>
              <img
                className="h-14 w-42 mx-64"
                src="https://traklab.online/assets/img/clients/crbt/tata.jpg"
              ></img>
            </td>
            <td className="text-left">Tata Docomo</td>
          </tr>
        </tbody>
      </table>

      <div className="pb-4 bg-gray-100  text-blue-600 border-b">
        <p className="h-14 bg-white pt-1 pl-6">
          * Note: Videos may claimed by any one of these Partners( Merlin
          TrapBassHDTV, Merlin FUGA, Repost Network).
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
