import React from "react";
import "../Prediction/Prediction.css";
import { SimDemo, points, prediction_tool} from "../SimDemo/SimDemo.js"

function sum(array, key){
  var ret = 0;
  for(let i=0; i<array.length-1; i++){
    ret += Math.abs(array[i][key]);
  }
  return ret;
}

const calculation = prediction_tool(points);

const distance = calculation[calculation.length-2]["distance"].toFixed(2);
const average_speed = ((sum(calculation, "speed")/distance)*3.6).toFixed(2); //km per hour
const average_power = (sum(calculation, "power_net")/calculation.length-1).toFixed(2);

function RaceOverview() {
  return (
    <div class="RaceOverview">
      <h3 class="RaceTitle">Race Overview</h3>
      <table class="RaceTable">
        <tbody>
          <tr>
            <th>Distance</th>
            <td>{distance} m</td>
          </tr>
          <tr>
            <th>Time</th>
            <td>{new Date(calculation[calculation.length-2]["time"] * 1000).toISOString().slice(11, 19)}</td>
          </tr>
          <tr>
            <th>Avg. Speed</th>
            <td>{average_speed} km/h</td>
          </tr>
          <tr>
            <th>Avg. Power</th>
            <td>{average_power} w</td>
          </tr>
          <tr>
            <th>Watts/Kg</th>
            <td>NaN</td>
          </tr>
          <tr>
            <th>Normalized Power</th>
            <td>NaN</td>
          </tr>
          <tr>
            <th>Variability Index</th>
            <td>NaN</td>
          </tr>
          <tr>
            <th>Intensity Factor</th>
            <td>NaN</td>
          </tr>
          <tr>
            <th>Training Stress Score</th>
            <td>NaN</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RaceOverview;
