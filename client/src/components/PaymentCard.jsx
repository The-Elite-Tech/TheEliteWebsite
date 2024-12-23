import axios from "axios";
import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// I have a minor project for my collage, it is a mern application which has jwt authentication, email otp verification and razorpay integration for payments. It has two actors users and admins. About the website- it is a forex trading insight giving website, which is based on subscription model, once the user purchase the subscription then it will be added to a telegram group for the given period of time.

const PaymentCard = ({ plan }) => {
  const navigate = useNavigate();
  async function handleSubmit(amount) {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      } else {
        const data = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("data", data)
        const responsekey = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/getkey`
        );
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/checkout`,
          { amount }
        );
        // console.log(responsekey.data.key);
        console.log(response.data.order);
        const options = {
          key: responsekey.data.key,
          amount: response.data.order.amount,
          currency: "INR",
          name: "The Elite International",
          description: "Tutorials",
          order_id: response.data.order.id,
          // callback_url: `${import.meta.env.VITE_BASE_URL}/api/paymentVerification`,
          handler: async function (res) {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = res;
            const data = {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            };
            console.log(data);
            const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/api/paymentVerification`,
              data
            );
            console.log(response.data);
            if (response.data.success) {
              const plan = {
                plan : `${amount}`
              }
              const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/api/updatePlan`,plan,{
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              toast.success(response.data?.msg);
              navigate("/");
            }
          },
          prefill: {
            name: data.data.firstName,
            email: data.data.email,
            contact: data.data.phoneNumber,
          },
          theme: {
            color: "blue",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unauthorized! Please Login Again.");
      navigate("/login");
    }
  }
  return (
    <div className="w-full  p-8 bg-gradient-to-r from-gray-600 to-gray-400 rounded-xl shadow-lg">
      <div className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center">
        <p className="font-normal uppercase text-white">{plan.name}</p>
        <h1 className="mt-6 flex justify-center gap-1 text-5xl font-normal text-white">
          <span className="mt-2 text-xl">₹</span>
          {plan.price} <span className="self-end text-xl">/month</span>
        </h1>
      </div>
      <div className="p-0">
        <ul className="grid grid-cols-1 md:grid-cols-1 items-center gap-4 text-white">
          <li className="flex items-center gap-4">
            <CiCircleCheck size={"30px"} />
            <p className="font-normal">{plan.trades}</p>
          </li>
          {plan?.data.map((item, index) => (
            <li className="flex items-center gap-4" key={index}>
            <CiCircleCheck size={"30px"} />
            <p className="font-normal text-start">{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12 p-0 flex justify-center items-center">
        <button
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 text-white bg-slate-900 py-2 px-5 rounded-lg"
          onClick={() => {
            handleSubmit(plan.price);
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
