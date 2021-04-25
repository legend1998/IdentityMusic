import React from "react";

function Language({ somefun, language }) {
  return (
    <div className="lg:p-10 p-2 bg-white my-10">
      <p className="px-5 text-xl border-b py-3 mb-5">Language</p>
      <p className="text-black font-semibold mb-3">
        In what language will you be writing your titles, artist name(s) and
        release description?
      </p>
      <select
        name="languge"
        id=""
        defaultValue={language}
        className="w-full h-10 bg-gray-50"
        onChange={(e) => somefun(e.target.value)}
      >
        <option value="default" defaultValue>
          --Select--
        </option>
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="russian">Russian</option>
      </select>
    </div>
  );
}

export default Language;
