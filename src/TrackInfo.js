import React, { useState } from "react";
import KeyArtist from "./utis/KeyArtist";

function TrackInfo({ track, close, index }) {
  const [keyartist, setkeyartist] = useState(0);
  const [ownisrc, setownisrc] = useState(0);
  const [lyrics, setlyrics] = useState(false);

  return (
    <div className="lg:p-10 p-2 bg-white my-10">
      <div className="flex items-center justify-between border-b">
        <p className="text-xl py-3 mb-1">Track ({index + 1}) </p>
        <p className="text-sm">Singer</p>
        <span
          onClick={() => close(track - 1)}
          className="h-10 w-10 rounded-full border flex items-center justify-center"
        >
          <i className="fas fa-times text-red-500"></i>
        </span>
      </div>
      <p className="text-lg mt-5">Audio File</p>
      <div className="border h-12">
        <label
          htmlFor="audio-file"
          className="w-full h-full bg-gray-100 flex items-center"
        >
          <p className="pl-5 text-gray-400">
            Upload your files here (stereo wav files only minimum bit depth 16
            bit,sample rate :44.1 KHz)
          </p>
          <input
            id="audio-file"
            type="file"
            accept="image/wav"
            className="hidden"
            placeholder=""
          />
        </label>
      </div>
      <div className="grid grid-rows-2  mt-5">
        <p className="text-lg">
          Language of Lyrics
          <span className="mx-5 text-xs text-gray-400">
            (Select "instrumental" if no lyrics present there.)
          </span>
        </p>
        <select
          className="appearance-none focus:outline-none w-full h-12 bg-gray-100 "
          name=""
          id=""
        >
          <option value="defualt" defaultChecked>
            --select--
          </option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-6 my-5">
        <div className="col">
          <p className="text-lg">Release Title</p>
          <input
            type="text"
            placeholder="release title"
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          />
        </div>
        <div className="col">
          <p className="text-lg">Title Version</p>
          <input
            type="text"
            placeholder="title  version"
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border focus:border-purple-700"
          />
        </div>
      </div>
      <div className="grid grid-rows-2  mt-5">
        <p className="text-lg">Artist (Indicate only one in this field) *</p>
        <input
          className="appearance-none focus:outline-none w-full h-12 bg-gray-100 px-5 text-gray-600"
          readOnly
          value="yash raj"
        />
      </div>
      {Array.from(Array(keyartist)).map((data, index) => (
        <KeyArtist close={setkeyartist} keyartist={keyartist} key={index} />
      ))}

      <button
        onClick={() => setkeyartist(keyartist + 1)}
        className="text-purple-900 py-3 focus:outline-none"
      >
        <i className="fas fa-plus"></i> add other artist and comtibutors.
      </button>
      <div className="grid grid-flow-col grid-rows-1 grid-cols-2 my-5 gap-5">
        <div>
          <p className="text-md">Do you already have your own ISRC code?</p>
          <div className="py-5    flex items-center justify-between">
            <label>
              <input
                type="radio"
                name="ownupc"
                onChange={() => setownisrc(1)}
              />
              Yes(required if previously released = yes above)
            </label>
            <label>
              <input
                type="radio"
                name="ownupc"
                onChange={() => setownisrc(0)}
              />
              No
            </label>
          </div>
          <p className={ownisrc ? "hidden" : "text-sm text-gray-600"}>
            OK, we'll generate one for you when we send your release.
          </p>
        </div>
        <div className={ownisrc ? "block" : "hidden"}>
          <p className="text-xl">ISRC *</p>
          <input
            type="text "
            placeholder="isrc"
            required
            className="h-12 px-5 w-full bg-gray-50 appearance-none outline-none border border-red-700"
          />
        </div>
      </div>
      <div>
        <p className="text-lg">Explicit Lyrics? </p>
        <div className="my-5">
          <label htmlFor="">
            <input type="radio" name="el" defaultChecked />
            No
          </label>
          <label className="ml-10">
            <input type="radio" name="el" />
            Yes
          </label>
        </div>
      </div>
      <div className="mt-5">
        <h3
          className="cursor-pointer border-t py-4 text-lg "
          onClick={() => setlyrics(!lyrics)}
        >
          <i className="fas fa-caret-right"></i> Lyrics (optional)
        </h3>
        <textarea
          name="lyrics"
          className={
            lyrics
              ? "border w-full h-64 focus:outline-none p-5 bg-gray-50 text-sm"
              : "hidden"
          }
        ></textarea>
      </div>
    </div>
  );
}

export default TrackInfo;
