import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebaseconfig";
import { useHistory, useLocation } from "react-router";
import { useStateValue } from "./StateProvider";
import logo from "./utis/logo.png";

function Sidebar() {
  //stats
  const [{ user }] = useStateValue();
  const [showright, setshowright] = useState(false);
  const matchurl = useLocation();

  //hooks
  const history = useHistory();

  const logoutnow = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    auth.signOut();
    history.replace("/");
  };

  return (
    <div className="lg:flex w-72 bg-sideblack  hidden items-center flex-col justify-between text-lg">
      <div className="w-54 flex flex-col justify-start px-8 my-2">
        <img src={logo} alt="logo" className="my-8 self-center" />
        <Link
          to="/panel/dashboard"
          className={
            matchurl.pathname.includes("dashboard")
              ? "my-1 text-gray-100"
              : "my-1 text-sidetext hover:text-gray-100"
          }
        >
          Start
        </Link>
        <Link
          to="/panel/assets"
          className={
            matchurl.pathname.includes("assets")
              ? "my-1 text-gray-100"
              : "my-1 text-sidetext hover:text-gray-100"
          }
        >
          Assets
        </Link>
        <span
          onClick={() => setshowright(!showright)}
          id="rightbutton"
          className={
            matchurl.pathname.includes("labels") ||
            matchurl.pathname.includes("artist")
              ? "my-1 text-gray-100 cursor-pointer"
              : "my-1 text-sidetext hover:text-gray-100 cursor-pointer"
          }
        >
          RightHolders &#x2304;
        </span>
        {showright ? (
          <div
            id="rightholders"
            className="transform duration-500 overflow-hidden "
          >
            <Link
              to="/panel/artist"
              className={
                matchurl.pathname.includes("artist")
                  ? "ml-5 text-gray-100"
                  : "ml-5 text-sidetext hover:text-gray-100"
              }
            >
              Artist
            </Link>
            <br />
            <Link
              to="/panel/labels"
              className={
                matchurl.pathname.includes("labels")
                  ? "ml-5 text-gray-100"
                  : "ml-5 text-sidetext hover:text-gray-100"
              }
            >
              Labels
            </Link>
          </div>
        ) : null}
        <Link
          to="/panel/transactions"
          className={
            matchurl.pathname.includes("transactions")
              ? "my-1 text-gray-100"
              : "my-1 text-sidetext hover:text-gray-100"
          }
        >
          Transactions
        </Link>
        <Link
          to="/panel/dispute"
          className={
            matchurl.pathname.includes("dispute")
              ? "my-1 text-gray-100"
              : "my-1 text-sidetext hover:text-gray-100"
          }
        >
          Dispute
        </Link>
        <a
          href="https://trapbasshdtv.tawk.help/"
          target="_blank"
          className="text-sidetext hover:text-white"
        >
          FAQ's
        </a>
      </div>
      <div className="sm self-start mx-6 text-sidetext text-sm flex flex-col border-t border-sidetext w-4/5 ">
        <Link
          to="/panel/account"
          className={
            matchurl.pathname.includes("account")
              ? "mt-2 text-gray-100 cursor-pointer"
              : "mt-2  text-sidetext hover:text-gray-100 cursor-pointer"
          }
        >
          My Account
        </Link>
      </div>
      <div className="my-8 pb-8 flex justify-between border-b border-sidetext items-center text-sidetext  text-start w-4/5 text-sm">
        <div className="cursor-pointer">
          <p>{user.fname + " " + user.lname}</p>
          <p>{user?.labelName}</p>
          <button
            className="bg-white h-6 pl-3 pr-3 mt-3 focus:outline-none "
            onClick={(e) => logoutnow(e)}
          >
            Sign out
          </button>
        </div>
        <div>
          <i className="fas fa-cog cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
