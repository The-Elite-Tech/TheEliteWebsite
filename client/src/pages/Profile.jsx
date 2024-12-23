import React, { useState, useEffect } from "react";
import axios from "axios";
import data from "../data/CountryCodes.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";

function capitalizeEachWord(sentence) {
    return sentence
        .split(' ')          // Split the sentence into words
        .map(word =>         // Map each word to a new version
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');          // Join the words back into a single string
}

const Profile = () => {
  const navigate = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validate = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
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
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    plan: ""
  });
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch user data
    let token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast.error("Unauthorized! Please Login Again.");
        navigate("/login");
      });
  }, [editing]);

  const handleSubmit = (data) => {
    let token = localStorage.getItem("token");
    axios
      .put(`${import.meta.env.VITE_BASE_URL}/api/updateUser`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // setUser(response.data);
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast.error("Unauthorized! Please Login Again.");
        navigate("/login");
      });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 px-3 pb-2 border-b-2 w-full">Profile Page</h1>
      {editing ? (
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            countryCode: user.countryCode,
            address: user.address,
            city: user.city,
            state: user.state,
            country: user.country,
          }}
          validationSchema={validate}
          onSubmit={async (values, formik) => {
            setSubmitting(true);
            const data = {
              firstName: values.firstName,
              lastName: values.lastName,
              phoneNumber: values.phoneNumber,
              countryCode: values.countryCode,
              address: values.address,
              city: user.city,
              state: values.state,
              country: values.country,
              password: values.password,
            };
            console.log(data);
            try {
              handleSubmit(data);
            } catch (e) {
              toast.error("Something went wrong");
            } finally {
              setSubmitting(false); // Set submitting to false once the request is done
            }
          }}
        >
          {() => (
            <Form className="">
              <div className="md:ml-20 md:my-10">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                  {/* <!-- Right column container --> */}
                  <div className="mb-12 md:mr-8 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                    {/* <!--Sign in section--> */}
                    <div className="flex flex-row items-center justify-center lg:justify-start">
                      <p className="mb-0 mr-4 text-xl font-semibold">
                        Update your Account
                      </p>
                    </div>

                    {/* <!-- Separator between social media sign in and email/password sign in --> */}
                    <div className="my-2 flex items-center border-t border-neutral-300">
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
                            placeholder="House no./ Area"
                          />
                        </div>
                        <div className="col-span-2">
                          <TextField name="city" type="text" placeholder="City" />
                        </div>
                        <div className="col-span-2">
                          <TextField
                            name="state"
                            type="text"
                            placeholder="State"
                          />
                        </div>
                        <div className="col-span-2">
                          <TextField
                            name="country"
                            type="text"
                            placeholder="Country"
                          />
                        </div>
                      </div>
                    </div>

                    {/* <!-- Register button --> */}
                    <div className="text-center lg:text-left">
                      <button
                        type="submit"
                        disabled={submitting} // Disable button if form is submitting
                        className={`text-white bg-gradient-to-r from-black to-gray-800 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-md shadow-blue-500/50 dark:shadow-md dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-14 py-2.5 text-center me-2 mb-2 ${
                          submitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {submitting ? "Submitting..." : "Update Profile"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="ml-10 mb-10">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">
              Welcome! {capitalizeEachWord(user.firstName)}
            </h2>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Full Name:</strong> {capitalizeEachWord(user.firstName)} {capitalizeEachWord(user.lastName)}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.countryCode} {user.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {capitalizeEachWord(user.address)}
            </p>
            <p>
              <strong>State:</strong> {capitalizeEachWord(user.state)}
            </p>
            <p>
              <strong>Country:</strong> {capitalizeEachWord(user.country)}
            </p>
            <p>
              <strong>Plan:</strong> {capitalizeEachWord(user.plan)}
            </p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-green-500 text-white py-2 px-8 rounded-md"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
