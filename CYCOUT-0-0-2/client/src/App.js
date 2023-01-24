import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Navbar from "./components/Navbar/Navbar";
import Mapbox from "./components/Mapbox/Mapbox";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import Aboutus from "./components/Aboutus/Aboutus";
import Addbike from "./components/Addbike/Addbike";
import Mybike from "./components/Mybike/Mybike";
import AddRace from "./components/Races/AddRace";
import Table from "./components/Upload/Table";
import Homepage from "./components/SimHomepage/homepage";
import SimAboutUs from "./components/Sim-AboutUs/SimAboutUs";




//prediction
import Prediction from "./components/Prediction/Prediction";
import Environment from "./components/Prediction/Environment";
import {SimDemo} from "./components/SimDemo/SimDemo";
// Dong Wang test only
// import CYCOUT5team from "./components/CYCOUT5TEAM/CYCOUT5team";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mapbox" element={<Mapbox />} />
        <Route path="/table" element={<Table />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addbike" element={<Addbike />} />
        <Route path="/mybike" element={<Mybike />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/addrace" element={<AddRace />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/sim-demo" element={<SimDemo />} />
        <Route path="/sim-homepage" element={<Homepage />} />
        <Route path="/sim-aboutus" element={<SimAboutUs />} />

        {/* prediction */}
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/environment" element={<Environment />} />
        {/* Dong Wang test only */}
        {/* <Route path="/CYCOUT5team" element={<CYCOUT5team />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
