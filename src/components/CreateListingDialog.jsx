import React, { useState } from "react";
import Axios from "axios";
import LocationSearch from "./LocationSearch";
import StarSelector from "./StarSelector";

const API_KEY = "AIzaSyAjqMqKlnq_taZcPrgqJjSN-JgZddRrP8c";

const CreateListingDialog = ({ isOpen, closeDialog, loggedUserId }) => {
  const [sport, setSport] = useState("Football");
  const [sportId, setSportId] = useState(1); // Default to Football (option 1)
  const [skillLevel, setSkillLevel] = useState(1);
  const [dateTime, setDateTime] = useState("");
  const [price, setPrice] = useState("");
  const [noPeople, setNoPeople] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [location, setSelectedLocation] = useState(null);

  const creatorId = loggedUserId;

  const handleSportChange = (e) => {
    const selectedSport = e.target.value;
    setSport(selectedSport);

    // Map sport name to sportId
    if (selectedSport === "Football") {
      setSportId(1);
    } else if (selectedSport === "Basketball") {
      setSportId(2);
    } else if (selectedSport === "Volleyball") {
      setSportId(3);
    } else if (selectedSport === "Handball") {
      setSportId(4);
    }
  };

  const handleStarsChange = (starsCount) => {
    setSkillLevel(starsCount);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleSubmit = () => {
    Axios.post(
      "https://ill-red-puppy-cap.cyclic.cloud/listings/create",
      {
        creatorId, // You need to define creatorId
        sportId,
        skillLevel,
        dateTime,
        price,
        noPeople,
        additionalInfo,
        location,
      },
      { withCredentials: true }
    )
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
          closeDialog();
        } else if (response.status === 400) {
          alert("Review already exists for this listing by the same user");
        }
      })
      .catch((error) => {
        alert("Error during listing creation:");
        console.log("Error during listing creation:", error);
      });
  };

  return (
    <div>
      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>Create a listing</h3>
            <select
              id="sports"
              name="sports"
              className="form-control sport-select"
              value={sport}
              onChange={handleSportChange}
            >
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Handball">Handball</option>
            </select>
            <StarSelector
              className="skillGroupSelect"
              onStarsChange={handleStarsChange}
            />
            <LocationSearch
              apiKey={API_KEY}
              onLocationSelect={handleLocationSelect}
            />
            <input
              type="datetime-local"
              className="form-control"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              min="0"
              step="1"
              placeholder="Enter Price in EUR"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="number"
              className="form-control"
              id="noPeople"
              name="noPeople"
              min="2"
              max="50"
              step="1"
              placeholder="Enter the number of people"
              value={noPeople}
              onChange={(e) => setNoPeople(e.target.value)}
              required
            />
            <textarea
              className="form-control"
              rows="3"
              placeholder="Additional information (not mandatory)"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            ></textarea>
            <div className="row text-center">
              <button
                type="button"
                className="btn btn-primary submit-button"
                onClick={handleSubmit}
              >
                Create
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
};

export default CreateListingDialog;
