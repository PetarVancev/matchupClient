import React, { useState } from "react";

const StarSelector = (props) => {
  const [selectedStars, setSelectedStars] = useState(1);
  const handleStarClick = (starCount) => {
    setSelectedStars(starCount);
    props.onStarsChange(starCount);
  };
  const classes = "star-selector " + props.className;

  return (
    <div className={classes}>
      <input type="hidden" name="hiddenValue" value={selectedStars} />
      <div className="star-label">{props.children}</div>
      {[...Array(5)].map((_, index) => (
        <span key={index} onClick={() => handleStarClick(index + 1)}>
          {index < selectedStars ? (
            <i className="fas fa-star"></i>
          ) : (
            <i className="far fa-star"></i>
          )}
        </span>
      ))}
    </div>
  );
};

export default StarSelector;
