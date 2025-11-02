import React, { useState } from 'react'
import { faq } from '../data/faq'

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-[#F3F5FE] py-12">
      <div className="container mx-auto w-11/12">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl md:text-4xl font-bold leading-snug text-center pb-10">
          Frequently Asked Questions
        </h3>

        {/* FAQ List */}
        <div className="flex flex-col gap-5">
          {faq.map((fa, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 w-full"
            >
              {/* Question button */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-base sm:text-lg font-medium">
                  {fa.heading}
                </span>
                <img
                  src={fa.image}
                  alt="toggle icon"
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer (conditionally rendered) */}
              {openIndex === index && (
                <p className="mt-3 text-gray-700 leading-relaxed text-sm sm:text-base">
                  {fa.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faq
