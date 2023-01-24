import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "./TimeAnalysis.css";
import{ SimDemo, points, prediction_tool} from "../../SimDemo/SimDemo.js"
import {Bar, Line, Chart} from 'react-chartjs-2';
import { Radio, Col, Row, Button, Popover } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';

const _ = undefined;

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


function TimeAnalysis() {
    const [drag, setDrag] = useState(0);
    const [ftp, setFTP] = useState(430);
    const [weight, setWeight] = useState(79);
    const [crr, setCrr] = useState(0.0025);

    var [option, setOption] = useState("time");

    var calculation = prediction_tool(points, crr, weight, drag, ftp);

    const original_time = new Date(calculation[calculation.length-2]["time"] * 1000).toISOString().slice(11, 19);
    var adjusted_time = undefined;

    

    var datachart = {text: "Time", labels: get_data(calculation, option, true),
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

    return <>
    <div className="block_one">

        <Row style={{"padding": "20px"}}>
        <div className="sliderbar_1">
            <div className = "text_div">
                <medium >Drag {drag}  </medium>
                <Popover content="A measure of the effectiveness of a streamline aerodynamic body shape in reducing the air resistance to the forward motion of a vehicle" title="What is drag?" >
                    <Button type="dashed" shape="circle" icon={<QuestionOutlined />} style={{"margin":"3px"}}/>
                </Popover>
            </div>
            
            <Box  sx={{ width: 120, margin: 1 }}>
                <Slider min={0} max={4} defaultValue={0} onChange={(e) => {setDrag((e.target.value)); calculation=prediction_tool(points, crr , weight, drag, ftp)}} />

            </Box>
        </div>
        <div className="sliderbar_2">
            <div className = "text_div">
                <medium>FTP {ftp}</medium>
                <Popover content="(aka CP) This is the power level they can sustain at steady state for ~1 hour." title="What is FTP?" >
                    <Button type="dashed" shape="circle" icon={<QuestionOutlined />} style={{"margin":"3px"}}/>
                </Popover>
            </div>

            <Box  sx={{ width: 120, margin: 1 }}>
                <Slider min={380} max={480} defaultValue={430} onChange={(e) => {setFTP((e.target.value)); calculation=prediction_tool(points, crr , weight, drag, ftp)}} />
            </Box>
        </div>
        <div className="sliderbar_3">
            <div className = "text_div">
                <medium>Weight {weight.toFixed(2)}</medium>
                <Popover content="This is weight of the athelte" title="What is weight (kg)?" >
                    <Button type="dashed" shape="circle" icon={<QuestionOutlined />} style={{"margin":"3px"}}/>
                </Popover>
            </div>
            <Box  sx={{ width: 120, margin: 1 }}>
                <Slider min={-50} max={50} defaultValue={0} onChange={(e) => {setWeight((((e.target.value/100)*79)+79)); calculation=prediction_tool(points, crr , weight, drag, ftp)}} />
            </Box>
        </div>
        <div className="sliderbar_4">
            <div className = "text_div">
                <medium>Crr {crr} </medium>
                <Popover content="Coefficient defining tyre rolling resistance properties" title="What is Crr?" >
                    <Button type="dashed" shape="circle" icon={<QuestionOutlined />} style={{"margin":"3px"}}/>
                </Popover>
            </div>
            <Box  sx={{ width: 120, margin: 1 }}>
                <Slider min={-50} max={50} defaultValue={0} onChange={(e) => {setCrr(((e.target.value/100)*0.0025).toFixed(4)); calculation=prediction_tool(points, crr , weight, drag, ftp)}} />
            </Box>
        </div>

        <div style={{"padding": "20px 0px 20px 20px"}}>
            <p style={{"font-size": "large", "font-weight": "bold"}}> Adjusted Time: {new Date(calculation[calculation.length-2]["time"] * 1000).toISOString().slice(11, 19)}</p>
        </div>
        </Row>

        <div>
        <Row justify="center" style={{"padding": '10px'}}>
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

    </div>

</>

    
}

export default TimeAnalysis;
