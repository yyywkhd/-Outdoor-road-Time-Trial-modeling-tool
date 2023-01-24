import React, { useState } from "react";
import "../Prediction/Prediction.css";
import PowerPlan from "./Section/PowerPlan";
import TimeAnalysis from "./Section/TimeAnalysis";
import Weather from "./Section/Weather";
import YawAngles from "./Section/YawAngles";
import Gradients from "./Section/Gradients";
import PeakPower from "./Section/PeakPower";
import Notes from "./Section/Notes";

function PredictionBox() {
  const [active, setActive] = useState("SectionOne");
  return (
    <div class="PredictionBox">
      <nav>
        <ul>
          <li>
            <button class="BoxBtn" onClick={() => setActive("SectionOne")}>
              Power Plan
            </button>
          </li>
          <li>
            <button class="BoxBtn" onClick={() => setActive("SectionTwo")}>
              Time Analysis
            </button>
          </li>
          <li>
            <button class="BoxBtn" onClick={() => setActive("SectionThree")}>
              Weather
            </button>
          </li>
          <li>
            <button class="BoxBtn" onClick={() => setActive("SectionFour")}>
              Yaw Angles
            </button>
          </li>
          <li>
            <button class="BoxBtn" onClick={() => setActive("SectionFive")}>
              Gradients
            </button>
          </li>
          <li>
            <button class="BoxBtn" onClick={() => setActive("SectionSix")}>
              Peak Power
            </button>
          </li>
          <li>
            <button class="BoxBtn" onClick={() => setActive("SectionSeven")}>
              Notes
            </button>
          </li>
        </ul>
      </nav>
      <div class="section">
        {active === "SectionOne" && <PowerPlan />}
        {active === "SectionTwo" && <TimeAnalysis />}
        {active === "SectionThree" && <Weather />}
        {active === "SectionFour" && <YawAngles />}
        {active === "SectionFive" && <Gradients />}
        {active === "SectionSix" && <PeakPower />}
        {active === "SectionSeven" && <Notes />}
      </div>
    </div>
  );
}

export default PredictionBox;
