import React from "react";
import "../Login/Login.css";
import "../SignUp/SignUp.css";
import Nav from "../Login/Nav";

import "../../config/firebase-config";
import { useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// dummy redirect to signin page
import { useNavigate } from "react-router-dom";

// when new user is created, create a new row in the information table using axios
import axios from "axios";

function InformationDBInsert(firebase_uid) {
  console.log("InformationDBInsert called");
  axios.post("userinfo/insert", { cloud_id: firebase_uid });
}

function SignUp() {
  // firebase authtentication variables
  const auth = getAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  // dummy redirect to signin page
  let navigate = useNavigate();

  // firebase authentication with email and password button handler
  const SignupUsingEmail = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        // Signed in
        const user = authUser.user;
        // create a new row in the information table using axios
        InformationDBInsert(user.uid);
        // ...
        console.log("success signup");
        console.log(authUser);
        console.log("user", user);
        console.log("test uid", user.uid);
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
        // dummy redirect to signin page
        navigate("/login");
      })
      .catch((error) => {
        // ..
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code", errorCode);
        alert(errorMessage);
      });
  };

  return (
    <div>
      <Nav />

      {/* ================================================== */}
      <div class="signup_page">
      
        {/* <div className="login_image">
          <img src="images/login3.jpg" alt="" />
        </div> */}

        <div className="Login_content center">
          <h3 className="Signup_title">Create an account</h3>
          <div className="Login_box">
            <label className="Login_label">Email: </label>
            <input
              type="email"
              className="Login_input"
              placeholder="Enter your email Address"
              ref={emailRef}
            />
          </div>
          <div className="Login_box">
            <label className="Login_label">Password</label>
            <input
              type="password"
              className="Login_input"
              placeholder="Set the Password"
              ref={passwordRef}
            />
          </div>
          <div className="Login_box">
            {/* <button type="submit" className="btn btn-primary"> */}
            <button onClick={SignupUsingEmail} className="Signup_btn">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
