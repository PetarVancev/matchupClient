import React, { useState, useEffect } from "react";
import Axios from "axios";
import NavBar from "../components/NavBar";
import DateSelector from "../components/DateSelector";
import Listing from "../components/Listing";
require("../styles.css");
import CreateListingDialog from "../components/CreateListingDialog";

const categories = ["Football", "Basketball", "Volleyball", "Handball"];

export default function Home() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}.${month}.${year}`;
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [listings, setListings] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Football");
  const [selectedMode, setMode] = useState("enroll");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [loginCompleted, setLoginCompleted] = useState(false);

  function formatDateForDatabase(inputDate) {
    const parts = inputDate.split(".");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    // Create a new Date object using the extracted parts
    const dateObject = new Date(Date.UTC(year, month - 1, day));

    // Get the formatted date in "YYYY-MM-DD" format
    const formattedDate = dateObject.toISOString().split("T")[0];

    return formattedDate;
  }

  function findSportId(category) {
    switch (category) {
      case "Football":
        return 1;
      case "Basketball":
        return 2;
      case "Volleyball":
        return 3;
      case "Handball":
        return 4;
      default:
        return null;
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

  function handleEnroll(listingId) {
    Axios.post(
      `https://ill-red-puppy-cap.cyclic.cloud/listings/enroll/${listingId}`,
      { userId: loggedUserId },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.status === 201) {
          // If enrollment is successful, update the listings state
          setListings((prevListings) =>
            prevListings.filter((listing) => listing.id !== listingId)
          );
        }
      })
      .catch((error) => {
        alert("error while enrolling");
        console.log("Error while enrolling into listing", error);
      });
  }

  useEffect(() => {
    Axios.get("https://ill-red-puppy-cap.cyclic.cloud/login", {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.loggedIn === false) {
          window.location.href = "./login";
        } else {
          console.log(response.data.user[0]);
          setLoggedUserId(response.data.user[0].id);
          setLoginCompleted(true); // Set a state to indicate login completion
          setSelectedCategory(
            findSportName(response.data.user[0].fav_sport_id)
          );
        }
      })
      .catch((error) => {
        console.log("Error checking login status:", error);
      });
  }, []);

  useEffect(() => {
    if (loginCompleted) {
      Axios.get(
        `https://ill-red-puppy-cap.cyclic.cloud/listings/${selectedMode}/${loggedUserId}`,
        {
          params:
            selectedMode === "enroll"
              ? {
                  dateTime: formatDateForDatabase(selectedDate),
                  sportId: findSportId(selectedCategory),
                }
              : {},
          withCredentials: true,
        }
      )
        .then((response) => {
          setListings(response.data);
        })
        .catch((error) => {
          setListings(null);
          console.log("Error fetching user's listings:", error);
        });
    }
  }, [
    loginCompleted,
    selectedMode,
    selectedDate,
    selectedCategory,
    isPopupOpen,
  ]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <NavBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        setMode={setMode}
        onDateChange={setSelectedDate}
        selectedMode={selectedMode}
      />
      {selectedMode === "enroll" || selectedMode === "my" ? (
        <div className="text-center listing-options-row">
          <button
            className="btn btn-primary create-listing-button"
            onClick={openPopup} // Open the PopupDialog
          >
            Create a Listing
          </button>
          {selectedMode === "enroll" && (
            <DateSelector
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          )}
        </div>
      ) : null}
      <div className="container-fluid text-center">
        {listings !== null && Array.isArray(listings) ? (
          listings.map((listing) => (
            <Listing
              handleEnroll={() => handleEnroll(listing.id)}
              selectedMode={selectedMode}
              key={listing.id}
              listingData={listing}
              loggedUserId={loggedUserId}
            />
          ))
        ) : (
          <p>You have no listings.</p>
        )}
        <CreateListingDialog
          isOpen={isPopupOpen}
          closeDialog={closePopup}
          loggedUserId={loggedUserId}
        />
      </div>
    </div>
  );
}
