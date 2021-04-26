import React from "react";
import { useHistory } from "react-router-dom";

function Card({ data }) {
  const history = useHistory();

  const handleClick = () => {
    if (data?.location) {
      history.push(`/panel/view_labels/${data.id}`);
    } else {
      history.push(`/panel/view_artist/${data.id}`);
    }
  };
  return (
    <div className="float-left w-52 h-52 youtube" onClick={handleClick}>
      <div class="absolute w-52 h-52 bg-indigo-700 text-white rounded  flex items-center flex-col justify-center">
        <h1>{data?.name}</h1>
        <p>{data?.label}</p>
        <p>{data?.locaiton || data?.location}</p>
      </div>
      <div class=" w-52 h-52 absolute rounded hover:opacity-0 transform duration-500 hover:scale-75 bg-white p-5">
        {data?.coverImage ? (
          <img src={data?.coverImage} alt="Avatar" />
        ) : (
          <div className="text-7xl text-white bg-black rounded-full h-full flex items-center justify-center">
            {data?.name.split(" ")[0][0]}
            {data?.name.split(" ")[1][0]}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
