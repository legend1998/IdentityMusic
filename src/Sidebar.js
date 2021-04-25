import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebaseconfig";
import { useHistory } from "react-router";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  //stats
  const [{ user }] = useStateValue();
  const [showright, setshowright] = useState(false);
  const [toggle, settoggle] = useState(1);

  //hooks
  const history = useHistory();

  const logoutnow = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    auth.signOut();
    history.replace("/");
  };

  return (
    <div className="lg:flex w-64 bg-sideblack font-Sans   hidden items-center flex-col justify-between">
      <div className="w-52 flex flex-col justify-start px-6 my-3">
        <img src="" alt="logo" className="my-8 self-center" />
        <Link
          to="/panel/dashboard"
          onClick={() => settoggle(1)}
          className={
            toggle === 1
              ? "my-2 text-gray-100"
              : "my-2 text-gray-400 hover:text-gray-100"
          }
        >
          Start
        </Link>
        <Link
          onClick={() => settoggle(2)}
          to="/panel/assets"
          className={
            toggle === 2
              ? "my-2 text-gray-100"
              : "my-2 text-gray-400 hover:text-gray-100"
          }
        >
          Assets
        </Link>
        <span
          onClick={() => setshowright(!showright)}
          id="rightbutton"
          className={
            toggle === 3 || toggle === 4
              ? "my-2 text-gray-100 cursor-pointer"
              : "my-2 text-gray-400 hover:text-gray-100 cursor-pointer"
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
              onClick={() => settoggle(3)}
              className={
                toggle === 3
                  ? "ml-5 text-gray-100"
                  : "ml-5 text-gray-400 hover:text-gray-100"
              }
            >
              Artist
            </Link>
            <br />
            <Link
              onClick={() => settoggle(4)}
              to="/panel/labels"
              className={
                toggle === 4
                  ? "ml-5 text-gray-100"
                  : "ml-5 text-gray-400 hover:text-gray-100"
              }
            >
              Labels
            </Link>
          </div>
        ) : null}
        <Link
          to="/panel/transactions"
          onClick={() => settoggle(5)}
          className={
            toggle === 5
              ? "my-2 text-gray-100"
              : "my-2 text-gray-400 hover:text-gray-100"
          }
        >
          Transactions
        </Link>
        <Link
          to="/panel/dispute"
          onClick={() => settoggle(7)}
          className={
            toggle === 7
              ? "my-2 text-gray-100"
              : "my-2 text-gray-400 hover:text-gray-100"
          }
        >
          Dispute
        </Link>
      </div>
      <div className="sm self-start mx-6 text-gray-500 text-xs flex flex-col border-t border-gray-700">
        <Link
          to="/panel/account"
          onClick={() => settoggle(6)}
          className={
            toggle === 6
              ? "mt-3 text-gray-100 cursor-pointer"
              : "mt-3  text-gray-400 hover:text-gray-100 cursor-pointer"
          }
        >
          My Account
        </Link>
      </div>
      <div className="my-8 pb-8 flex justify-between border-b border-gray-700 items-center text-gray-300  text-start w-4/5 text-xs">
        <div className="cursor-pointer">
          <p>{user.fname + " " + user.lname}</p>
          <p>{user?.label}</p>
          <button onClick={(e) => logoutnow(e)}>Sign out</button>
        </div>
        <div>
          <i className="fas fa-cog cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
