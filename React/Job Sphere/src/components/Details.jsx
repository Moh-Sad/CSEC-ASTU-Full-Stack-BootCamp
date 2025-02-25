import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { SlLocationPin } from "react-icons/sl";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import Logo from "./images/Logo.png";

const Details = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `https://joblisting-3hjv.onrender.com/api/jobs/${id}`
        );
        if (!response.ok) {
          throw new Error("Job not found");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleMark = (jobId) => {
    setSavedJobs((prevSavedJobs) => {
      const jobIndex = prevSavedJobs.findIndex((job) => job.id === jobId);
      if (jobIndex === -1) {
        const jobToAdd = job;
        return [...prevSavedJobs, { ...jobToAdd, isBookmarked: true }];
      } else {
        return prevSavedJobs.filter((job) => job.id !== jobId);
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <>
      <Navbar />

      <section>
        <div className="flex gap-62 p-5 text-[#2F2F2F]">
          {/* Back Bar */}
          <div className="flex gap-1 ml-20 cursor-pointer" onClick={() => navigate(`/`)}>
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
        <div className="flex text-[#2F2F2F] gap-5">
          {/* Description */}
          <div className="ml-20 my-5 bg-[#FFFFFF] rounded-2xl w-full shadow-2xl dark:shadow-xl dark:shadow-black/50">
            <div className="flex p-2 w-full">
              <div className="flex pt-10 px-5">
                <div className="flex w-13 h-13">
                  <img
                    src={job.logo || Logo}
                    alt={`${job.company} Logo`}
                    className="w-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full h-25 py-1 mt-0.5 gap-1 pt-8">
                <h1 className="font-[600] text-3xl">{job.title}</h1>
                <div className="flex font-[400] text-[20px] gap-2">
                  <p>{job.company}</p>
                  <p>* * * * *</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 items-end w-full">
                <div className="flex gap-5 p-2">
                  <FaRegBookmark className="cursor-pointer" size="20px" />
                  <FiShare2 className="cursor-pointer" size="20px" />
                </div>
                <div className="font-[600] p-2">
                  <button className="cursor-pointer bg-[#0034D1] w-30 h-10 text-white px-4 py-2 rounded-md">
                    <p>Apply now</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col px-10 py-5 gap-4">
                <div className="flex flex-col">
                  <p className="font-[600] text-[18px]">Job type:</p>
                  <p className="font-[400]">{job.type}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-[600] text-[18px]">Location:</p>
                  <p className="font-[400]">{job.location}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-[600] text-[18px]">Experience:</p>
                  <p className="font-[400]">{job.experienceLevel}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-[600] text-[18px]">Number of</p>
                  <p className="font-[600] text-[18px]">Applicants:</p>
                  <p className="font-[400]">{job.applicants || "N/A"}</p>
                </div>
              </div>
              <div className="fle flex-col gap-5 p-2">
                <div className="flex flex-col gap-2 p-2">
                  <h2 className="font-[600] text-[18px]">Job description</h2>
                  <p>{job.description}</p>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  <h2 className="font-[600] text-[18px]">
                    Key Responsibilities
                  </h2>
                  <ul className="list-disc pl-7">
                    {job.responsibilities?.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <section>
            <div>
              {/* Related Jobs */}
              <div className="flex flex-col my-5 mr-20 w-65 h-full bg-[#FFFFFF] rounded-2xl text-[#2F2F2F] p-4 gap-4 shadow-2xl dark:shadow-xl dark:shadow-black/50">
                <h1 className="flex justify-center items-center font-[600] text-3xl">
                  Related Jobs
                </h1>
                {savedJobs.length === 0 ? (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-[#2F2F2F] font-[400] text-lg">
                      No jobs have been saved yet.
                    </p>
                  </div>
                ) : (
                  savedJobs.map((job) => (
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
                        <h2 className="font-[400] text-[13px]">
                          {job.company}
                        </h2>
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
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Details;
