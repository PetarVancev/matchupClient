import React from "react";

function Listing({ selectedMode, handleEnroll, listingData }) {
  const {
    sport_id,
    location,
    time,
    price,
    skill_level,
    num_players,
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

  const now = new Date();
  const isEnrollMode = selectedMode === "enroll";
  const isTimeInPast = new Date(time) <= now;

  return (
    <div className="card">
      {selectedMode !== "reviews" && (
        <div className="card-body">
          <h5 className="card-title">{findSportName(sport_id)}</h5>
          <div className="row">
            <div className="col-12">{location}</div>
            <div className="col-12">
              <div>{new Date(time).toLocaleDateString()}</div>
              <div>{new Date(time).toLocaleTimeString()}</div>
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
              </div>
            )}
            {isEnrollMode && isTimeInPast && (
              <div className="col-12">
                <div>{`${enrolled_players}/${num_players}`}</div>
              </div>
            )}
            {selectedMode === "my" && (
              <div className="col-12">{`${enrolled_players}/${num_players}`}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
