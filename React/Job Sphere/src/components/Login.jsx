import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Rafiki from "./images/rafiki.png";
import Logo from "./images/Logo.png";
import { FiMail } from "react-icons/fi";
import Lock from "./images/Lock.png";
import Google from "./images/Social Button.png";
import Apple from "./images/Apple - Original.png";
import Facebook from "./images/Facebook - Original.png";
import LinkedIn from "./images/LinkedIn - Original.png";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email format"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate("/");
    },
  });

  return (
    <div className="flex w-screen h-screen">
      <section className="flex items-center justify-center w-1/2 h-screen bg-[#F2F2F2] shadow-xl shadow-black/50 z-10">
        {/* Image */}
        <img src={Rafiki} alt="Logo" className="w-130 h-100" />
      </section>

      <section className="flex flex-col p-15 bg-[#ffffff] text-[#2F2F2F] w-1/2 gap-5 items-center">
        {/* form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-start">
            <img src={Logo} alt="Logo" className="w-26 h-10" />
          </div>
          <h1 className="font-[600] text-3xl">Log in to your account</h1>

          {/* Email */}
          <div>
            <div className="flex items-center border-1 border-gray-300 rounded-[8px] w-full h-10 p-2">
              <FiMail className="w-5 h-5" />
              <input
                type="text"
                name="email"
                className="w-60 h-6 p-2 outline-none"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center border-1 border-gray-300 rounded-[8px] w-full h-10 p-2">
              <img src={Lock} alt="Lock icon" className="w-6 h-6" />
              <input
                type="password"
                name="password"
                className="w-60 h-6 p-2 outline-none"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm max-w-80">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="bg-[#0034D1] text-white text-[20px] w-80 h-10 rounded-[8px] cursor-pointer font-[600]"
          >
            Login
          </button>

          <div className="flex items-center gap-2">
            {/* Border line */}
            <div className="border-1 border-gray-300 w-35 h-0"></div>
            <h1>OR</h1>
            <div className="border-1 border-gray-300 w-35 h-0"></div>
          </div>

          <div className="flex gap-10">
            {/* Social Media */}
            <div className="cursor-pointer">
              <img src={Google} alt="Google Logo" className="w-12 h-12" />
            </div>
            <div className="border-2 border-gray-200 rounded-[8px] p-2 w-fit h-fit cursor-pointer">
              <img src={Apple} alt="Apple Logo" className="w-7 h-7" />
            </div>
            <div className="border-2 border-gray-200 rounded-[8px] p-2 w-fit h-fit cursor-pointer">
              <img src={Facebook} alt="Facebook Logo" className="w-7 h-7" />
            </div>
            <div className="border-2 border-gray-200 rounded-[8px] p-2 w-fit h-fit cursor-pointer">
              <img src={LinkedIn} alt="LinkedIn Logo" className="w-7 h-7" />
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <p className="font-[600]">Don&apos;t have an account?</p>
            <span
              className="font-[600] text-[#0034D2] cursor-pointer"
              onClick={() => navigate(`/signup`)}
            >
              Create account
            </span>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
