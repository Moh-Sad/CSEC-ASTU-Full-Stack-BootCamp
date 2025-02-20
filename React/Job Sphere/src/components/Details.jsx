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
        {/* Description */}
        <div>
          <div className=" ml-20 mt-5 flex bg-[#FFFFFF] rounded-2xl w-200 shadow-2xl dark:shadow-xl dark:shadow-black/50">
            <div className="ml-20 flex p-2 gap-10 w-full">
              <div className="flex items-center">Logo</div>
              <div className="flex flex-col w-full p-5 gap-2">
                <h1>Product</h1>
                <div className="flex gap-2">
                  <p>Amazon</p>
                  <p className="flex"> * * * * *</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 items-end w-full">
                <div className="flex gap-5 p-2">
                  <FaRegBookmark size={25} />
                  <FiShare2 size={25} />
                </div>
                <div className="font-[600] p-2">
                  <button className="cursor-pointer bg-[#0034D1] w-30 h-10 text-white px-4 py-2 rounded-md">
                    <p>Apply now</p>
                  </button>
                </div>
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
