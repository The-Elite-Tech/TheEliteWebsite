import React from "react";
import Image from "../assets/4085219.webp";
import { NavLink } from "react-router-dom";
import { benifits } from "./data";

const Card = ({ title, content, buttonLabel }) => {
  return (
    <div className="bg-white shadow-lg m-auto rounded-b-[30px] text-center max-w-full min-h-full">
      <h2 className="text-xl font-bold mb-2 p-4 bg-slate-200">{title}</h2>
      <div className="p-10">
        <p className="mb-7">{content}</p>
        <a
          href="#readmore"
          className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
        >
          {buttonLabel}
        </a>
      </div>
    </div>
  );
};

const BenefitCard = ({ title, content }) => {
  return (
    <div className="bg-white shadow-lg m-auto rounded-xl text-center max-w-full min-h-full">
      <h2 className="text-xl font-bold mb-2 p-3 rounded-t-xl border-b-2 border-slate-300">{title}</h2>
      <div className="p-5">
        <p className="mb-2">{content}</p>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="  ">
      <div className="bg-slate-100">
        <div className="flex flex-row gap-10 py-20 px-5 md:px-24">
          <section className="mb-8 mx-auto flex flex-col justify-center ">
            <h2 className="text-2xl font-bold mb-4 max-w-4xl">
              Professional, institutional-grade, high-quality, accurate,
              reliable, trustworthy, actionable real-time premium trading
              signals and analysis for day-traders.
            </h2>
            <NavLink
              to="/pricing"
              className="bg-slate-900 hover:bg-slate-700 max-w-44 text-center text-white font-bold py-2 px-4 rounded"
            >
              Get started
            </NavLink>
          </section>
          <img
            src={Image}
            alt="Trading Image"
            className=" w-[30%] rounded-2xl shadow-lg hidden lg:block"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center items-center py-20 px-5 md:px-24">
          <h1 className="text-4xl  mb-4">Get started</h1>
          <h2 className="font-semibold text-center max-w-2xl">
            Whether you are an experienced or newbie trader, learn about us and
            why you should use our trading signals.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20 px-5 md:px-24">
          <Card
            title="About – Why The Elite International"
            content="There are several signal providers out there. Learn what makes us unique among them and why you should trade with us. We are certain to be the top signals provider on the market – learn here why."
            buttonLabel="Read More"
          />
          <Card
            title="Why Trade Forex"
            content="Learn about the advantages of trading Forex as a global speculative financial vehicle and why you should be a part of this market."
            buttonLabel="Read More"
          />
          {/* <Card
            title="Trading Guidelines"
            content="Study our general trading recommendations, guidelines & advice, applicable to all trading styles."
            buttonLabel="Read the Guidelines"
          />

          <Card
            title="Trader's Mindset"
            content="Learn how and why a trader needs to think differently in order to become a successful professional."
            buttonLabel="Read the Trader's Mindset"
          /> */}
      </div>
      <div className="px-5 md:px-24 py-8 bg-slate-300">
        <div className="flex flex-col justify-center items-center py-20 bg-slate-300">
          <h1 className="text-4xl text-center mb-4">Benefits of our Signals</h1>
          <h2 className="font-semibold text-center max-w-2xl">
            Reasons of why you should use our signals and how we differ from our competitors.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-20">
          {benifits.map((item, index) => (
            <BenefitCard title={item.h} content={item.p} key={index} />
          ))}
        </div>
      </div>
      </div>
      {/* <div className="px-5 md:px-24 py-8 bg-slate-300">
        <div className="flex flex-col justify-center items-center py-20">
          <h1 className="text-4xl mb-4">Services</h1>
          <h3 className="font-semibold text-center max-w-3xl">
            Our services reflect our mission, to take your trading to the next
            level and make you consistently profitable in order to achieve your
            trading/professional goals.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20">
          <Card
            title="Trade Signals"
            content="Our flagship product. A subscription service for accessing daily trading signals. More than 50 instruments available to choose from and a variety of billing plans to cater to your individual needs and budget."
            buttonLabel="View Plans & Pricing"
          />

          <Card
            title="Market Scanner"
            content="Access to our unique real-time market scanner dashboard. A subscription service for a special product that scans a huge amount of markets (almost 170), for an incredible number of technical trading signals."
            buttonLabel="View Market Scanner"
          />

          <Card
            title="REFER A FRIEND - Affiliate Program"
            content="A unique opportunity to diversify your income sources even further and securing a PASSIVE MONTHLY income by spreading the word and recommending our services."
            buttonLabel="Join Affiliate Program"
          />

          <Card
            title="Financial Source"
            content="The world’s top real-time news feed and live squawk terminal with unique features for the professional trading approach. Get the most out of market sentiment, fundamental analysis and news trading."
            buttonLabel="Join Financial Source"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Home;
