import React, { useState } from "react";
import { Col, Row, Button, Popover } from 'antd';
import { Link } from "react-router-dom";

import "./SimAboutUs.css";
import { grey } from "@mui/material/colors";



function SimAboutUs() {

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  
  
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
      <nav className="nav-simaboutus">
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

      <div className="front-simaboutus">
            <Row style={{paddingTop:150}}>
              
              <Col span={12} style={{paddingLeft:250}}>
                
                <h1 class="gradient-text">About Us</h1>
              </Col>

              <Col span={12} style={{paddingRight:250}}>
              
                <p style={{"text-align": "justify", "font-size": "20px", "font-family": "Manrope, sans-serif"}}>The main objective of this project is to develop a portable web-based application for outdoor road course prediction, with the aim of planning the best training routines taking into account weather conditions, aerodynamics, and athlete profiles. It can be freely adapted to the supply and demand model to better present the results to athletes, coaches, etc. than traditional usage.</p>
              </Col>
            </Row>

            <Row style={{paddingTop:100}}>
            <Col span={12} style={{paddingLeft:250}}>
                <h1 class="gradient-text">Who are we?</h1>
              </Col>

              <Col span={12} style={{paddingRight:250}}>
                <p style={{"font-size": "20px", "line-height": "1.8", "font-family": "Manrope, sans-serif"}}>
                            a1808469 Mong Yuan Sim
                            <br />
                            a1788396 Peiyan Chen
                            <br />
                            a1810054 Ziqi Zhang
                            <br />
                            a1779748 Dong Wang
                            <br />
                            a1800430 Zhenhang Dong
                            <br />
                            a1790760 Wai Tong Suen
                            <br />
                            a1793295 Hyun Ji Moon
                            <br />
                            a1810064 Chi Wang
                            <br />
                            a1787526 Nhu Long Nguyen
                            <br />
                </p>
              </Col>
            </Row>

         




            <div style={{padding:"50px", "background-color": "#8BC6EC", "background-image": "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)", margin:"150px", "border-radius": "25px"}}>
              <Row>
                  <Col span={20}>
                    <h3>Want to see our face?</h3>
                    <p style={{"font-size": "20px"}}>Spoiler Alert: Wendy's face is at the front!</p>
                  </Col>

                  <Col span={4}>   

                    <Popover
                      content={<div><img src="Group-photo.png" alt="member imgae" width="500px"/></div>}
                      title="Tadaaaa!!!"
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <Button type="primary" shape="round" size="large" style={{ background: "rgb(0,21,42,255)", borderColor: "rgb(0,21,42,255)" , "margin":"30px"}}>
                      Click here
                      </Button>
                    </Popover>             
                    {/* <Button type="primary" shape="round" size="large" style={{ background: "rgb(0,21,42,255)", borderColor: "rgb(0,21,42,255)" , "margin":"30px"}}>
                    Click here
                    </Button> */}
                  </Col>
                
              </Row>
            </div>


            <div className="front">
            <Row type="flex" >
                {/* <div class="center">
                    <img src="bike.png" alt="bicycle" style={{width:"300px", verticalAlign: 'middle'}}/>
                </div> */}

                <div class="center">
                    <img src="accident.png" alt="bicycle" style={{width:"300px", verticalAlign: 'middle'}}/>
                </div>
            </Row>
            <Row>
            <div class="center">
                <h1 style={{"color":"white"}}>You don't want to lose a game</h1>
            </div>
                
            </Row>
            <Row>
            <div class="center">
                <h3 style={{"color":"white"}}>Try CYCOUT5!</h3>
            </div>

            {/* <div class="center">
                <h3 style={{"color":"white"}}>Don't want to lose a game?</h3>
                <h4 style={{"color":"white"}}>Use CYCOUT5</h4>
            </div> */}
                
            </Row>

            <Row>
            <div class="center button">
                <Button href="/sim-homepage" type="primary" shape="round" size="large" style={{ background: "rgb(0,21,42,255)", borderColor: "white" , "margin":"20px" }}>
                    Get Started
                </Button>
            </div>
            </Row>
            

      </div>

            

      </div>



    </div>
  );
}

export default SimAboutUs;
