import React, { useState } from "react";
import Axios from "axios";
import StarSelector from "./StarSelector";

function WriteReviewPopup({
  isOpen,
  closeDialog,
  listingId,
  creatorId,
  userId,
}) {
  const [rating, setReviewRating] = useState(1);
  const [text, setReviewText] = useState("");

  function handleStarsChange(starsCount) {
    setReviewRating(starsCount);
  }

  function handleSubmit() {
    Axios.post(
      "https://ill-red-puppy-cap.cyclic.cloud/reviews/submit",
      {
        listingId,
        userId,
        rating,
        text,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
          closeDialog();
        } else {
          if (response.data.message) {
            alert(response.data.message);
          } else if (response.status === 400) {
            alert("You have already written a review for this listing");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error while creating review");
      });
  }

  return (
    <div>
      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>Write a review</h3>
            <StarSelector
              className="skillGroupSelect"
              onStarsChange={handleStarsChange}
            />
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write review text"
              value={text}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <div className="row text-center">
              <button
                type="button"
                className="btn btn-primary submit-button send-review"
                onClick={handleSubmit}
              >
                Send Review{" "}
              </button>
            </div>
            <button className="btn-close btn btn-primary" onClick={closeDialog}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WriteReviewPopup;
