import React from 'react'
import { whychoose } from '../data/whychoose'

const WhyChoose = () => {
  return (
    <div>
         <div className=" py-10">
              <div className="container mx-auto w-11/12">
                {/* Heading */}
                <h3 className="text-xl sm:text-2xl md:text-4xl font-bold leading-snug text-center pb-10">
                  why choose CoBuilders?
                </h3>
        
                {/* Offers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {whychoose.map((choose, id) => (
                    <div key={id} className="flex flex-col items-center text-center gap-4">
                      <img
                        className="w-[70px] sm:w-[80px] md:w-[100px] object-contain"
                        src={choose.image}
                        alt={choose.heading}
                      />
                      <h3 className="text-xl md:text-2xl font-semibold tracking-wide">
                        {choose.heading}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                        {choose.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
    </div>
  )
}

export default WhyChoose