import React, { useEffect, useState } from "react";
import { firedb } from "./firebaseconfig";
import AWN from "awesome-notifications";
import { useParams } from "react-router";
import { statusSwitch } from "./utis/Utils";
import { Link } from "react-router-dom";

function ViewAlbumMore({ data }) {
  const [album, setalbum] = useState(null);
  const params = useParams();
  const [showg, setShowg] = React.useState(false);
  const [showw, setShoww] = React.useState(false);
  const [showh, setShowh] = React.useState(false);
  const [showj, setShowj] = React.useState(false);
  const [showy, setShowy] = React.useState(false);
  const [shows, setShows] = React.useState(false);
  const [showa, setShowa] = React.useState(false);
  const [showr, setShowr] = React.useState(false);
  const [showam, setShowam] = React.useState(false);

  useEffect(() => {
    firedb
      .collection("album")
      .doc(params.id)
      .get()
      .then((res) => {
        setalbum(res.data());
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }, [params.id]);

  return (
    <div className="">
      <div className="h-auto bg-white ml-10 mr-10 ">
        <p className="text-black text-lg text-center justify-items-center p-4">
          Release Links will be updated as soon as your release get live on
          Music Platforms.
        </p>
      </div>
      <div className="bg-white m-3 lg:m-10 ">
        <div className="bg-white">
          <table className=" table-fixed  text-gray-700 w-full text-left">
            <thead className="  ">
              <tr className="h-14 border-b font-medium tracking-wide  ">
                <th className=" w-1/6 "></th>
                <th className=" w-3/6 pr-24 ">Service</th>
                <th className=" w-1/6  ">Release Date</th>
                <th className=" w-1/6 text-center ">Status</th>
              </tr>
            </thead>
            <tbody className="font-regular text-2xl ">
              <tr
                onClick={() => setShowg(true)}
                className="h-20 text-lg  hover:bg-gray-50 border-b cursor-pointer"
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fgaana.png?alt=media&token=532e2fb2-a8d6-46ca-a623-ccfd8d194641"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Gaana</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {statusSwitch(album?.status)}
                </td>
              </tr>
              {showg ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Gaana}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShoww(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fwynk.png?alt=media&token=8a27c10e-a2f0-465c-bb2a-cc4b9d9cc94f"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Wynk Music</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showw ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Wynk}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowh(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fhungama.png?alt=media&token=f9428176-4a60-45ce-a6f3-06888e3d70e1"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Hungama</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showh ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Hungama}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowj(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fsaavan.png?alt=media&token=72d7273e-32b4-43e8-ba63-1f8d808a349d"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Jio Saavan</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showj ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Saavan}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowy(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fyt%20music.png?alt=media&token=b33254a5-9d2f-4bcc-b3d3-697adbf665b3"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Youtube Music</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showy ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Ytmusic}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShows(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fspotify.png?alt=media&token=183ad3fe-3e58-4c11-96e2-0e4d6c8894ab"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Spotify</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {shows ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Spotify}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowa(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fapple.png?alt=media&token=28e9f65b-7215-49d6-ae4b-9b68b6c89afa"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Apple Music</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showa ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Apple}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowr(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fresso.png?alt=media&token=74e7f658-a9d2-4c7e-a6d6-ff7e3c99a426"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Resso</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showr ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Resso}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowam(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Famazon.png?alt=media&token=325a6c0d-4712-452d-8eae-6e6030a4166a"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Amazon Music</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showam ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.amazon}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewAlbumMore;
