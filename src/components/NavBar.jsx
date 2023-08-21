import React from "react";
import Axios from "axios";

function NavBar({
  categories,
  selectedCategory,
  onCategoryChange,
  setMode,
  selectedMode,
}) {
  const handleSignOut = () => {
    Axios.get("https://ill-red-puppy-cap.cyclic.cloud/logout", {
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "./login"; // Redirect to login page
        }
      })
      .catch((error) => {
        alert("Error signing out:");
        console.log("Error signing out:", error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container-fluid">
        <ul
          className="navbar-nav"
          style={{
            opacity: selectedMode != "enroll" ? 0 : 1,
            pointerEvents: selectedMode != "enroll" ? "none" : "auto",
          }}
        >
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {selectedCategory}
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              {categories
                .filter((category) => category !== selectedCategory)
                .map((category) => (
                  <a
                    key={category}
                    className="dropdown-item"
                    href="#"
                    onClick={() => onCategoryChange(category)}
                  >
                    {category}
                  </a>
                ))}
            </div>
          </li>
        </ul>
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => setMode("enroll")}>
              Home
            </a>
          </li>
        </ul>
        <ul className="navbar-nav navbar-right">
          <li className="nav-item dropdown ms-auto dropleft">
            <a
              className="nav-link dropdown-toggle "
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Account
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                  setMode("my");
                }}
              >
                My Listings
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                  setMode("enrolled");
                }}
              >
                Enrolled Listings
              </a>
              <a className="dropdown-item" href="#" onClick={handleSignOut}>
                Sign Out
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
