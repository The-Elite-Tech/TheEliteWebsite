import { useState } from "react";
// import Img from "../assets/registerImg.jpg";
import data from "../data/CountryCodes.json";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Img from "../assets/theelite.webp";

const Register = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validate = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Email is invalid").required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .max(10, "10 digits required")
      .min(10, "10 digits required")
      .matches(phoneRegExp, "Phone number is not valid"),
    countryCode: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPass: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        countryCode: "",
        address: "",
        city: "",
        state: "",
        country: "",
        password: "",
        confirmPass: "",
      }}
      validationSchema={validate}
      onSubmit={async (values, formik) => {
        setSubmitting(true);
        const data = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          countryCode: values.countryCode,
          address: values.address,
          city: values.city,
          state: values.state,
          country: values.country,
          password: values.password,
        };
        console.log(data);
        try{
          await axios
            .post(`${import.meta.env.VITE_BASE_URL}/api/register`, data)
            .then((response) => {
              console.log("Response:", response.data);
              localStorage.setItem("email", values.email);
      
              toast.success(response.data?.msg);
              navigate("/");
            }).then(async () => {
              const emailData = {
                firstName: values.firstName, 
                userEmail: values.email
              }
              await axios.post(`${import.meta.env.VITE_BASE_URL}/api/registerMail`, emailData)
            })
            .catch((error) => {
              console.error("Error:", error.response.data);
              if (error.response.data.msg) {
                toast.error(error.response.data.msg);
              } else {
                toast.error("Something went wrong");
              }
            });
        }catch(e){
          toast.error("Something went wrong");
        }finally {
          setSubmitting(false); // Set submitting to false once the request is done
        }
      }}
    >
      {(formik) => (
        <Form className="h-screen">
          <div className="h-full">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              {/* <!-- Left column container with background--> */}
              <div className="shrink-1 ml-6 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <img src={Img} className=" w-11/12 " alt="Sample image" loading="lazy"/>
              </div>

              {/* <!-- Right column container --> */}
              <div className="pt-12 md:mr-8 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                {/* <!--Sign in section--> */}
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-2xl font-bold">
                    Create an Account
                  </p>
                </div>

                {/* <!-- Separator between social media sign in and email/password sign in --> */}
                <div className="my-2 flex items-center border-t border-neutral-300">
                  {/* <p className="mx-4 mb-0 text-center font-semibold dark:text-black">
                      Or
                    </p> */}
                </div>

                {/* <!-- User data --> */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-4 lg:p-0">
                  <TextField
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                  <TextField
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                  />
                  <div className="lg:col-span-2">
                    <TextField name="email" type="email" placeholder="Email" />
                  </div>
                  <div className="lg:col-span-2 flex justify-between gap-2">
                    <div>
                      <Field
                        as="select"
                        name="countryCode"
                        className={`my-2 p-2.5 rounded-md text-gray-500 bg-transparent shadow-md shadow-[#040c166b]`}
                      >
                        <option value="">Select</option>
                        {data.map((item, index) => (
                          <option
                            key={index}
                            value={item.dial_code}
                          >{`${item.code} ${item.dial_code}`}</option>
                        ))}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="countryCode"
                        className="text-sm text-red-600"
                      />
                    </div>
                    <TextField
                      name="phoneNumber"
                      type="text"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2 lg:col-span-2">
                    <div className="col-span-4">
                      <TextField
                        name="address"
                        type="text"
                        placeholder="House no./ Area and City"
                      />
                    </div>
                    <div className="col-span-2">
                      <TextField name="city" type="text" placeholder="City" />
                    </div>
                    <div className="col-span-2">
                      <TextField name="state" type="text" placeholder="State" />
                    </div>
                    <div className="col-span-2">
                      <TextField
                        name="country"
                        type="text"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                  <TextField
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <TextField
                    name="confirmPass"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>

                {/* <!-- Register button --> */}
                <div className="text-center lg:text-left mt-5">
                  {/* <button
                    type="submit"
                    // className="inline-block rounded my-7 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    className="my-7 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-14 py-2.5 text-center me-2 mb-2 "
                  >
                    Register
                  </button> */}
                  <button
                    type="submit"
                    disabled={submitting} // Disable button if form is submitting
                    className={`text-white bg-gradient-to-r from-black to-gray-800 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-md dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-14 py-2.5 text-center me-2 mb-2 ${
                      submitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {submitting ? 'Submitting...' : 'Register'}
                  </button>

                  {/* <!-- Register link --> */}
                  <p className="pb-12 lg:mb-0 mt-2 pt-1 text-sm font-semibold">
                    Already have an account?{"  "}
                    <Link
                      to="/login"
                      className="text-blue-900 font-semibold transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                    >
                      Login Now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;

// {/* <!-- Facebook button--> */}
// <button className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
// {/* <!-- Facebook --> */}
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   className="mx-auto h-3.5 w-3.5"
//   fill="currentColor"
//   viewBox="0 0 24 24"
// >
//   <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
// </svg>
// </button>

// {/* <!-- Twitter button --> */}
// <button className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
// {/* <!-- Twitter --> */}
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   className="mx-auto h-3.5 w-3.5"
//   fill="currentColor"
//   viewBox="0 0 24 24"
// >
//   <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
// </svg>
// </button>

// {/* <!-- Linkedin button --> */}
// <button className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
// {/* <!-- Linkedin --> */}
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   className="mx-auto h-3.5 w-3.5"
//   fill="currentColor"
//   viewBox="0 0 24 24"
// >
//   <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
// </svg>
// </button>
