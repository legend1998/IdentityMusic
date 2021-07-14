import React from "react";
import { useHistory } from "react-router-dom";

function Card({ data }) {
  const history = useHistory();

  const handleClick = () => {
    if (!data?.name) {
      history.push(`/panel/view_labels/${data.id}`);
    } else {
      history.push(`/panel/view_artist/${data.id}`);
    }
  };
  return (
    <div
      className="float-left w-60 h-60 youtube m-5 cursor-pointer "
      onClick={handleClick}
    >
      <div className="absolute w-60 h-60 bg-indigo-700 text-white items-end flex-col ">
        <h1 className="font-medium tracking-wide mt-32 ml-4 	text-3xl">
          {data?.name ? data.name : data.label}
        </h1>

        <a
          className="font-base tracking-wider ml-4 underline cursor-pointer align-text-bottom pt-4	"
          onClick={handleClick}
        >
          View
        </a>
      </div>
      <div className=" w-60 h-60 absolute  hover:opacity-0 transform duration-100 hover:scale-20 bg-white ">
        {data?.coverImage ? (
          <img src={data?.coverImage} alt="Avatar" />
        ) : (
          <div className="text-7xl text-white bg-black  h-full flex items-center justify-center">
            {data?.name
              ? data?.name?.split(" ").map((e) => e[0])
              : data?.label?.split(" ").map((e) => e[0])}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
