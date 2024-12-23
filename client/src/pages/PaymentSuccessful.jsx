import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";

const PaymentSuccessful = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 text-center shadow-xl flex flex-col justify-center items-center">
          <h1 className="mb-4 text-4xl font-bold"><CiCircleCheck /></h1>
          <p className="text-gray-600">
            Payment Successful...!
          </p>
          <div className="flex flex-col">
            <Link
              to="/"
              className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Go back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessful
