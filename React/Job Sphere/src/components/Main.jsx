import React, { useState, useEffect } from "react";
import { SlLocationPin } from "react-icons/sl";
import { IonRange } from "@ionic/react";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const Main = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://joblisting-rd8f.onrender.com/api/jobs?limit=50"
      );
      const data = await response.json();
      // Add a default logo if the job doesn't have one
      const jobsWithLogos = data.jobs.map((job) => ({
        ...job,
        logo: job.logo || "https://via.placeholder.com/150", // Default placeholder logo
      }));
      setJobs(jobsWithLogos);
    };
    fetchData();
  }, []);

  const handleMark = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );

    setSavedJobs((prevSavedJobs) => {
      const jobIndex = prevSavedJobs.findIndex((job) => job.id === jobId);
      if (jobIndex === -1) {
        const jobToAdd = jobs.find((job) => job.id === jobId);
        return [...prevSavedJobs, { ...jobToAdd, isBookmarked: true }];
      } else {
        return prevSavedJobs.filter((job) => job.id !== jobId);
      }
    });
  };

  return (
    <>
      <div className="flex gap-5 px-5">
        {/* Filter Section */}
        <div className="flex flex-col my-10 w-full h-full bg-[#FFFFFF] rounded-2xl text-[#2F2F2F] p-2 gap-4 shadow-2xl dark:shadow-xl dark:shadow-black/50">
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
        <div className="flex flex-col my-10 w-160 rounded-2xl text-[#2F2F2F] gap-4 p-2">
          {/* Search Bar */}
          <div className="flex rounded-[12px] bg-[#FFFFFF] w-150 h-[58px] p-2 shadow-2xl dark:shadow-xl dark:shadow-black/50">
            <IoSearchSharp className="flex items-center mt-3" size="18px" />
            <input
              type="text"
              className="w-75 ml-1 p-1"
              placeholder="Job title, Keywords, or Company name"
            />
            <span className="flex items-center border-1 border-[#C1C1C1] h-6 mt-2"></span>
            <div className="flex">
              <SlLocationPin className="flex justify-center items-center w-[20px] h-[15px] ml-0.5 mt-3" />
              <p className="font-[300] mt-2">Location</p>
            </div>
            <div className="flex justify-end ml-20">
              <button className="w-[100px] h-[39px] bg-[#0034D1] text-[white] rounded-[12px]">
                Search
              </button>
            </div>
          </div>

          {/* Job Cards */}
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex sticky rounded-2xl bg-[#FFFFFF] border-gray-300 border-1 w-full h-full shadow-2xl dark:shadow-xl dark:shadow-black/50 text-[#2F2F2F] p-1"
            >
              <div className="flex h-full">
                <div className="flex w-13 h-13 m-3">
                  <img
                    src={job.logo}
                    alt={`${job.company} Logo`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col w-230 py-1 mt-0.5 gap-2">
                <h1 className="font-[600] text-3xl">{job.title}</h1>
                <h2 className="font-[400] text-[20px]">{job.company}</h2>
                <div className="flex gap-2 text-[15px] font-[350]">
                  <div className="rounded-[4px] bg-[#EBEBEB] justify-center items-center p-1">
                    <p className="flex justify-center">{job.location}</p>
                  </div>
                  <div className="ounded-[4px] bg-[#EBEBEB] justify-center items-center p-1">
                    <p className="flex justify-center">{job.type}</p>
                  </div>
                  <div className="rounded-[4px] bg-[#EBEBEB] justify-center items-center p-1">
                    <p className="flex justify-center">
                      ${job.salaryMin} - ${job.salaryMax}
                    </p>
                  </div>
                </div>
                <div className="flex font-[390] text-[#000000_9px] w-full">
                  <p>{job.description}</p>
                </div>
              </div>
              <div className="flex gap-5 m-3 h-10">
                {job.isBookmarked ? (
                  <FaBookmark size="20px" onClick={() => handleMark(job.id)} />
                ) : (
                  <FaRegBookmark
                    size="20px"
                    onClick={() => handleMark(job.id)}
                  />
                )}
                <FiShare2 className="" size="20px" />
              </div>
            </div>
          ))}
        </div>

        {/* Saved Jobs */}
        <div className="flex flex-col z-0 my-10 w-full h-full bg-[#FFFFFF] rounded-2xl text-[#2F2F2F] p-4 gap-4 shadow-2xl dark:shadow-xl dark:shadow-black/50">
          <h1 className="flex justify-center items-center font-[600] text-3xl">
            Saved Jobs
          </h1>
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="flex rounded-2xl bg-[#FFFFFF] border-gray-300 border-1 shadow-2xl dark:shadow-xl dark:shadow-black/50 text-[#2F2F2F] p-1"
            >
              <div className="flex">
                <div className="flex w-7 h-7 m-3">
                  <img
                    src={job.logo}
                    alt={`${job.company} Logo`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col py-1 mt-0.5 gap-1 w-[70%]">
                <h1 className="font-[600] text-[16px]">{job.title}</h1>
                <h2 className="font-[400] text-[13px]">{job.company}</h2>
                <div className="flex gap-3 text-[10px] font-[350]">
                  <div className="w-full h-full rounded-[4px] bg-[#EBEBEB] justify-center items-center p-0.5">
                    <p className="flex justify-center">{job.location}</p>
                  </div>
                  <div className="w-full h-full rounded-[4px] bg-[#EBEBEB] justify-center items-center p-0.5">
                    <p className="flex justify-center">
                      ${job.salaryMin} - ${job.salaryMax}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mt-2 h-10">
                <IoCloseOutline
                  size="20px"
                  onClick={() => handleMark(job.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
