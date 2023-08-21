import React, { useState, useEffect } from "react";
import Axios from "axios";
import Review from "./Review";

function ReviewsDialog({ isOpen, closeDialog, creatorId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    Axios.get(`https://ill-red-puppy-cap.cyclic.cloud/reviews/${creatorId}`, {
      withCredentials: true,
    })
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        setReviews(null);
        console.log("Error fetching user's revies:", error);
      });
  }, []);

  return (
    <div>
      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>User reviews</h3>
            {reviews !== null && Array.isArray(reviews) ? (
              reviews.map((review) => (
                <Review key={review.id} reviewData={review} />
              ))
            ) : (
              <p>No reviews found</p>
            )}
            <button className="btn-close btn btn-primary" onClick={closeDialog}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewsDialog;
