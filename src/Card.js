import React from "react";

function Card() {
  return (
    <div className="float-left w-52 h-52 youtube">
      <div class="absolute w-52 h-52 bg-indigo-700 text-white rounded  flex items-center flex-col justify-center">
        <h1>John Doe</h1>
        <p>Architect & Engineer</p>
        <p>We love that guy</p>
      </div>
      <div class=" w-52 h-52 absolute rounded hover:opacity-0 transform duration-500 hover:scale-75">
        <img
          src="https://www.trapbasshdtv.online/images/trapbasshdtv%20.jpg"
          alt="Avatar"
        />
      </div>
    </div>
  );
}

export default Card;
