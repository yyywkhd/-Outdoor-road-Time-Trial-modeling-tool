import React from "react";
import {Bar, Line, Chart} from 'react-chartjs-2';
import { SimDemo, points, prediction_tool} from "../../SimDemo/SimDemo.js"

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

function Gradients() {

  const calculation = prediction_tool(points);
  const slopes = get_data(calculation, "slope", 0);
  
  var slope_group = [];
  
  for(let i=0; i<10; i++){
    slope_group.push(0);
  }
  
  for(let i=0; i<calculation.length-1; i++){
    if(slopes[i] < -8){
      slope_group[0]++;
    }else if(slopes[i] > -8 && slopes[i] < -6){
      slope_group[1]++;
    }else if(slopes[i] > -6 && slopes[i] < -4){
      slope_group[2]++;
    }else if(slopes[i] > -4 && slopes[i] < -2){
      slope_group[3]++;
    }else if(slopes[i] > -2 && slopes[i] < 0){
      slope_group[4]++;
    }else if(slopes[i] > 0 && slopes[i] < 2){
      slope_group[5]++;
    }else if(slopes[i] > 2 && slopes[i] < 4){
      slope_group[6]++;
    }else if(slopes[i] > 4 && slopes[i] < 6){
      slope_group[7]++;
    }else if(slopes[i] > 6 && slopes[i] < 8){
      slope_group[8]++;
    }else if(slopes[i] > 8 ){
      slope_group[9]++;
    }
  }
  

  const datachart = {text: "XX", labels: ["<-8%", "-8% to -6%", "-6% to -4%", "-4% to -2%", "-2% to 0%", "0% to 2%", "2% to 4%", "4% to 6%", "6% to 8%", ">8%"],
  datasets: [
    { 
      // lineTension: 0,
      type: "bar",
      label: 'Histogram',
      // fill: 'start',
      data: slope_group,
      borderColor: 'rgb(255,165,0)',
      pointRadius: 0,
      yAxisID: 'y',
    },
    { 
      // lineTension: 0,
      type: "line",
      label: "Distribution",
      // fill: 'start',
      data: slope_group,
      borderColor: 'rgb(255,165,0)',
      pointRadius: 0.5,
    }
  ]};

  return <div><Chart height={"300%"} data = {datachart} options = {options}/></div>;
  
}

export default Gradients;
