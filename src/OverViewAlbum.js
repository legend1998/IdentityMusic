import React from "react";

function OverViewAlbum({ data }) {
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
            <p className="h-12 bg-white p-2">Message: {data?.message}</p>
          </div>
          <h1 className="text-xl font-semibold py-5 px-10 border-b ">
            Album Info
          </h1>
          <div className="m-10">
            <p className="">
              <span className="font-semibold">Title:</span> {data?.title}
            </p>
            <p className="">
              <span className="font-semibold">Title Version:</span>
              {data?.titleVersion}
            </p>
            <p className="">
              <span className="font-semibold">Label:</span> {data?.label}
            </p>
            <p className="">
              <span className="font-semibold">UPC:</span> {data?.upcEan}
            </p>
            <span className="font-semibold">(P):</span> {data?.pCopyright}
            <p>
              <span className="font-semibold">(C): </span>
              {data?.Ccopyright}
            </p>
            <p>
              <span className="font-semibold">Release Date:</span>
              {data?.releaseDate}
            </p>
            <p className="">
              <span className="font-semibold">Genre:</span> {data?.genre1}
            </p>
            <p>
              <span className="font-semibold">Language:</span> {data?.language}
            </p>
          </div>
        </div>
      </div>
    );
}

export default OverViewAlbum;
