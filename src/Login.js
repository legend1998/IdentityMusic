import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-screen w-full bg-blue-50 flex items-center justify-center">
      <div className="flex flex-col items-center md:w-3/4  lg:w-1/3">
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        <div className="space-y-6 mt-6 p-6 border rounded-xl bg-white w-full">
          <form action="#" method="post" className="">
            <label className="sr-only sm:not-sr-only text-gray-600">
              email address
            </label>
            <input
              type="email"
              placeholder="email"
              className="w-full mb-6 px-2 py-2 border border-indigo-200 rounded-sm focus:outline-none focus:border-indigo-600 "
            />
            <label
              htmlFor="password"
              className="sr-only sm:not-sr-only text-gray-600 "
            >
              password
            </label>
            <input
              type="password"
              placeholder="password"
              className="w-full px-2 py-2 border border-indigo-200 rounded-sm focus:outline-none focus:border-indigo-600 "
            />
            <div className="flex justify-between my-6">
              <label htmlFor="remember_me">
                <input type="checkbox" id="remember_me" value="remember me" />
                Remember me
              </label>

              <Link className="text-indigo-700" to="forgot_passowrd">
                forgot password?
              </Link>
            </div>
            <button className="bg-indigo-600 text-white w-full py-3 rounded-xl">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
