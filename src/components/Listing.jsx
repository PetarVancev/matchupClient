import React, { useState } from "react";
import WriteReviewPopup from "./WriteReviewPopup";
import ReviewsDialog from "./ReviewsDialog";

function Listing({ selectedMode, handleEnroll, listingData, loggedUserId }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReviewsDialogOpen, setIsReviewsDialogOpen] = useState(false);

  function openPopup() {
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  function openReviewsDialog() {
    setIsReviewsDialogOpen(true);
  }

  function closeReviewsDialog() {
    setIsReviewsDialogOpen(false);
  }

  const {
    id,
    creator_id,
    sport_id,
    location,
    time,
    price,
    skill_level,
    num_players,
    additional_info,
    enrolled_players,
  } = listingData;

  let starsArray = [];
  for (let i = 0; i < 5; i++) {
    if (i < skill_level) {
      starsArray.push(1);
    } else {
      starsArray.push(0);
    }
  }

  function findSportName(category) {
    switch (category) {
      case 1:
        return "Football";
      case 2:
        return "Basketball";
      case 3:
        return "Volleyball";
      case 4:
        return "Handball";
      default:
        return null;
    }
  }

  const storedTime = new Date(time); // Assuming 'time' is stored in a specific timezone
  const userLocalTime = new Date(
    storedTime.getUTCFullYear(),
    storedTime.getUTCMonth(),
    storedTime.getUTCDate(),
    storedTime.getUTCHours(), // Use the hours from storedTime
    storedTime.getUTCMinutes(), // Use the minutes from storedTime
    storedTime.getUTCSeconds() // Use the seconds from storedTime
  );

  const now = new Date();
  const nowInSameTimezone = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours() + 2,
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );

  const isEnrollMode = selectedMode === "enroll";
  const isTimeInPast = userLocalTime <= nowInSameTimezone;

  console.log(userLocalTime.toLocaleString()); // Check if the time is set correctly
  console.log(nowInSameTimezone.toLocaleString());
  console.log(isTimeInPast);

  return (
    <div className="card">
      {selectedMode !== "reviews" && (
        <div className="card-body">
          <h5 className="card-title">{findSportName(sport_id)}</h5>
          <div className="row">
            <div className="col-12">{location}</div>
            <div className="col-12">
              <div>{userLocalTime.toLocaleDateString()}</div>
              <div>{userLocalTime.toLocaleTimeString()}</div>
            </div>
            <div className="col-12">{price === 0 ? "FREE" : `${price} €`}</div>
            <div className="col-12">
              Skill Group <br />
              {starsArray.map((_, index) => (
                <i
                  className={
                    index < skill_level ? "fas fa-star" : "far fa-star"
                  }
                  key={index}
                ></i>
              ))}
            </div>
            {isEnrollMode && (
              <div className="col-12">
                <button className="btn btn-primary" onClick={handleEnroll}>
                  Enroll
                </button>
                <div className="col-12">{`${enrolled_players}/${num_players}`}</div>
                <button className="btn btn-primary" onClick={openReviewsDialog}>
                  Reviews
                </button>
                <ReviewsDialog
                  creatorId={creator_id}
                  isOpen={isReviewsDialogOpen}
                  closeDialog={closeReviewsDialog}
                />
              </div>
            )}
            {selectedMode === "my" && (
              <div className="col-12">{`${enrolled_players}/${num_players}`}</div>
            )}
            <div className="col-12">
              Additional info
              <br />
              {additional_info}
            </div>
            {selectedMode === "enrolled" && isTimeInPast && (
              <div className="col-12">
                <button className="btn btn-primary" onClick={openPopup}>
                  Write a review
                </button>
                <WriteReviewPopup
                  isOpen={isPopupOpen}
                  closeDialog={closePopup}
                  listingId={id}
                  userId={loggedUserId}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
