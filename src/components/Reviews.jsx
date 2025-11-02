import React from "react";
import {reviews} from "../data/review"

const Reviews = () => {
  return (
    <div className="">
      <div className="container mx-auto w-10/12  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {reviews.map((review, id) => (
       <div key={id} className="flex flex-col items-center gap-1 py-6">
         <img src={review.image} alt="" />
         <div>
          <h3 className="font-bold flex flex-col items-center">{review.heading}</h3>
         <p>{review.text}</p>
         </div>
       </div>
      ))}
    </div>
    </div>
  );
};

export default Reviews;
