import React from "react";
import logo from "../assets/APS_LOGO.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [userData, setUserData] = useState(null);
  const nav = useNavigate();

  const signInFunction = async (e) => {
    e.preventDefault();

    const email = emailId.toLowerCase();
    const pass = password.toLowerCase();

    const response = await LoginService.login(email, pass);

    if (response.success === false) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1000);
    } else {
      nav("/adminDashBoard", { state: response });
    }
  };

  return (
    <div>
      {showAlert && (
        <div
          className="p-4 mb-4 text-sm text-fg-warning rounded-base bg-warning-soft bg-red-400"
          role="alert"
        >
          <span className="font-medium bg-red-600 p-1 rounded-xl">
            Warning alert!
          </span>{" "}
          INVALID CREDENTIALS TRY AGAIN !!
        </div>
      )}
      <section className="bg-gray-50 dark:bg-gray-200">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="https://apexmm.org/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 text-gray-900"
          >
            <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
            APEX PUBLIC SCHOOL
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-700 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={(e) => {
                      setEmailId(e.target.value);
                    }}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@admId.aps"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start"></div>
                </div>
                <button
                  onClick={(e) => {
                    if (emailId.length === 0 || password.length === 0) {
                      e.preventDefault();
                      setShowAlert(true);
                      setTimeout(() => {
                        setShowAlert(false);
                      }, 2000);
                    } else {
                      signInFunction(e);
                    }
                  }}
                  type="submit"
                  className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
