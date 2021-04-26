import React from "react";

function ViewAlbumMore({ data }) {
  return (
    <div className="bg-white m-3 lg:m-10 ">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold py-5 px-10 border-b flex-1">
          CallerTunes Codes
        </h1>
        <button className="bg-blue-500 text-white h-14 w-44 p-3 ml-3 hover:bg-blue-700">
          View SmartLink
        </button>
      </div>
      <div className="mx-10 py-10">
        <p className="">
          <span className="font-semibold">Jio:</span> {data?.title}
        </p>
        <p className="">
          <span className="font-semibold">Airtel:</span>
          {data?.titleVersion}
        </p>
        <p className="">
          <span className="font-semibold">Bsnl:</span> {data?.label}
        </p>
        <p className="">
          <span className="font-semibold">VI:</span> {data?.upcEan}
        </p>
        <span className="font-semibold">MTNL:</span> {data?.pcopyright}
        <p>
          <span className="font-semibold">Tata Docomo:</span> {data?.copyright}
        </p>
      </div>
    </div>
  );
}

export default ViewAlbumMore;
