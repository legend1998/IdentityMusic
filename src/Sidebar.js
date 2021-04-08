import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [showright, setshowright] = useState(false);
  return (
    <div className="lg:flex w-64 bg-sideblack font-sans   hidden items-center flex-col justify-between">
      <div className="w-52 flex flex-col justify-start px-6 my-3">
        <img src="" alt="logo" className="my-8 self-center" />
        <Link
          to="/panel/dashboard"
          className="my-2 text-gray-400 hover:text-gray-100"
        >
          Start
        </Link>
        <Link
          to="/panel/assets"
          className="my-2 text-gray-400 hover:text-gray-100"
        >
          Assets
        </Link>
        <span
          onClick={() => setshowright(!showright)}
          id="rightbutton"
          className="mt-2 cursor-pointer text-gray-400 hover:text-gray-100"
        >
          RightHolders &#x2304;
        </span>
        {showright ? (
          <div
            id="rightholders"
            className="duration-200 translate-y-10 delay-200 ease-in"
          >
            <Link
              to="/panel/artist"
              className="ml-5 text-gray-400 hover:text-gray-100"
            >
              Artist
            </Link>
            <br />
            <Link
              to="/panel/labels"
              className="ml-5 text-gray-400 hover:text-gray-100"
            >
              Labels
            </Link>
          </div>
        ) : null}
        <Link className="my-2 text-gray-400 hover:text-gray-100">
          Transactions
        </Link>
        <Link className="my-2 text-gray-400 hover:text-gray-100">FAQ</Link>
      </div>
      <div className="sm self-start mx-6 text-gray-500 text-xs flex flex-col border-t border-gray-700">
        <p className="mt-3  text-gray-400 hover:text-gray-100 cursor-pointer">
          My Account
        </p>
        <p className="mt-3 text-gray-400 hover:text-gray-100 cursor-pointer  ">
          Settings
        </p>
      </div>
      <div className="my-8 pb-8 flex justify-between border-b border-gray-700 items-center text-gray-300  text-start w-4/5 text-xs">
        <div className="cursor-pointer">
          <p>Yash Raj</p>
          <p>Trapbasshdtv</p>
        </div>
        <div>
          <i className="fas fa-cog cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
