import React, { useRef, useState } from "react";
import validateRefs from "./utis/Utils";
import AWN from "awesome-notifications";
import "./notification.css";
import { auth, firedb } from "./firebaseconfig";
import { useHistory } from "react-router";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";

function Signup() {
  // stats

  const [Loading, setLoading] = useState(false);
  const [{}, dispatch] = useStateValue();
  //hooks

  const history = useHistory();

  let fname = useRef();
  let lname = useRef();
  let email = useRef();
  let password = useRef();

  var refs = [fname, lname, email, password];

  const createUser = (e) => {
    setLoading(true);
    e.preventDefault();
    let res = validateRefs(refs);
    if (res.success) {
      firedb
        .collection("user")
        .doc(email.current.value)
        .set({
          fname: fname.current.value,
          lname: lname.current.value,
          email: email.current.value,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data()));
          dispatch({
            type: "SET_USER",
            user: res.data(),
          });
          new AWN().success("account created successfully", {
            position: "bottom-right",
          });
        })
        .catch((e) => {
          new AWN()
            .error("something went wrong try again later", {
              position: "bottom-right",
            })
            .finally(() => {
              setLoading(false);
            });
        });
      auth
        .createUserWithEmailAndPassword(
          email.current.value,
          password.current.value
        )
        .then((data) => {
          if (data.user) {
          }
          history.replace("/panel/dashboard");
        })
        .catch((e) => {
          new AWN().error("something went wrong try again later", {
            position: "bottom-right",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      new AWN().warning(res.message, { position: "bottom-right" });
    }
  };
  return (
    <div className=" min-h-screen    w-full login border-8 border-white">
      <div className=" h-32">
        <img src="" alt="logo" className=" w-32 h-20" />
      </div>
      <div className="flex items-center w-full lg:w-2/3  h-full lg:h-2/3 justify-center">
        <div className="text-white w-full lg:w-1/2  p-5">
          <h1 className="text-7xl">Sign Up.</h1>
          <p className="text-2xl my-5 text-gray-500">
            TrakLab | Client Sign Up Portal
          </p>
          <form className="text-black ">
            <div className=" p-0 flex h-14 items-center ">
              <input
                type="text"
                ref={fname}
                placeholder="first name"
                name="fname"
                className="focus:outline-none h-full w-1/2 border p-3"
              />
              <input
                type="text"
                ref={lname}
                placeholder="last name"
                name="lname"
                className="focus:outline-none h-full w-1/2 border p-3"
              />
            </div>
            <input
              type="email"
              ref={email}
              placeholder="email"
              name="email"
              className="focus:outline-none h-14 w-full border p-3 mt-1"
            />
            <input
              type="password"
              ref={password}
              placeholder="password"
              name="password"
              className="focus:outline-none h-14 w-full border p-3 mt-1"
            />

            <div className="w-full flex items-center justify-end my-2 h-14">
              <button
                className="focus:outline-none h-full w-44 bg-blue-600 text-white p-5"
                onClick={(e) => createUser(e)}
              >
                Sign up <i className="fas fa-arrow-right mx-3"></i>
              </button>
            </div>
            <Link to="/" className="p-3  text-gray-400">
              already have an account | Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
