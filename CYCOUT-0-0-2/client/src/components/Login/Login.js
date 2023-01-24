import React from "react";
import "../Login/Login.css";
import Nav from "../Login/Nav";
import "../../config/firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useRef } from "react";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

// dummy redirect to home page
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";

import { Breadcrumb, Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

function Login() {
  // firebase authtentication variables
  const auth = getAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const googleprovider = new GoogleAuthProvider();
  const facebookprovider = new FacebookAuthProvider();
  const twitterprovider = new TwitterAuthProvider();

  // dummy redirect to home page
  let navigate = useNavigate();

  // firebase authentication with email and password button handler
  const loginWithEmail = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        // logged in
        console.log(authUser);
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
        console.log("success login");

        // get the user uid
        if (authUser) {
          const uid = authUser.user.uid;
          console.log(uid);
        }
        // dummy redirect to home page
        navigate("/dashboard");
      })
      .catch((error) => {
        // error
        alert(error.message);
      });
  };

  // firebase authentication with different providers
  const loginWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleprovider)
      .then((userCred) => {
        console.log(userCred);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const loginWithFacebook = (e) => {
    e.preventDefault();
    signInWithPopup(auth, facebookprovider)
      .then((userCred) => {
        console.log(userCred);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const loginWithTwitter = (e) => {
    e.preventDefault();
    signInWithPopup(auth, twitterprovider)
      .then((userCred) => {
        console.log(userCred);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <Nav />

      {/* ================================================== */}
      <div class="login_page">
  
        <div className="Login_content center">
          <h3 className="Login_title">LOG IN</h3>
          <div className="Login_box">
            <label className="Login_label">Email: </label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter your email"
              ref={emailRef}
            />
          </div>
          <div className="Login_box">
            <label className="Login_label">Password: </label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </div>
          <div className="Login_box">
            <button onClick={loginWithEmail} className="Login_btn">
              Log In
            </button>
          </div>

          <hr class="line" />
          <p className="text-center" style={{color:"#fff"}}>Login with social media</p>
          <div className="Social_box d-flex justify-content-evenly">
            <Button onClick={loginWithGoogle} className="icon google">
              <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
            </Button>
            <Button onClick={loginWithFacebook} className="icon facebook">
              <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
            </Button>
            <Button onClick={loginWithTwitter} className="icon twitter">
              <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
