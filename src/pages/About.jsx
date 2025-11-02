import React from 'react';
import aboutimg from "../assets/aboutimg.png";

const About = () => {
  return (
    <div className="container mx-auto w-11/12 py-16">
      <div>
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold leading-snug text-center pb-10">
          About CoBuilders
        </h2>

        {/* Content section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center">
          {/* Image */}
          <div>
            <img
              src={aboutimg}
              alt="About CoBuilders"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-5 md:items-start items-center text-center md:text-left justify-center h-full">
            <h2 className="text-2xl font-semibold">Who we are</h2>
            <p className="leading-[35px] text-gray-700 max-w-[600px]">
              At CoBuilders, we are dedicated to providing top-quality cleaning
              services that leave your home spotless and refreshed. With a team
              of highly trained professionals and eco-friendly cleaning
              solutions, we ensure a healthier and more comfortable living space
              for you and your family.....
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
