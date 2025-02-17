import React, { useState, useEffect } from "react";
import { SlLocationPin } from "react-icons/sl";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./RangeSlider.css";

const Main = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [savedJobs, setSavedJobs] = useState([]);
  const [filters, setFilters] = useState({
    datePosted: "",
    jobType: [],
    location: "",
    experienceLevel: "",
    salaryRange: [200, 120000],
    currency: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://joblisting-rd8f.onrender.com/api/jobs?limit=50"
        );
        const data = await response.json();
        const jobsWithLogos = data.jobs.map((job) => ({
          ...job,
          logo: job.logo || "https://via.placeholder.com/150",
          isBookmarked: false,
        }));
        setJobs(jobsWithLogos);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
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

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const filterJobs = () => {
    return jobs.filter((job) => {
      const matchesSearchQuery =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation =
        !filters.location ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesExperienceLevel =
        !filters.experienceLevel ||
        job.experienceLevel === filters.experienceLevel;

      const jobSalary = parseInt(job.salary.replace(/[^\d]/g, ""));

      const matchesSalaryRange =
        jobSalary >= filters.salaryRange[0] &&
        jobSalary <= filters.salaryRange[1];

      const matchesCurrency =
        !filters.currency || job.currency === filters.currency;
      const matchesJobType =
        filters.jobType.length === 0 || filters.jobType.includes(job.type);

      return (
        matchesSearchQuery &&
        matchesLocation &&
        matchesExperienceLevel &&
        matchesSalaryRange &&
        matchesCurrency &&
        matchesJobType
      );
    });
  };

  const filteredJobs = filterJobs();
  const currentPosts = filteredJobs.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex gap-5 px-5">
        {/* Filter Section */}
        <div className="flex flex-col my-10 w-250 h-full bg-[#FFFFFF] rounded-2xl text-[#2F2F2F] p-2 gap-4 shadow-2xl dark:shadow-xl dark:shadow-black/50">
          <h1 className="flex justify-center font-[600] text-3xl">Filter</h1>

          <div className="flex flex-col gap-1">
            <p>Date Posted</p>
            <div className="flex rounded-[8px] border-gray-300 border-2 h-[33px] ml-1">
              <select
                className="flex w-full ml-3 font-[300] cursor-pointer"
                value={filters.datePosted}
                onChange={(e) =>
                  handleFilterChange("datePosted", e.target.value)
                }
              >
                <option value="">All</option>
                <option value="24">Last 24 Hours</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Job Type</p>
            <div className="flex-col rounded-[8px] border-gray-300 border-2 gap-4 py-3 font-[390] ml-1">
              {[
                "Full-Time",
                "Part-Time",
                "Internship",
                "Contract",
                "Volunteer",
                "Hybrid",
                "Remote",
              ].map((type) => (
                <div className="flex ml-3" key={type}>
                  <input
                    className="mr-2 cursor-pointer"
                    type="checkbox"
                    checked={filters.jobType.includes(type)}
                    onChange={(e) => {
                      const newJobType = e.target.checked
                        ? [...filters.jobType, type]
                        : filters.jobType.filter((t) => t !== type);
                      handleFilterChange("jobType", newJobType);
                    }}
                  />
                  <label htmlFor="">{type}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Location</p>
            <div className="flex rounded-[8px] border-gray-300 border-2 gap-2 p-1 ml-1 font-[390] cursor-pointer">
              <SlLocationPin className="flex items-center w-[20px] h-[25px] " />
              <input
                type="text"
                placeholder="Enter your location"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Experience Level</p>
            <div className="flex rounded-[8px] border-gray-300 border-2 h-[33px] ml-1">
              <select
                className="flex w-full ml-3 font-[300] cursor-pointer"
                value={filters.experienceLevel}
                onChange={(e) =>
                  handleFilterChange("experienceLevel", e.target.value)
                }
              >
                <option value="">All</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            <p>Salary Range</p>
            <RangeSlider
              value={filters.salaryRange}
              onInput={(value) => handleFilterChange("salaryRange", value)}
              min={200}
              max={120000}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="flex ml-21">Input Manually</p>
            <div className="flex font-[390] justify-center gap-7">
              <div className="flex gap-1">
                <p>From</p>
                <input
                  type="text"
                  className="flex w-[37px] h-[23px] rounded-[8px] border-gray-300 border-2 cursor-pointer focus:w-[100px] focus:h-[30px] transition-all duration-100"
                  value={filters.salaryRange[0]}
                  onChange={(e) =>
                    handleFilterChange("salaryRange", [
                      Number(e.target.value),
                      filters.salaryRange[1],
                    ])
                  }
                />
              </div>

              <div className="flex gap-1">
                <p>To</p>
                <input
                  type="text"
                  className="flex w-[37px] h-[23px] rounded-[8px] border-gray-300 border-2 cursor-pointer justify-center focus:w-[100px] focus:h-[30px] transition-all duration-100"
                  value={filters.salaryRange[1]}
                  onChange={(e) =>
                    handleFilterChange("salaryRange", [
                      filters.salaryRange[0],
                      Number(e.target.value),
                    ])
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Currency</p>
            <div className="flex rounded-[8px] border-gray-300 border-2 h-[33px] ml-1">
              <select
                className="flex w-full ml-3 font-[300] cursor-pointer"
                value={filters.currency}
                onChange={(e) => handleFilterChange("currency", e.target.value)}
              >
                <option value="">All</option>
                <option value="USD">Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">Pound (£)</option>
                <option value="ETB">Birr</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center font-[600]">
            <button
              className="bg-[#0034D1] w-[167px] h-[40px] text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={() =>
                setFilters({
                  datePosted: "",
                  jobType: [],
                  location: "",
                  experienceLevel: "",
                  salaryRange: [200, 120000000],
                  currency: "",
                })
              }
            >
              Reset all filter
            </button>
          </div>
        </div>

        {/* Product Section */}
        <div className="flex flex-col my-10 z-0 w-160 rounded-2xl text-[#2F2F2F] gap-4">
          {/* Search Bar */}
          <div className="flex rounded-[12px] bg-[#FFFFFF] w-full h-[58px] p-2 shadow-2xl dark:shadow-xl dark:shadow-black/50">
            <IoSearchSharp className="flex items-center mt-3" size="18px" />
            <input
              type="text"
              className="w-75 ml-1 p-1 cursor-pointer"
              placeholder="Job title, Keywords, or Company name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Job Cards */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p>No jobs found matching the selected filters.</p>
            </div>
          ) : (
            <>
              {currentPosts.map((job) => (
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
                  <div className="flex flex-col w-full py-1 mt-0.5 gap-2 cursor-pointer">
                    <h1 className="font-[600] text-3xl ">{job.title}</h1>
                    <h2 className="font-[400] text-[20px]">{job.company}</h2>
                    <div className="flex gap-2 text-[15px] font-[350]">
                      <div className="rounded-[4px] bg-[#EBEBEB] justify-center items-center p-1">
                        <p className="flex justify-center">{job.location}</p>
                      </div>
                      <div className="rounded-[4px] bg-[#EBEBEB] justify-center items-center p-1">
                        <p className="flex justify-center">{job.type}</p>
                      </div>
                      <div className="rounded-[4px] bg-[#EBEBEB] justify-center items-center p-1">
                        <p className="flex justify-center">
                          ${200} - {job.salary}
                        </p>
                      </div>
                    </div>
                    <div className="flex font-[390] text-[#000000_9px] w-full">
                      <p>{job.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-5 m-3 h-10 cursor-pointer">
                    {job.isBookmarked ? (
                      <FaBookmark
                        size="20px"
                        onClick={() => handleMark(job.id)}
                      />
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

              {/* Pagination Controls */}
              <div className="flex justify-center gap-2 mt-4">
                {currentPage > 1 && (
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="px-4 py-2 rounded-md bg-[#EBEBEB] hover:bg-[#0034D1] hover:text-white transition-all duration-200"
                  >
                    Previous
                  </button>
                )}

                {Array.from(
                  { length: Math.ceil(filteredJobs.length / postsPerPage) },
                  (_, i) => {
                    const pageNumber = i + 1;
                    
                    if (
                      pageNumber === 1 ||
                      pageNumber ===
                        Math.ceil(filteredJobs.length / postsPerPage) || 
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1) 
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === pageNumber
                              ? "bg-[#0034D1] text-white"
                              : "bg-[#EBEBEB]"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      (pageNumber === currentPage - 2 && currentPage > 3) || 
                      (pageNumber === currentPage + 2 &&
                        currentPage <
                          Math.ceil(filteredJobs.length / postsPerPage) - 2) 
                    ) {
                      return (
                        <span key={pageNumber} className="px-4 py-2">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                )}

                {currentPage <
                  Math.ceil(filteredJobs.length / postsPerPage) && (
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className="px-4 py-2 rounded-md bg-[#EBEBEB] hover:bg-[#0034D1] hover:text-white transition-all duration-200"
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
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
                <div className="flex gap-5 text-[10px] font-[350]">
                  <div className="w-full h-full rounded-[4px] bg-[#EBEBEB] justify-center items-center p-0.5">
                    <p className="flex justify-center">{job.type}</p>
                  </div>
                  <div className="w-full h-full rounded-[4px] bg-[#EBEBEB] justify-center items-center p-0.5">
                    <p className="flex justify-center">
                      ${200} - {job.salary}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mt-2 h-10">
                <IoCloseOutline
                  className="cursor-pointer"
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
