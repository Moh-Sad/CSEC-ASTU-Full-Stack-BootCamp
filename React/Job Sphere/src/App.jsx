import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Main from "./components/Main";

const App = () => {
  return (
    <div className="bg-[#F3F3F3]">
      <Navbar />
      <Hero />
      <Main />
    </div>
  );
};

export default App;
