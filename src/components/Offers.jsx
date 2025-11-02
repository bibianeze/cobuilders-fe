import React from 'react'
import { offers } from '../data/offers'

const Offers = () => {
  return (
    <div className="bg-[#F3F5FE] py-10">
      <div className="container mx-auto w-11/12">
        {/* Heading */}
        <h3 className="text-xl sm:text-2xl md:text-4xl font-bold leading-snug text-center pb-10">
          How It Works
        </h3>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {offers.map((offer, id) => (
            <div key={id} className="flex flex-col items-center text-center gap-4">
              <img
                className="w-[180px] sm:w-[200px] md:w-[230px] object-contain"
                src={offer.image}
                alt={offer.heading}
              />
              <h3 className="text-xl md:text-2xl font-semibold tracking-wide">
                {offer.heading}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                {offer.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Offers
