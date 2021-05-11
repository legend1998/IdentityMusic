import React, { useRef, useState } from "react";
import validateRefs from "./utis/Utils";
import AWN from "awesome-notifications";
import "./notification.css";
import { auth, firedb } from "./firebaseconfig";
import { useHistory } from "react-router";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import logo from "./utis/logo.png";

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
  let confirmpassword = useRef();

  var refs = [fname, lname, email, password, confirmpassword];

  const createUser = (e) => {
    setLoading(true);
    e.preventDefault();
    if (password.current.value !== confirmpassword.current.value) {
      new AWN().alert("password mismatch", {
        position: "bottom-right",
      });
      return;
    }
    let result = validateRefs(refs);
    if (result.success) {
      auth
        .createUserWithEmailAndPassword(
          email.current.value,
          password.current.value
        )
        .then((data) => {
          if (data.user) {
            var userdata = {
              fname: fname.current.value,
              lname: lname.current.value,
              email: email.current.value,
            };
            firedb
              .collection("user")
              .doc(email.current.value)
              .set(userdata)
              .then(() => {
                localStorage.setItem("user", JSON.stringify(userdata));
                dispatch({
                  type: "SET_USER",
                  user: userdata,
                });
                new AWN().success("account created successfully", {
                  position: "bottom-right",
                });
                history.replace("/panel/dashboard");
              })
              .catch((e) => {
                console.log(e.message);
                new AWN().alert(e.message, {
                  position: "bottom-right",
                });
                setLoading(false);
              });
          }
        })
        .catch((e) => {
          console.log(e.message);
          new AWN().alert(e.message, {
            position: "bottom-right",
          });
          setLoading(false);
        });
    } else {
      new AWN().warning(result.message, { position: "bottom-right" });
      setLoading(false);
    }
  };
  return (
    <div className=" min-h-screen    w-full login border-8 border-white">
      <div className=" h-32 p-10">
        <img src={logo} alt="logo" className=" h-20" />
      </div>
      <div className="flex items-center w-full lg:w-2/3  h-full  justify-center">
        <div className="text-white w-full lg:w-1/2 mt-10 p-5">
          <h1 className="text-7xl">Sign Up.</h1>
          <p className="text-2xl my-5 text-gray-500">
            TrakLab | Client Sign Up Portal
          </p>
          <form className="text-black ">
            <div className=" p-0 flex h-14 items-center ">
              <input
                type="text"
                ref={fname}
                placeholder="First Name"
                name="fname"
                className="focus:outline-none h-full w-1/2 border p-3"
              />
              <input
                type="text"
                ref={lname}
                placeholder="Last Name"
                name="lname"
                className="focus:outline-none h-full w-1/2 border p-3"
              />
            </div>
            <input
              type="email"
              ref={email}
              placeholder="Email ID"
              name="email"
              className="focus:outline-none h-14 w-full border p-3 mt-1"
            />
            <input
              type="password"
              ref={password}
              placeholder="Password"
              name="password"
              className="focus:outline-none h-14 w-full border p-3 mt-1"
            />
            <input
              type="password"
              ref={confirmpassword}
              placeholder="Confirm Password"
              className="focus:outline-none h-14 w-full border p-3 mt-1"
            />

            <div className="w-full flex items-center justify-end my-2 h-14">
              <button
                className="focus:outline-none h-full w-44 bg-blue-600 text-white p-5"
                onClick={(e) => createUser(e)}
              >
                {Loading ? (
                  <span className>
                    <i className="fas fa-spinner animate-spin text-white"></i>
                  </span>
                ) : (
                  <p>
                    Sign up <i className="fas fa-arrow-right mx-3"></i>
                  </p>
                )}
              </button>
            </div>
            <Link to="/" className="p-3  text-gray-400">
              Already have an Account | Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
