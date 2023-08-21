import React from "react";

function Review({ reviewData }) {
  let starsArray = [];
  for (let i = 0; i < 5; i++) {
    if (i < reviewData.rating) {
      starsArray.push(1);
    } else {
      starsArray.push(0);
    }
  }
  const { text } = reviewData;
  return (
    <div className="row">
      <div className="col-lg-12">
        <hr />
        <p>{text}</p>
        {starsArray.map((_, index) => (
          <i
            className={
              index < reviewData.rating ? "fas fa-star" : "far fa-star"
            }
            key={index}
          ></i>
        ))}
        <hr />
      </div>
    </div>
  );
}

export default Review;
