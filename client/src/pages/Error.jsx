import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 text-center shadow-xl">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="text-gray-600">
            Oops! The page you are looking for could not be found.
          </p>
          <div className="flex flex-col">
            <Link
              to="/"
              className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Go back to Home
            </Link>
            <button
              className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go Back to Previous Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
