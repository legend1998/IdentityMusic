import React from "react";

function KeyArtist({ close, keyartist }) {
  return (
    <div className="flex items-center justify-start m-5">
      <select name="artisttype" className="h-12 w-52 text-center border">
        <option value="default" defaultValue>
          --select--
        </option>
      </select>
      <input
        type="text"
        placeholder="Name"
        className="h-12 w-full pl-5 bg-gray-50 appearance-none outline-none border focus:border-purple-700"
      />
      <span
        className="mx-3 text-red-400 cursor-pointer"
        onClick={() => close(keyartist - 1)}
      >
        <i className="fas fa-times"></i>
      </span>
    </div>
  );
}

export default KeyArtist;
