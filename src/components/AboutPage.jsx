import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-2">
      <div className="bg-white w-full sm:py-10 py-8">
        <h1 className="sm:text-4xl text-slate-800 text-3xl font-bold italic mb-3">
          About Shortify
        </h1>
        <p className="text-gray-700 text-sm mb-8 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full">
          <b>Shortify</b> is your go-to tool for quick and easy URL shortening. Whether you're a content creator, marketer, or just someone looking to clean up long URLs, <b>Shortify</b> makes it simple to generate short, shareable links. With an intuitive design and fast setup, you can start shortening links in no time!
        </p>
        <div className="space-y-5 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full">
          <div className="flex items-start">
            <FaLink className="text-blue-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Simple & Fast URL Shortening
              </h2>
              <p className="text-gray-600">
                Shorten your long URLs in just a few clicks. <b>Shortify</b> makes it quick and easy to create short, easy-to-share links, so you can focus on what matters.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaShareAlt className="text-green-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Share with Ease
              </h2>
              <p className="text-gray-600">
                Whether you're sharing on social media, via email, or through messaging, short URLs look cleaner and are easier to share. Share your links with confidence and simplicity.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaEdit className="text-purple-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Customizable Links
              </h2>
              <p className="text-gray-600">
                With <b>Shortify</b>, you can customize your shortened links to make them more recognizable or brand-friendly. Personalize your links to enhance their impact!
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaChartLine className="text-red-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Track Your Link Performance
              </h2>
              <p className="text-gray-600">
                Monitor how your links are performing with <b>Shortify's</b> built-in analytics. Track clicks, referral sources, and location-based insights to optimize your link-sharing strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
