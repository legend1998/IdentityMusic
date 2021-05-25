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
    <div className="float-left w-52 h-52 youtube m-3" onClick={handleClick}>
      <div className="absolute w-52 h-52 bg-indigo-700 text-white rounded  flex items-center flex-col justify-center">
        <h1>{data?.name ? data.name : data.label}</h1>
        <p>{data?.name ? data?.label : null}</p>
        <p>{data?.locaiton || data?.location}</p>
      </div>
      <div className=" w-52 h-52 absolute rounded hover:opacity-0 transform duration-500 hover:scale-75 bg-white ">
        {data?.coverImage ? (
          <img src={data?.coverImage} alt="Avatar" />
        ) : (
          <div className="text-7xl text-white bg-black rounded- h-full flex items-center justify-center">
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
