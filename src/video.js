import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firedb } from "./firebaseconfig";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";
import "./app.css";

function Video() {
  return (
    <div>
      <div className="center font-medium text-6xl">
        <h1 className="text-gray-500">Coming Soon</h1>
      </div>
    </div>
  );
}

export default Video;
