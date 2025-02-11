import React, { useState } from "react";
import { useEffect } from "react";
import { SlLocationPin } from "react-icons/sl";
import { IonRange } from "@ionic/react";
import { IoSearchSharp } from "react-icons/io5";

const Main = () => {
  const [jobs, setJobs] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://joblisting-rd8f.onrender.com/api/jobs?limit=50"
      );
      const data = await response.json();
      setJobs(data["jobs"]);
      console.log(jobs);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex gap-10 px-10">

        {/* Filter Section */}
        <div className="flex flex-col my-10 w-[300px] bg-[#FFFFFF] rounded-2xl text-[#2F2F2F] p-4 gap-4">
          <h1 className="flex justify-center font-[600] text-3xl">Filter</h1>

          <div className="flex flex-col gap-1">
            <p>Date Posted</p>
            <div className="flex rounded-[8px] border-gray-300 border-2 h-[33px] ml-1">
              <select className="flex w-full ml-3 font-[300]" name="" id="">
                <option value="">Last 24 Hours</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Job Type</p>
            <div className="flex-col rounded-[8px] border-gray-300 border-2 gap-4 py-3 font-[390] ml-1">
              <div className="flex ml-3">
                <input className="mr-2" type="checkbox" name="" id="" />
                <label htmlFor="">Full-time</label>
              </div>
              <div className="flex ml-3">
                <input className="mr-2" type="checkbox" name="" id="" />
                <label htmlFor="">Part-time</label>
              </div>
              <div className="flex ml-3">
                <input className="mr-2" type="checkbox" name="" id="" />
                <label htmlFor="">Internship</label>
              </div>
              <div className="flex ml-3">
                <input className="mr-2" type="checkbox" name="" id="" />
                <label htmlFor="">Contract</label>
              </div>
              <div className="flex ml-3">
                <input className="mr-2" type="checkbox" name="" id="" />
                <label htmlFor="">Volunteer</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Location</p>
            <div className="flex rounded-[8px] border-gray-300 border-2 gap-2 p-1 ml-1 font-[390]">
              <SlLocationPin className="flex items-center w-[20px] h-[25px]" />
              <p>Enter your location</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Experience Level</p>
            <div className="flex rounded-[8px] border-gray-300 border-2 h-[33px] ml-1">
              <select className="flex w-full ml-3 font-[300]" name="" id="">
                <option value="">Intermediate</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Salary Range</p>
            <IonRange
              aria-label="Dual Knobs Range"
              dualKnobs={true}
              value={{
                lower: 20,
                upper: 80,
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="flex ml-21">Input Manually</p>
            <div className="flex font-[390] justify-center  gap-7">
              <div className="flex gap-1">
                <p>From</p>
                <input
                  type="text"
                  className="flex w-[37px] h-[23px] rounded-[8px] border-gray-300 border-2"
                />
              </div>

              <div className="flex gap-1">
                <p>To</p>
                <input
                  type="text"
                  className="flex w-[37px] h-[23px] rounded-[8px] border-gray-300 border-2"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Currency</p>
            <div className="flex rounded-[8px] border-gray-300 border-2 h-[33px] ml-1">
              <select className="flex w-full ml-3 font-[300]" name="" id="">
                <option value="">Dollar ($)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="flex flex-col my-10 w-[361px] rounded-2xl text-[#2F2F2F] gap-4">
          <div className="flex rounded-[12px] bg-[#FFFFFF] w-125 h-[38px] p-2">
            <IoSearchSharp className="flex items-center mt-0.5" size="18px" />
            <input type="text" className="w-70 ml-1" placeholder="Job title, Keywords, or Company name" />
            <span className="flex items-center border-1 border-[#C1C1C1] h-6" size=""></span>
            <div className="flex">
            <SlLocationPin className="flex justify-center items-center w-[20px] h-[15px] ml-0.5 mt-1" />
            <p className="font-[300]">Location</p>
            </div>
            <div>
              <button> </button>
            </div>
          </div>

          <div className="flex rounded-2xl bg-[#FFFFFF] border-gray-300 border-1 w-100 h-40">

          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Main;
