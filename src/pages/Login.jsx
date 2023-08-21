import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from "../components/Form";
import "../loginStyles.css";

function Login() {
  useEffect(() => {
    Axios.get("https://ill-red-puppy-cap.cyclic.cloud/login", {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.loggedIn === true) {
          const targetUrl = `${window.location.origin}/`;
          console.log(targetUrl);
          window.location.href = targetUrl;
        }
      })
      .catch((error) => {
        console.log("Error checking login status:", error);
      });
  }, []);
  return (
    <div className="container login">
      <div className="full-page-background"></div>
      <Form />
    </div>
  );
}

export default Login;
