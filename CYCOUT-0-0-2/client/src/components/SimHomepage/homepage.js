import React, { useState } from "react";
import { Col, Row, Button, Input, Form } from 'antd';
import { Link } from "react-router-dom";

import "./homepage.css";
import { grey } from "@mui/material/colors";

const { TextArea } = Input;

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

      <div className="front">
            <Row type="flex" >
                <div class="center">
                    <img src="bike.png" alt="bicycle" style={{width:"300px", verticalAlign: 'middle'}}/>
                </div>

                {/* <div class="center">
                    <img src="accident.png" alt="bicycle" style={{width:"300px", verticalAlign: 'middle'}}/>
                </div> */}
            </Row>
            <Row>
            <div class="center">
                <h1 style={{"color":"white"}}>CYCOUT5</h1>
            </div>
                
            </Row>
            <Row>
            <div class="center">
                <h3 style={{"color":"white"}}>The only outdoor cycling prediction tool you need.</h3>
            </div>

            {/* <div class="center">
                <h3 style={{"color":"white"}}>Don't want to lose a game?</h3>
                <h4 style={{"color":"white"}}>Use CYCOUT5</h4>
            </div> */}
                
            </Row>

            <Row>
            <div class="center button">
                <Button  href={window.location.origin + '/login'} type="primary" shape="round" size="large" style={{ background: "white", borderColor: "white", color:"black", "margin":"20px" }}>
                    Sign In
                </Button>
                <Button href={window.location.origin + '/signup'} type="primary" shape="round" size="large" style={{ background: "rgb(0,21,42,255)", borderColor: "white" , "margin":"20px" }}>
                    Sign Up
                </Button>
            </div>
            </Row>
            

      </div>

      <div class="features">
            <Row>
                <div class="center subtitle">
                    <h2>Highlight Features</h2>
                </div>
            </Row>

            <Row style={{paddingBottom: 80}}>
                {/* <Col span={4}></Col> */}
                <Col span={8} class="center-block"><div class="center" style={{"margin-right": "0"}}><h3>Fast</h3><img src="deadline.png" width="130px"/></div></Col>
                <Col span={8} class="center-block"><div class="center"><h3>Flexible</h3><img src="desktop-computer.png" width="130px"/></div></Col>
                <Col span={8} class="center-block"><div class="center" style={{"margin-left": "0"}}><h3>Visible</h3><img src="graph.png" width="130px"/></div></Col>
                {/* <Col span={5}></Col> */}
            </Row>
      </div>


      <div class="contact-us-form" style={{background:"rgb(245,245,247,255)"}}>
            <Row>
                <div class="center subtitle">
                    <h2>Contact Us</h2>
                </div>
            </Row>
            <Row>
                <div class="center">
                    <Form         
                        labelCol={{
                        span: 4,
                        }}
                        >
                    <Form.Item label="Email: ">
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Message: ">
                        <TextArea rows={4} placeholder="Your message here" maxLength={6} />
                    </Form.Item>
                    </Form>
                    
                </div>
                
            </Row>

            <Row>
                    <div class="center">
                        <Button type="primary" shape="round" size="large" style={{ background: "rgb(0,21,42,255)", borderColor: "white" , "margin":"20px" }}>
                        Submit
                        </Button>
                    </div>

            </Row>
      
      </div>
    </div>
  );
}

export default Navbar;
