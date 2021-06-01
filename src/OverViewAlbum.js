import React, { useState } from "react";
import { statusSwitch } from "./utis/Utils";
import AWN from "awesome-notifications";

function OverViewAlbum({ data }) {
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
          <div className="pb-4 bg-gray-100  text-blue-600 border-b">
            <p className="h-auto bg-white py-3 pl-3  ">
              <button onClick={() => showdetails(data)}>
                {statusSwitch(data?.status)}
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a className="text-lg">{data?.message}</a>
              <br></br>
            </p>
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
              <span className="font-medium">Release Date:</span>
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
