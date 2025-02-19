import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { SlLocationPin } from "react-icons/sl";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const Details = () => {
  return (
    <>
      <Navbar />
      <section>
        <div className="flex gap-62 p-5">
          {/* Back Bar */}
          <div className="flex gap-1 text-[#2F2F2F] ml-20">
            <MdOutlineArrowBackIos className="mt-1 size-6" color="#2F2F2F" />
            <p className="text-2xl">Back</p>
          </div>

          {/* Search Bar */}
          <div className="flex rounded-[12px] bg-[#FFFFFF] h-[58px] p-2 shadow-2xl dark:shadow-xl dark:shadow-black/50">
            <IoSearchSharp className="flex items-center mt-3" size="18px" />
            <input
              type="text"
              className="w-75 ml-1 p-1 cursor-pointer"
              placeholder="Job title, Keywords, or Company name"
            />
            <span className="flex items-center border-1 border-[#C1C1C1] h-6 mt-2 ml-1"></span>
            <div className="flex">
              <SlLocationPin className="flex justify-center items-center w-[20px] h-[15px] ml-0.5 mt-3" />
              <p className="font-[300] mt-2">Location</p>
            </div>
            <div className="flex justify-end ml-24 font-[600]">
              <button className="w-[100px] h-[39px] bg-[#0034D1] text-[white] rounded-[12px] cursor-pointer">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex">
          <div>
            <div className="flex gap-2">
              <div>Logo</div>
              <div className="flex flex-col">
                <h1>Product</h1>
                <p>Amazon</p>
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <FaRegBookmark />
                  <FiShare2 />
                </div>
                <div>Button</div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </>
  );
};

export default Details;
