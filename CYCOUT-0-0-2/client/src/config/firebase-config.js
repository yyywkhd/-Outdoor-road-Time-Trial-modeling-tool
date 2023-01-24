// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK5h9dA4Zu5y5V0fuNo9gWDh8bDXI0KyU",
  authDomain: "cycout5.firebaseapp.com",
  projectId: "cycout5",
  storageBucket: "cycout5.appspot.com",
  messagingSenderId: "195006585910",
  appId: "1:195006585910:web:a4255b108cdc3267404c97",
  measurementId: "G-KYCNDD06MD"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
initializeApp(firebaseConfig);
getAnalytics();