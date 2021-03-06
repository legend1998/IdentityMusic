import React, { useEffect, useState } from "react";
import OverViewAlbum from "./OverViewAlbum";
import VIewTrackAlbum from "./VIewTrackAlbum";
import ViewAlbumStats from "./ViewAlbumStats";
import { statusSwitch } from "./utis/Utils";
import ViewAlbumMore from "./ViewAlbumMore";
import { useParams } from "react-router";
import { firedb } from "./firebaseconfig";
import AWN from "awesome-notifications";
import { downloadcsv, downloadxlsx } from "./utis/Utils";
import { useHistory } from "react-router-dom";

function Viewalbum() {
  const params = useParams();
  const [show, setshow] = useState(false);
  const [tab, setab] = useState(1);
  const [album, setalbum] = useState(null);
  const history = useHistory();
  const [showModal, setShowModal] = React.useState(false);
  const [showbutton, setShowButton] = React.useState(false);

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

  function handlebackclick() {
    history.goBack("/panel/assets");
  }

  const passive =
    "text-gray-500 bg-tab   w-1/4 text-center h-16 py-5 hover:font-semibold cursor-pointer";
  const active =
    "border-b-2   border-indigo-600 bg-white w-1/4 text-center font-medium py-5 h-16 cursor-pointer";
  return (
    <div>
      {/* header */}
      {album ? (
        <div className="flex px-3 py-8 flex-wrap">
          <div className="w-20 text-center">
            <i
              className="fas fa-arrow-left fa-2x py-5 cursor-pointer hover:text-gray-700"
              onClick={() => handlebackclick()}
            ></i>
          </div>
          <div className="flex-1 flex min-w-max">
            <img src={album?.coverImage} width="150px" alt="" />
            <div className="px-5 w-full">
              <div className="flex items-center justify-center">
                <h2 className=" flex-1 text-3xl font-medium py-5 border-b">
                  {album.title}
                </h2>
                {showbutton ? (
                  <>
                    <button onClick={() => setShowModal(true)}>
                      {statusSwitch(album?.status)}
                    </button>
                  </>
                ) : null}

                {showModal ? (
                  <>
                    <div className=" duration-200 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-5xl">
                        {/*content*/}
                        <div className="border-b   shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-3 pl-8 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-2xl font-semibold">
                              Please Note
                            </h3>

                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-albums  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                            >
                              <span className=" text-red  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ??
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 pl-6 flex-auto">
                            <p className="m-4 mb-16 text-filter text-lg leading-relaxed">
                              Please fix the issues indicated below and then
                              don't forget to re-submit your release for
                              distribution.
                            </p>
                            <p>
                              <a className="text-lg m-4">{album?.error}</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </div>
              <p className="text-albums text-md font-normal">
                by {album.primaryArtist}
              </p>
              <p className="text-albums text-md font-normal">
                Released Date: {album.releaseDate}
              </p>
              <p className="text-albums text-md font-normal">
                UPC: {album.upcEan}
              </p>
            </div>
          </div>
          {/* action */}
          <div className="py-3">
            <button
              onClick={() => setshow(!show)}
              className="bg-blue-700 hover:bg-blue-800 w-64 h-12 focus:outline-none text-white"
            >
              Actions <i class="fas fa-chevron-down ml-6"></i>
            </button>
            {show ? (
              <ul className="absolute bg-white w-64 rounded focus:outline-none font-Light shadow-lg  border cursor-pointer">
                <li className="h-8 pl-5 pt-2   hover:bg-tab focus:border-none">
                  <a href={album?.coverImage} className="" target="blank">
                    Download Artwork
                  </a>
                </li>

                <li className="h-6 pl-5  hover:bg-tab ">
                  <button
                    className="focus:outline-none"
                    onClick={() => downloadcsv(album)}
                  >
                    Download Metadata (CSV)
                  </button>
                </li>
                <li className="h-6 pl-5  hover:bg-tab">
                  <button
                    className="focus:outline-none"
                    onClick={() => downloadxlsx(album)}
                  >
                    Download Metadata (XLSX)
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-44">
          <i className="fas fa-spinner"></i>
        </div>
      )}
      {/* tab */}
      <div className="flex border">
        <span className={tab === 1 ? active : passive} onClick={() => setab(1)}>
          Overview
        </span>
        <span className={tab === 2 ? active : passive} onClick={() => setab(2)}>
          Tracks
        </span>
        <span className={tab === 3 ? active : passive} onClick={() => setab(3)}>
          Stats
        </span>
        <span className={tab === 4 ? active : passive} onClick={() => setab(4)}>
          More
        </span>
      </div>
      {/* body */}
      <div className="bg-background min-h-screen p-10">
        {tab === 1 ? <OverViewAlbum data={album} /> : null}
        {tab === 2 ? <VIewTrackAlbum id={params.id} /> : null}
        {tab === 3 ? <ViewAlbumStats stats={album?.stats} /> : null}
        {tab === 4 ? <ViewAlbumMore codes={album?.codes} /> : null}
      </div>
    </div>
  );
}

export default Viewalbum;
