import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from "../components/Form";
if (window?.location.pathname === "/login") require("../loginStyles.css");

function Login() {
  useEffect(() => {
    Axios.get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          const targetUrl = `${window.location.origin}/`;
          console.log(targetUrl);
          window.location.href = targetUrl;
        }
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
      });
  }, []);
  const [registered, setRegistered] = useState(true);
  return (
    <div className="container login">
      <Form registered={registered} setRegistered={setRegistered} />
    </div>
  );
}

export default Login;
