import { useState } from "react";
import { Stepper } from "react-form-stepper";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Validation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepError, setStepError] = useState("");

  const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];

  const initialValues = {
    title: "",
    type: "",
    salary: "",
    description: "",
    company: "",
    logo: "",
    isBookMarked: "",
    location: "",
    experienceLevel: "",
    currency: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Job Title is required")
      .min(3, "Job Title must be at least 3 characters"),
    type: Yup.string()
      .required("Job Type is required")
      .oneOf(
        ["Full-time", "Part-time", "Contract", "Internship"],
        "Invalid job type"
      ),
    salary: Yup.number()
      .required("Job Salary is required")
      .positive("Salary must be positive"),
    description: Yup.string()
      .required("Job Description is required")
      .min(3, "Description must be at least 3 characters"),
    company: Yup.string()
      .required("Job Company is required")
      .min(3, "Job Company must be at least 3 characters"),
    logo: Yup.string()
      .required("Job Logo is required")
      .url("Logo must be a valid URL"),
    isBookMarked: Yup.string()
      .required("Job Book Mark is required")
      .oneOf(["true", "false"], "Book Mark must be either 'true' or 'false'"),
    location: Yup.string()
      .required("Job Location is required")
      .min(3, "Job Location must be at least 3 characters"),
    experienceLevel: Yup.string()
      .required("Job Experience is required")
      .oneOf(
        ["Entry Level", "Mid Level", "Senior Level"],
        "Invalid experience level"
      ),
    currency: Yup.string()
      .required("Job Currency is required")
      .matches(/^[A-Z]{3}$/, "Currency must be exactly 3 uppercase letters"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        "https://joblisting-rd8f.onrender.com/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  const validateStep = async (values, step) => {
    let errors = {};

    if (step === 0) {
      if (!values.title) errors.title = "Job Title is required";
      else if (values.title.length < 3)
        errors.title = "Job Title must be at least 3 characters";

      if (!values.type) errors.type = "Job Type is required";
      else if (
        !["Full-time", "Part-time", "Contract", "Internship"].includes(
          values.type
        )
      )
        errors.type = "Invalid job type";

      if (!values.salary) errors.salary = "Job Salary is required";
      else if (isNaN(values.salary)) errors.salary = "Salary must be a number";
      else if (values.salary <= 0) errors.salary = "Salary must be positive";
    } else if (step === 1) {
      if (!values.description)
        errors.description = "Job Description is required";
      else if (values.description.length < 3)
        errors.description = "Description must be at least 3 characters";

      if (!values.company) errors.company = "Job Company is required";
      else if (values.company.length < 3)
        errors.company = "Job Company must be at least 3 characters";

      if (!values.logo) errors.logo = "Job Logo is required";
      else if (
        !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)(@\dx)?(\.[a-z]+)?$/.test(
          values.logo
        )
      )
        errors.logo = "Logo must be a valid URL";
    } else if (step === 2) {
      if (!values.isBookMarked)
        errors.isBookMarked = "Job Book Mark is required";
      else if (!["true", "false"].includes(values.isBookMarked))
        errors.isBookMarked = "Job Book Mark must be either 'true' or 'false'";

      if (!values.location) errors.location = "Job Location is required";
      else if (values.location.length < 3)
        errors.location = "Job Location must be at least 3 characters";

      if (!values.experienceLevel)
        errors.experienceLevel = "Job Experience is required";
      else if (
        !["Entry Level", "Mid Level", "Senior Level"].includes(
          values.experienceLevel
        )
      )
        errors.experienceLevel = "Invalid experience level";

      if (!values.currency) errors.currency = "Job Currency is required";
      else if (!/^[A-Z]{3}$/.test(values.currency))
        errors.currency = "Currency must be exactly 3 uppercase letters";
    }

    return errors;
  };

  return (
    <>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        styleConfig={{
          activeBgColor: "#0034D1",
          activeTextColor: "#fff",
          inactiveBgColor: "#f0f0f0",
          inactiveTextColor: "#000",
          completedBgColor: "#0034D1",
          completedTextColor: "#fff",
          size: "2em",
          circleFontSize: "1rem",
          labelFontSize: "0.875rem",
          borderRadius: "50%",
          fontWeight: "bold",
        }}
      />

      <div className="flex justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <Form className="flex flex-col gap-5 items-center p-5 m-5 rounded-2xl border-1 border-gray-500 w-200 bg-[#FFFFF]">
              {activeStep === 0 && (
                <>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Field
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Job Title"
                      className="h-10 w-full border-1 border-gray-300 rounded-2xl p-3 cursor-pointer"
                    />
                    {errors.title && touched.title && (
                      <div className="text-red-500 text-sm">{errors.title}</div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Field
                      as="select"
                      id="type"
                      name="type"
                      className="h-10 w-full border-1 border-gray-300 rounded-2xl p-3 cursor-pointer"
                    >
                      <option value="">Select Job Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </Field>
                    {errors.type && touched.type && (
                      <div className="text-red-500 text-sm">{errors.type}</div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Field
                      id="salary"
                      name="salary"
                      type="tel"
                      placeholder="Job Salary"
                      className="h-10 w-full border-1 border-gray-300 rounded-2xl p-3 cursor-pointer"
                    />
                    {errors.salary && touched.salary && (
                      <div className="text-red-500 text-sm max-w-100">
                        {errors.salary}
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeStep === 1 && (
                <>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Field
                      id="description"
                      name="description"
                      type="text"
                      placeholder="Job Description"
                      className="h-10 w-full border-1 border-gray-300 rounded-2xl p-3 cursor-pointer"
                    />
                    {errors.description && touched.description && (
                      <div className="text-red-500 text-sm">
                        {errors.description}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Field
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Job Company"
                      className="h-10 w-full border-1 border-gray-300 rounded-2xl p-3 cursor-pointer"
                    />
                    {errors.company && touched.company && (
                      <div className="text-red-500 text-sm">
                        {errors.company}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Field
                      id="logo"
                      name="logo"
                      type="text"
                      placeholder="Job Logo URL"
                      className="h-10 w-full border-1 border-gray-300 rounded-2xl p-3 cursor-pointer"
                    />
                    {errors.logo && touched.logo && (
                      <div className="text-red-500 text-sm">{errors.logo}</div>
                    )}
                  </div>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Field
                      as="select"
                      id="isBookMarked"
                      name="isBookMarked"
                      className="h-10 w-full border-1 border-gray-300 rounded-2xl p-3 cursor-pointer"
                    >
                      <option value="">Select Book Mark</option>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </Field>
                    {errors.isBookMarked && touched.isBookMarked && (
                      <div className="text-red-500 text-sm">
                        {errors.isBookMarked}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Field
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Job Location"
                      className="h-10 w-full border-1 border-gray-300 rounded-2xl p-3 cursor-pointer"
                    />
                    {errors.location && touched.location && (
                      <div className="text-red-500 text-sm">
                        {errors.location}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Field
                      as="select"
                      id="experienceLevel"
                      name="experienceLevel"
                      className="h-10 w-full border-1 border-gray-300 rounded-2xl p-3 cursor-pointer"
                    >
                      <option value="">Select Experience Level</option>
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                    </Field>
                    {errors.experienceLevel && touched.experienceLevel && (
                      <div className="text-red-500 text-sm">
                        {errors.experienceLevel}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Field
                      id="currency"
                      name="currency"
                      type="text"
                      placeholder="Job Currency (e.g., USD)"
                      className="h-10 w-full border-1 border-gray-300 rounded-2xl p-3 cursor-pointer"
                    />
                    {errors.currency && touched.currency && (
                      <div className="text-red-500 text-sm">
                        {errors.currency}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="flex items-center gap-4">
                {activeStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveStep((prevStep) => prevStep - 1)}
                    className="bg-[#0034D1] text-white w-28 h-10 rounded-2xl cursor-pointer"
                  >
                    Previous
                  </button>
                )}

                {activeStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={async () => {
                        const errors = await validateStep(values, activeStep);
                        if (Object.keys(errors).length === 0) {
                          setStepError("");
                          setActiveStep((prevStep) => prevStep + 1);
                        } else {
                          setStepError(
                            "Please fill out all fields correctly before proceeding."
                          );
                        }
                      }}
                      className="bg-[#0034D1] text-white w-28 h-10 rounded-2xl cursor-pointer"
                    >
                      Next
                    </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-[#0034D1] text-white w-28 h-10 rounded-2xl cursor-pointer"
                  >
                    Submit
                  </button>
                )}
              </div>
              {stepError && (
                      <div className="text-red-500 text-sm mt-2">
                        {stepError}
                      </div>
                    )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Validation;
