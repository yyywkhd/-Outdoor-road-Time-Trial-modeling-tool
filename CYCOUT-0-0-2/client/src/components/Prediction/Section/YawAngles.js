import React from "react";
import {Bar, Line, Chart} from 'react-chartjs-2';
import { SimDemo, points, prediction_tool} from "../../SimDemo/SimDemo.js"
import NormalDistribution from "normal-distribution";

function get_data(array, key, shorten){
  var ret = [];
  for(let i=0; i<array.length; i++){
    if(shorten){
      ret.push(array[i][String(key)].toFixed(2));
    }
    else{
      ret.push(array[i][key]);
    }
  }
  return ret;
}

function getStandardDeviation (array) {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

function getMean(array){
  var sum = 0;
  for(let i=0; i<array.length; i++){
    sum += array[i];
  }
  return sum/array.length;
}

function pdfArray(array, normDist){
  var ret = [];
  for(let i=0; i<array.length; i++){
    ret.push(normDist.pdf(array[i]));
  }
  return ret;
}

const options = {
  maintainAspectRatio: false,
  elements: {
    line: {
        tension: 0.2
    }
  },
  scales: {  
    y: {
      
      display: true,
      position: 'left',
    },
  },
  plugins: {
    legend: {
      display: true
    }
  }
};



function YawAngles() {
  const calculation = prediction_tool(points);
  const yaws = get_data(calculation, "effective_yaw_angle", 0);
  
  var yaws_group = [];
  
  for(let i=0; i<12; i++){
    yaws_group.push(0);
  }
  
  for(let i=0; i<calculation.length-1; i++){
    if(yaws[i] < -25){
      yaws_group[0]++;
    }else if(yaws[i] > -25 && yaws[i] < -20){
      yaws_group[1]++;
    }else if(yaws[i] > -20 && yaws[i] < -15){
      yaws_group[2]++;
    }else if(yaws[i] > -15 && yaws[i] < -10){
      yaws_group[3]++;
    }else if(yaws[i] > -10 && yaws[i] < -5){
      yaws_group[4]++;
    }else if(yaws[i] > -5 && yaws[i] < 0){
      yaws_group[5]++;
    }else if(yaws[i] > 0 && yaws[i] < 5){
      yaws_group[6]++;
    }else if(yaws[i] > 5 && yaws[i] < 10){
      yaws_group[7]++;
    }else if(yaws[i] > 10 && yaws[i] < 15){
      yaws_group[8]++;
    }else if(yaws[i] > 15 && yaws[i] < 20){
      yaws_group[9]++;
    }else if(yaws[i] > 20 && yaws[i] < 25){
      yaws_group[10]++;
    }else if(yaws[i] > 25){
      yaws_group[11]++;
    }
  }

  const datachart = {text: "XX", labels: ["<25°", "-25° to 20°", "-20° to -15°", "-15° to -10°", "-10° to -5°", "-5° to 0°", "0° to 5°", "5° to 10°", "10° to 15°", "15° to 20°", "20° to 25°", ">25°"],
  datasets: [
    { 
      // lineTension: 0,
      type: "bar",
      label: 'Histogram',
      // fill: 'start',
      data: yaws_group,
      borderColor: 'rgb(255,165,0)',
      pointRadius: 0,
      yAxisID: 'y',
    },
    { 
      // lineTension: 0,
      type: "line",
      label: "Distribution",
      // fill: 'start',
      data: yaws_group,
      borderColor: 'rgb(255,165,0)',
      pointRadius: 0.5,
    }
  ]};

  return <div><Chart height={"300%"} data = {datachart} options = {options}/></div>;
}

export default YawAngles;
