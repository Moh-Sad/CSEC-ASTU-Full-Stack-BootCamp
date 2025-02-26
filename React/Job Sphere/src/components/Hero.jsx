import React from "react";
import Frame from "./images/Frame 191.png";
import Frame2 from "./images/Frame 192.png";

const Hero = () => {
  return (
    <div className="flex relative z-0">
      {/* Hero */}
      <div>
        <img src={Frame} alt="Frame" />
      </div>
      <div className="flex absolute top-0 left-200">
        <img width={420} src={Frame2} alt="Frame2" />
      </div>
    </div>
  );
};

export default Hero;
