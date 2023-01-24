import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";

function Nav() {
  const [click, setClick] = useState(false);

  const menuClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div>
      <nav className="nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="CYCOUT-logo-full.png" style={{width:"150px", margin:"10px"}} alt="CYCOUT-logo" />
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
              <Link to="/sim-aboutus" className="nav-links" onClick={closeMobileMenu}>
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
    </div>
  );
}

export default Nav;
