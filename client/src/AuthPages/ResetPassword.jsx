import { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const validate = Yup.object({
    password: Yup.string().required("Required"),
    confirmPass: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPass: "",
      }}
      validationSchema={validate}
      onSubmit={async (values, formik) => {
        setSubmitting(true);
        const email = localStorage.getItem("email")
        const data = {
          email: email,
          password: values.password,
        };
        console.log(data);
        try {
          await axios
            .put(`${import.meta.env.VITE_BASE_URL}/api/resetPassword`, data)
            .then((response) => {
              console.log("Response:", response.data);
              // localStorage.setItem("email", values.email);
              toast.success(response.data?.msg);
              navigate("/login");
            })
            .catch((error) => {
              console.error("Error:", error.response.data);
              if (error?.response?.data?.msg) {
                toast.error(error.response.data.msg);
              } else {
                toast.error("Something went wrong");
              }
            });
        } catch (e) {
          toast.error("Something went wrong");
        } finally {
          setSubmitting(false); // Set submitting to false once the request is done
        }
      }}
    >
      {() => (
        <Form className="h-screen">
          <div className="h-full">
            <div className="g-6 flex h-full flex-wrap items-center justify-center">
              {/* <!-- Right column container --> */}
              <div className="mb-12 md:mr-8 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                {/* <!--Sign in section--> */}
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-2xl font-bold">
                    Change Your Password
                  </p>
                </div>

                {/* <!-- Separator between social media sign in and email/password sign in --> */}
                <div className="my-2 flex items-center border-t border-neutral-300"></div>

                {/* <!-- User data --> */}
                <div className="grid grid-cols-1 gap-2 p-4 lg:p-0">
                  <TextField
                    name="password"
                    type="password"
                    placeholder="New Password"
                  />
                  <TextField
                    name="confirmPass"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>

                {/* <!-- Register button --> */}
                <div className="text-center lg:text-left mt-5">
                  <button
                    type="submit"
                    disabled={submitting} // Disable button if form is submitting
                    className={`text-white bg-gradient-to-r from-black to-gray-800 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-md dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-14 py-2.5 text-center me-2 mb-2 ${
                      submitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {submitting ? 'Submitting...' : 'Register'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ResetPassword
