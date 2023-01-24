// import React from "react";
import {Bar, Line, Chart} from 'react-chartjs-2';
import React, { useRef, useEffect, useState } from 'react';
import { Radio, Col, Row } from 'antd';
import{ SimDemo, points, prediction_tool} from "../../SimDemo/SimDemo.js"

function get_data(array, key, shorten){
  var ret = [];
  for(let i=0; i<array.length; i+=100){
    if(shorten){
      ret.push(array[i][String(key)].toFixed(2));
    }
    else{
      ret.push(array[i][key]);
    }
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
    y1: {
      
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

function PowerPlan() {

  const calculation = prediction_tool(points);


  var [option, setOption] = useState("time");

  const datachart = {text: "Time", labels: get_data(calculation, option, true),
    datasets: [
      { 
        // lineTension: 0,
        type: "line",
        label: 'Slope',
        // fill: 'start',
        data: get_data(calculation, "slope", false), 
        borderColor: 'rgb(75, 192, 192)',
        pointRadius: 0,
        yAxisID: 'y',
      },
      { 
        // lineTension: 0,
        type: "line",
        label: 'Speed',
        // fill: 'start',
        data: get_data(calculation, "speed", true),
        borderColor: 'rgb(255,165,0)',
        pointRadius: 0,
        yAxisID: 'y1',
      },
      { 
        // lineTension: 0,
        type: "bar",
        label: 'Power',
        // fill: 'start',
        data: get_data(calculation, "power_aero", true),
        borderColor: 'rgb(255,165,0)',
        pointRadius: 0,
        yAxisID: 'y2',
      }
    ]};

  // const [datachart, setDatachart] = useState({
  //   labels: [0, 1, 2, 3, 4, 5, 6, 7],
  //   datasets: [
  //     {
  //       label: 'Height',
  //       fill: 'start',
  //       data: [5, 1, 10, 15, 9, 10, 12, 5],
  //       borderColor: 'rgb(75, 192, 192)'
  //     }
  //   ]
  // });


  return (
    <div>
      <Row justify="center" style={{padding: '30px'}}>
        <Col span={4}>
          <Radio.Group onChange={(e)=>setOption(e.target.value)} defaultValue="time">
            <Radio.Button value="time">Time</Radio.Button>
            <Radio.Button value="distance">Distance</Radio.Button>
          </Radio.Group>
        </Col>

      </Row>
      

      <div style={{ height: "20em" }}>
        <Chart data = {datachart} options = {options}/>
      </div>
    </div>
  );
}

export default PowerPlan;
