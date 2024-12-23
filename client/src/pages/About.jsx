import React from "react";

const About = () => {
  return (
    <div className="bg-slate-100">
      <h1 className="px-5 md:px-24 pt-8 text-3xl font-bold mb-3">About - Why Us</h1>
      <p className="px-5 md:px-24 mb-10 font-semibold">
        All you need to know about us and why you should use our services.
      </p>

      <div className="px-5 md:px-24 py-8 grid grid-cols-1 md:grid-cols-1 gap-10">
        {/* <div className="bg-white shadow-lg rounded-md mb-8 md:col-span-1">
          <h2 className="text-2xl font-bold mb-2 p-4 pl-6 bg-slate-200">
            Oversight
          </h2>
          <div className="p-6">
            <p className="mb-1 font-semibold">
              The Elite Internation is registered as a trading signals provider
              with the Federal Financial Supervisory Authority of India.
            </p>
            <p>We are physically located in Indore, Madhya Pradesh, India.</p>
          </div>
        </div> */}

        <div className="bg-white shadow-md rounded-lg mb-8 md:col-span-3">
          <h2 className="text-xl font-bold mb-2 p-4 bg-slate-200">Mission</h2>
          <div className="p-6">
            <p className="mb-4">
              Our mission is to take your trading to the next level and make you
              consistently profitable in order to achieve your
              trading/professional goals and maybe even life goals.
            </p>
            <ul className="list-disc px-10 mb-4">
              <li>
                If you are already a professional trader but want either
                additional confidence or enhance your results / increase
                profits, or just outsource your analysis, you are in the right
                place.
              </li>
              <li>
                In case you are on the edge of becoming a full-time independent
                trader, our service might be what it takes to achieve just that.
              </li>
              <li>
                Or in case you are just starting your trading journey or
                struggling to achieve positive results, our analysis will give
                you everything to place your trades with confidence and be
                profitable from day one.
              </li>
            </ul>
            <p>
              We strive to provide the best signals possible almost around the
              clock and put in all effort to achieve great and consistent
              results for every single customer.
            </p>
          </div>
        </div>
      </div>
      <div className="px-10 md:px-24 py-8 bg-slate-300">
        <h1 className="text-3xl font-bold text-center mb-20">
          What Makes Us Unique
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Quality Emphasis</h2>
            <p className="mb-4">
              We put emphasis on quality over quantity. At the same time, we
              offer a wide range of trading instruments to freely choose from.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Customer Value</h2>
            <p className="mb-4">
              We value every single customer as the most important one and
              prefer to have few happy customers over many unhappy ones.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">
              Fairness and Independence
            </h2>
            <p className="mb-4">
              We are always fair and our work ethic is second to none. Our
              market analysis is independent and hence totally free from outside
              influences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
