import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cuate from "./images/cuate.png";
import Logo from "./images/Logo.png";
import { FiMail } from "react-icons/fi";
import Google from "./images/Social Button.png";
import Apple from "./images/Apple - Original.png";
import Facebook from "./images/Facebook - Original.png";
import LinkedIn from "./images/LinkedIn - Original.png";
import Lock from "./images/Lock.png";
import User from "./images/user.png";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .matches(/^[A-Za-z]+$/, "First name must contain only letters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(3, "Last name must be at least 3 characters")
      .matches(/^[A-Za-z]+$/, "Last name must contain only letters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate("/login");
    },
  });

  return (
    <div className="flex w-screen h-full">
      <section className="flex flex-col p-15 bg-[#ffffff] text-[#2F2F2F] w-1/2 gap-5 items-center">
        {/* form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-start">
            <img src={Logo} alt="Logo" className="w-26 h-10" />
          </div>
          <h1 className="font-[600] text-3xl">Create your account</h1>
          <div className="flex flex-col gap-2">
            {/* First Name */}
            <div className="flex items-center border-1 border-gray-300 rounded-[8px] w-full h-10 p-2">
              <img src={User} alt="User Logo" className="w-5 h-5" />
              <input
                type="text"
                name="firstName"
                className="w-60 h-6 p-2 outline-none"
                placeholder="First name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
            ) : null}

            {/* Last Name */}
            <div className="flex items-center border-1 border-gray-300 rounded-[8px] w-full h-10 p-2">
              <img src={User} alt="User Logo" className="w-5 h-5" />
              <input
                type="text"
                name="lastName"
                className="w-60 h-6 p-2 outline-none"
                placeholder="Last name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
            ) : null}

            {/* Email */}
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

            {/* Password */}
            <div className="flex items-center border-1 border-gray-300 rounded-[8px] w-full h-10 p-2">
              <img src={Lock} alt="Lock Logo" className="w-6 h-6" />
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
              <div className="text-red-500 text-sm max-w-100">{formik.errors.password}</div>
            ) : null}

            {/* Confirm Password */}
            <div className="flex items-center border-1 border-gray-300 rounded-[8px] w-full h-10 p-2">
              <img src={Lock} alt="Lock Logo" className="w-6 h-6" />
              <input
                type="password"
                name="confirmPassword"
                className="w-60 h-6 p-2 outline-none"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm max-w-100">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-[#0034D1] text-white text-[20px] w-80 h-10 rounded-[8px] cursor-pointer font-[600]"
          >
            Create account
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
            <p className="font-[600]">Already have an account?</p>
            <span
              className="font-[600] text-[#0034D2] cursor-pointer"
              onClick={() => navigate(`/login`)}
            >
              Log in
            </span>
          </div>
        </form>
      </section>

      <section className="flex items-center justify-center w-1/2 bg-[#F2F2F2] shadow-xl shadow-black/50 z-10">
        {/* Image */}
        <img src={Cuate} alt="Logo" className="w-130 h-100" />
      </section>
    </div>
  );
};

export default Signup;