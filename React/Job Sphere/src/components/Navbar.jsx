import React from "react";
import logo from "./images/Logo.png";

const Navbar = () => {
  return (
    <>
      {/* Navbar */}
      <div className="flex items-center p-1 w-[1728px] h-[101.28px] bg-yellow-200">
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
    </>
  );
};

export default Navbar;
