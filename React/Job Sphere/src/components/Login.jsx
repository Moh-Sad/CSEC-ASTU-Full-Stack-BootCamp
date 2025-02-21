import React from "react";
import Rafiki from "./images/rafiki.png";
import Logo from "./images/Logo.png";
import { FiMail } from "react-icons/fi";
import { CiLock } from "react-icons/ci";

const Login = () => {
  return (
    <div className="flex w-screen h-screen">
      <section className="flex items-center justify-center w-1/2 h-screen bg-[#F2F2F2] shadow-[6px_0_10px_-2px_rgba(0,0,0,0.2)] dark:shadow-[6px_0_10px_-2px_rgba(0,0,0,0.4)]">
        {/* Image */}
        <img src={Rafiki} alt="Logo" className="w-130 h-100" />
      </section>

      <section className="flex flex-col p-15 bg-[#ffffff] text-[#2F2F2F] w-1/2 gap-5 items-center">
        {/* form */}
        <form action="" className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-start">
            <img src={Logo} alt="Logo" className="w-26 h-10" />
          </div>
          <h1 className="font-[600] text-3xl">Log in to your account</h1>
          <div className="flex items-center border-1 border-gray-300 rounded-[8px] w-full h-10 p-2">
            <FiMail className="w-5 h-5" />
            <input
              type="text"
              className="w-60 h-6 p-2 outline-none"
              placeholder=" Email"
            />
          </div>
          <div className="flex items-center border-1 border-gray-300 rounded-[8px] w-full h-10 p-2">
            <CiLock className="w-6 h-6" />
            <input
              type="password"
              className="w-60 h-6 p-2 outline-none"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="bg-[#0034D1] text-white text-[20px] w-80 h-10 rounded-[8px] cursor-pointer font-[600]"
          >
            Login
          </button>
          <div className="flex items-center gap-2">
            <div className="border-1 border-gray-300 w-35 h-0"></div>
            <h1>OR</h1>
            <div className="border-1 border-gray-300 w-35 h-0"></div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
