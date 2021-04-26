import React from "react";

function OverViewAlbum({ data }) {
  console.log(data);
  return (
    <div className=" flex items-center justify-center flex-wrap">
      <div className="">
        <img src={data.coverImage} width="450px" alt="" />
      </div>
      <div className="bg-white flex-1 h-full m-5">
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
