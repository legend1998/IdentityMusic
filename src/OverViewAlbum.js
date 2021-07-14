import React, { useState } from "react";
import { statusSwitch } from "./utis/Utils";
import AWN from "awesome-notifications";

function OverViewAlbum({ data }) {
  const [showModal, setShowModal] = React.useState(false);

  function showdetails(status) {
    if (status?.error) {
      new AWN().modal(status?.error);
    }
  }

  console.log(data);
  if (!data) {
    return (
      <div className="text-center">
        <i className=" animate-spin fas fa-spinner fa-3x "></i>
      </div>
    );
  } else
    return (
      <div className=" flex items-start justify-center flex-wrap">
        <div className="">
          <img src={data.coverImage} width="450px" alt="" />
        </div>
        <div className="bg-white flex-1 h-full  mx-5">
          <div className="pb-4 bg-background  text-blue-600 border-b">
            <p className="h-auto bg-white py-3 pl-3  ">
              <button>{statusSwitch(data?.status)}</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a className="text-lg">{data?.message}</a>
              <br></br>
            </p>
            {showModal ? (
              <>
                <div className=" duration-200 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-5xl">
                    {/*content*/}
                    <div className="border-b   shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-3 pl-8 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-2xl font-semibold">Please Note</h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-albums  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className=" text-red  h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 pl-6 flex-auto">
                        <p className="m-4 mb-16 text-filter text-lg leading-relaxed">
                          Please fix the issues indicated below and then don't
                          forget to re-submit your release for distribution.
                        </p>
                        <p>
                          <a className="text-lg m-4">{data?.message}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>

          <h1 className="text-xl font-Regular py-3 px-10  border-b ">
            Release Info
          </h1>
          <div className="m-10">
            <p className="">
              <span className="font-medium capitalize ">Title: </span>{" "}
              {data?.title}
            </p>
            <p className="">
              <span className="font-medium capitalize">Title Version: </span>
              {data?.titleVersion}
            </p>
            <p className="">
              <span className="font-medium">Label: </span> {data?.recordLabel}
            </p>
            <p className="">
              <span className="font-medium">UPC: </span> {data?.upcEan}
            </p>
            <span className="font-medium">(P) Copyright: </span>{" "}
            {data?.pCopyright}
            <p>
              <span className="font-medium">(C) Copyright: </span>
              {data?.Ccopyright}
            </p>
            <p>
              <span className="font-medium">Release Date: </span>
              {data?.releaseDate}
            </p>
            <p className="">
              <span className="font-medium">Genre(s): </span> {data?.genre1}
              {", "}
              {data?.genre2}
            </p>
            <p className="capitalize">
              <span className="font-medium capitalize">Language: </span>
              {data?.language}
            </p>
          </div>
        </div>
      </div>
    );
}

export default OverViewAlbum;
