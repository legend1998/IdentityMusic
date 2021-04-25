import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="fixed border w-full">
      <div className="flex shadow-sm items-center justify-between h-16">
        <div>
          <img src="" alt="logo" />
        </div>
        <div>
          <Link className="px-8" to="/">
            Home
          </Link>
          <Link className="px-8" to="/about">
            About
          </Link>
          <Link className="px-8" to="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
