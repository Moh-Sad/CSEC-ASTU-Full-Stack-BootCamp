import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Main from "./Main";

const Home = () => {
  return (
    <div className="bg-[#F3F3F3]">
      <Navbar />
      <Hero />
      <Main />
    </div>
  );
};

export default Home;
