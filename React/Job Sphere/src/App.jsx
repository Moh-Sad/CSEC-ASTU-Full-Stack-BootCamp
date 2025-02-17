import React from "react";
import Home from "./components/Home";
import Details from "./components/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="bg-[#F3F3F3]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
