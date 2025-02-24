import { useNavigate } from "react-router-dom";
import logo from "./images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Navbar */}
      <section className="flex flex-col z-100">
        <div className="flex items-center w-full h-[101.28px]">
          <div className="pl-30">
            {/* Logo */}
            <img className="w-[158px] h-[61.28px]" src={logo} alt="Logo" />
          </div>

          {/* Nav Links */}
          <div>
            <ul className="flex justify-between gap-[24px] px-30 cursor-pointer">
              <li className="text-[#0034D2] border-b-3 border-b-[#0034D2]">Job Search</li>
              <li>My Applications</li>
              <li>Companies</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Login/Signup */}
          <div className="flex gap-4 font-[600]">
            <button
              className="cursor-pointer bg-[#0034D1] w-[167px] h-[48px] text-white px-4 py-2 rounded-md hover:scale-110 transition-all duration-300"
              onClick={() => navigate(`/login`)}
            >
              <p>Login</p>
            </button>
            <button
              className="cursor-pointer border-1 border-[#0034D1] w-[167px] h-[48px] text-black px-4 py-2 rounded-md hover:bg-[#0034D1] hover:text-white"
              onClick={() => navigate(`/signup`)}
            >
              <p>Signup</p>
            </button>
          </div>
        </div>

        {/* Border */}
        <div className="border-3 border-gray-300"></div>
      </section>
    </>
  );
};

export default Navbar;
