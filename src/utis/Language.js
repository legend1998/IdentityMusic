import React, { Component } from "react";
import Select from "react-select";

function Language({ somefun, language }) {
  const top100Films = [
    { label: "English", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
  ];

  return (
    <div className="lg:p-10 p-2 bg-white my-10">
      <p className="px-2 text-2xl border-b py-3 mb-5">Language</p>
      <p className="text-black font-medium py-3 mb-3">
        In what language will you be writing your titles, artist name(s) and
        release description?
      </p>

      <select
        name="language  "
        defaultValue={language}
        onChange={(e) => somefun(e.target.value)}
        className="h-14 px-3 w-full text-center bg-box focus:outline-none "
      >
        <option value="default"> -- Select --</option>
        <option value="English"> English</option>
        <option value="Hindi"> Hindi</option>
        <option value="Russian"> Russian</option>
      </select>
    </div>
  );
}

export default Language;
