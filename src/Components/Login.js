import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import signupBackground from "../Asets/signup-background.svg";
import teamwork from "../Asets/teamwork.svg";
import { Link } from "react-router-dom";

function Login(props) {
  const [cred, setcred] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const host = "http://localhost:9000";

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: cred.email,
        password: cred.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.sucess) {
      // Navigate to the dashboard or another route
      localStorage.setItem("token", json.jwtData);
      props.showAlert("Login Successfully" ,"success")
      navigate("/");
    } else {
      props.showAlert("Please Enter Valid details" ,"danger")
    }
    console.log(json);
  };

  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value }); // Correctly updates the state based on input name
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-100">
      <div className="container max-w-[950px] bg-white shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-6 md:p-10">
        {/* Left Section */}
        <div className="relative hidden md:block">
          <img
            src={signupBackground}
            alt="Login Background"
            className="w-full h-auto object-contain"
          />
          <img
            src={teamwork}
            className="absolute top-36 left-1/2 transform -translate-x-1/2 w-[70%]"
            alt="Teamwork Illustration"
          />
        </div>

        {/* Right Section */}
        <div className="w-full max-w-md mx-auto md:mx-0 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
            Login
          </h1>
          <p className="text-gray-600 text-center md:text-left">
            Login to access your personal notes app!
          </p>
          <form onSubmit={handlesubmit} className="space-y-6">
            {/* Email Input */}
            <InputWithIcon
              iconClass="fa-envelope"
              type="email"
              placeholder="Enter Email"
              name="email"
              value={cred.email}
              onChange={onChange}
              required
            />

            {/* Password Input */}
            <InputWithIcon
              iconClass="fa-lock"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={cred.password}
              onChange={onChange}
              required
            />

            {/* Login Button */}
            <button
              className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-500 hover:to-green-500 text-white shadow-md"
            >
              Login
            </button>
          </form>

          {/* Links Section */}
          <div className="pt-4 text-center text-sm text-gray-500">
            <p>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
            <p className="mt-2">
              Forgot Password?{" "}
              <Link to="/reset-password" className="text-blue-500 hover:underline">
                Reset Password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Component
const InputWithIcon = ({ iconClass, ...props }) => (
  <div className="relative">
    <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500">
      <i className={`fa-solid ${iconClass}`}></i>
    </div>
    <input
      className="w-full bg-gray-100 border border-gray-300 pl-12 pr-4 py-2 rounded-lg focus:bg-white focus:border-blue-400 focus:outline-none"
      {...props}
    />
  </div>
);

export default Login;
