import React from "react";
import Home from "./components/Home";
import Details from "./components/Details";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Validation from "./components/Validation";
const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/validate" element={<Validation />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
