import React, { useState } from "react";
import Axios from "axios";
import StarSelector from "./StarSelector";
import DropdownInput from "./DropdownInput";

function Form(props) {
  const [selectedOption, setSelectedOption] = useState("Football");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sports = ["Football", "Basketball", "Volleyball", "Handball"];
  const [skillLevel, setSkillLevel] = useState(1);
  const [favSportId, setFavSportId] = useState(1);

  // Callback function to update selected stars in the parent component
  const handleStarsChange = (starsCount) => {
    setSkillLevel(starsCount);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const selectedSportIndex = sports.indexOf(option) + 1;
    setFavSportId(selectedSportIndex);
  };

  const handleSubmission = () => {
    if (props.registered) {
      Axios.post(
        "https://ill-red-puppy-cap.cyclic.cloud/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
        .then((response) => {
          if (response.status == 200) {
            const targetUrl = `${window.location.origin}/`;
            window.location.href = targetUrl;
          } else {
            if (response.data.message) {
              alert(response.data.message);
            } else {
              alert("An error occurred during login.");
            }
          }
        })
        .catch((error) => {
          console.log("Error during login:", error);
          alert("Wrong credidentials");
        });
    } else {
      Axios.post(
        "https://ill-red-puppy-cap.cyclic.cloud/register",
        {
          name: name,
          lastName: surname,
          email: email,
          phoneNum: phoneNumber,
          skillLevel: skillLevel,
          favSportId: favSportId,
          password: password,
        },
        { withCredentials: true }
      )
        .then((response) => {
          if (response.status == 200) {
            props.setRegistered(true);
          } else {
            if (response.data.message) {
              alert(response.data.message);
            } else {
              alert("An error occurred during registration. Try again");
            }
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error while registering, try again");
        });
    }
  };

  return (
    <form className="form">
      {props.registered === false && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            pattern="[A-Za-z\s]+"
            required
          />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            pattern="[A-Za-z\s]+"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <DropdownInput
            options={sports}
            selectedOption={selectedOption}
            onChange={handleOptionSelect}
          />
          <StarSelector onStarsChange={handleStarsChange}>
            Your skill group
          </StarSelector>
        </div>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="button"
        onClick={handleSubmission}
        className="btn btn-primary"
      >
        {props.registered ? "Login" : "Register"}
      </button>
      {props.registered && (
        <div className="row">
          <button
            onClick={() => props.setRegistered(false)}
            className="btn btn-primary forgot-pass"
          >
            Create an account
          </button>
        </div>
      )}
    </form>
  );
}

export default Form;
