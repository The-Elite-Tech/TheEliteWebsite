import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../components/TextField";

const OTPpage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(150);

  useEffect(() => {
    let interval;
    if (resendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [resendDisabled, timer]);
  //   const email = localStorage.getItem('email');
  //   console.log(email);
  const regenerateOTP = async () => {
    const data = {
      email: localStorage.getItem("email"),
    };
    try{
      await axios
          .post(`${import.meta.env.VITE_BASE_URL}/api/generateOTP`, data)
          .then((response) => {
            console.log("Response:", response.data);
            toast.success(response.data?.msg);
          }).catch((error) => {
            console.error("Error:", error.response.data);
            if (error.response.data.msg) {
              toast.error(error.response.data.msg);
            } else {
              toast.error("Something went wrong");
            }
          });
    }catch(e){
      toast.error("Unable to sent OTP again");
    }
    
  }
  const handleSubmit = async (values) => {
    setSubmitting(true);
    const data = {
      email: localStorage.getItem("email"),
      code: values.otp.toString(),
    };
    try{
      await axios
        .post(`${import.meta.env.VITE_BASE_URL}/api/verifyOTP`, data)
        .then((response) => {
          console.log("Response:", response.data);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data?.msg);
          navigate('/');
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
          if (error.response.data.msg) {
            toast.error(error.response.data.msg);
          } else {
            toast.error("Something went wrong");
          }
        })
    }catch(e){
      toast.error("Something went wrong");
    }finally {
      setSubmitting(false); // Set submitting to false once the request is done
    }
  };
  const validate = Yup.object({
    otp: Yup.number().required("Required"),
  });
  return (
    <Formik
      initialValues={{
        otp: "",
      }}
      validationSchema={validate}
      onSubmit={async (values, formik) => {
        console.log(values);
        handleSubmit(values);
        // toast("hi");
        formik.resetForm();
        // navigate("/verifyotp");
      }}
    >
      {(formik) => (
        <Form className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>Email Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>Enter 6 digit code sent to your email.</p>
                </div>
              </div>
              <div>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-full h-16 ">
                      <Field
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="number"
                        name="otp"
                        id="otp"
                        placeholder="XXXXXX"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center space-y-5">
                    <div>
                      {/* <button
                        type="submit"
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </button> */}
                      <button
                        type="submit"
                        disabled={submitting} // Disable button if form is submitting
                        className={`text-white bg-gradient-to-r from-black to-gray-800 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-md shadow-blue-500/50 dark:shadow-md dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-14 py-2.5 text-center me-2 mb-2 ${
                        submitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {submitting ? 'Verifying...' : 'Verify Account'}
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      {/* <button
                        className="flex flex-row items-center text-blue-600"
                        onClick={regenerateOTP}
                      >
                        Resend
                      </button> */}
                      <button
                        className={`flex flex-row items-center text-blue-600 ${
                          resendDisabled ? 'cursor-not-allowe text-blue-600/50' : ''
                        }`}
                        onClick={() => {
                          !resendDisabled && regenerateOTP();
                          setResendDisabled(true);
                          setTimer(150);
                        }}
                        disabled={resendDisabled}
                      >
                        {resendDisabled
                          ? `Resend in ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`
                          : 'Resend'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OTPpage;
