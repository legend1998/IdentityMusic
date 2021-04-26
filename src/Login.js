import AWN from "awesome-notifications";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { auth, firedb } from "./firebaseconfig";
import validateRefs from "./utis/Utils";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";
import logo from "./utis/logo.png";
function Login() {
  //stats

  const [loading, setLoading] = useState();

  //hooks
  const [{}, dispatch] = useStateValue();
  const history = useHistory();

  let email = useRef();
  let password = useRef();

  let refs = [email, password];

  const loginUser = (e) => {
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
    }
  };

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
                Login <i className="fas fa-arrow-right mx-3"></i>
              </button>
            </div>
          </form>

          <Link to="/signup" className="p-3  text-gray-400">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
