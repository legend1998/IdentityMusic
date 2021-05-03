import AWN from "awesome-notifications";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { auth, firedb } from "./firebaseconfig";
import validateRefs from "./utis/Utils";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";
import logo from "./utis/logo.png";
import firebase from "firebase";
function Login() {
  //stats

  const [loading, setLoading] = useState(false);

  //hooks
  const [{}, dispatch] = useStateValue();
  const history = useHistory();

  let email = useRef();
  let password = useRef();

  let refs = [email, password];

  const loginUser = (e) => {
    setLoading(true);
    e.preventDefault();

    let res = validateRefs(refs);
    if (res.success) {
      auth
        .signInWithEmailAndPassword(email.current.value, password.current.value)
        .then((data) => {
          if (data.user) {
            new AWN().success("logged In", { position: "bottom-right" });
            history.replace("/panel/dashboard");
          }
        })
        .catch((e) => {
          new AWN().alert(e.message, { position: "bottom-right" });
          setLoading(false);
          return;
        });
      firedb
        .collection("user")
        .doc(email.current.value)
        .get()
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user.data()));
          dispatch({
            type: "SET_USER",
            user: user.data(),
          });
        });
    } else {
      new AWN().alert(res.message, { position: "bottom-right" });
      setLoading(false);
      return;
    }
  };

  function signwithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(result);
        firedb
          .collection("user")
          .doc(user.email)
          .get()
          .then((user) => {
            localStorage.setItem("user", JSON.stringify(user.data()));
            dispatch({
              type: "SET_USER",
              user: user.data(),
            });
            new AWN().success("logged In", { position: "bottom-right" });
            history.replace("/panel/dashboard");
          });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  return (
    <div className="min-h-screen w-full border-8 border-white login">
      <div className=" h-32 p-10 ">
        <img src={logo} alt="logo" className="  h-20" />
      </div>
      <div className="flex items-end  w-full md:w-2/3 h-full   justify-center">
        <div className="text-white w-full lg:w-1/2 mt-10  p-5">
          <h1 className="text-7xl">Hello There.</h1>
          <p className="text-2xl my-5 text-gray-500">
            TrakLab | Client Login Portal
          </p>
          <form
            method="get"
            className="text-black "
            onSubmit={(e) => loginUser(e)}
          >
            <input
              type="text"
              placeholder="Email ID"
              name="email"
              ref={email}
              className="focus:outline-none h-14 w-full border p-3 mt-5"
            />
            <div className="my-2 p-0 flex h-14 items-center ">
              <input
                type="password"
                placeholder="Password"
                name="password"
                ref={password}
                className="focus:outline-none h-14 w-2/3 border p-3"
              />
              <button className="focus:outline-none h-14 w-1/3  text-black bg-white appearance-none capitalize">
                Forgot Password?
              </button>
            </div>
            <div className="w-full flex items-center justify-end ">
              <button
                type="submit"
                className="focus:outline-none h-full bg-blue-600 text-white p-5 w-44"
                onClick={(e) => loginUser(e)}
              >
                {loading ? (
                  <i className="fas fa-spinner animate-spin"></i>
                ) : (
                  <p className="">
                    Login <i className="fas fa-arrow-right mx-3"></i>
                  </p>
                )}
              </button>
            </div>
          </form>
          <div>
            <p className="flex items-center my-4">
              Sign in with
              <i
                onClick={() => {
                  signwithGoogle();
                }}
                className="fab mx-4 fa-google cursor-pointer fa-3x text-white"
              ></i>
            </p>
          </div>
          <Link to="/signup" className="py-3  text-gray-400">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
