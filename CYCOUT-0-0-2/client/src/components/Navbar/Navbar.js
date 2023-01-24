import React, { useState } from "react";
// import { Button } from '../Button/Button.js';
import { Link } from "react-router-dom";
import "./Navbar.css";
import Slides from "./Slides";

function Navbar() {
  const [click, setClick] = useState(false);
  // const [button, setButton] = useState(true);

  const menuClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // const displayButton = () => {
  //   if(window.innerWidth <= 960) {
  //     setButton(false);
  //   } else {
  //     setButton(true);
  //   }
  // };
  // window.addEventListener('resize', displayButton);

  return (
    <div>
      <nav className="nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="CYCOUT-logo-full.png" alt="cycout logo" width="150px"/>
          </Link>
          {/*drop-down menu need to be fixed */}
          <div className="menu-icon" onClick={menuClick}>
            <i class={click ? "bi bi-menu-up" : "bi bi-menu-down"}></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-items">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-items">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>

            <li className="nav-items">
              <Link
                to="/signup"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
            {/*
            The logout should be captured by other api.
            */}
            <li className="nav-items">
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div>
      <Slides></Slides>
      </div>
    </div>
  );
}

export default Navbar;
