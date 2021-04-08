import React from "react";

function Language({ somefun }) {
  return (
    <div className="lg:p-10 p-2 bg-white my-10">
      <p className="px-5 text-xl border-b py-3 mb-5">Language</p>
      <p className="text-black font-semibold mb-3">
        In what language will you be writing your titles, artist name(s) and
        release description?
      </p>
      <select name="languge" id="" className="w-full h-10 bg-gray-50">
        <option value="default" defaultValue>
          --select--
        </option>
      </select>
    </div>
  );
}

export default Language;
