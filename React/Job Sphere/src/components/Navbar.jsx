import React from "react";
import logo from "./images/Logo.png";

const Navbar = () => {
  return (
    <>
      {/* Navbar */}
      <div className="flex flex-col">
        <div className="flex items-center w-[1728px] h-[101.28px]">
          <div className="pl-30">
            {/* Logo */}
            <img className="w-[158px] h-[61.28px]" src={logo} alt="Logo" />
          </div>
          {/* Nav Links */}
          <div>
            <ul className="flex justify-between gap-[24px] px-30">
              <li>Job Search</li>
              <li>My Applications</li>
              <li>Companies</li>
              <li>Contact Us</li>
            </ul>
          </div>
          {/* Login/Signup */}
          <div className="flex gap-4">
            <button className="bg-[#0034D1] w-[167px] h-[48px] text-white px-4 py-2 rounded-md">
              Login
            </button>
            <button className="border-1 border-[#0034D1] w-[167px] h-[48px] text-black px-4 py-2 rounded-md">
              Signup
            </button>
          </div>
        </div>
        {/* Border */}
        <div className="border-3 border-gray-300"></div>
      </div>
    </>
  );
};

export default Navbar;
