import React, { useState, useRef } from "react";
import { UploadButton, BrowseLabel } from '../Button/UploadButton';
// import {addTable} from "./Table";
import { Row, Col, Form, Input, FormGroup } from "reactstrap";
import GPX from "gpx-parser-builder";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'
import axios from 'axios';

var environment_data = {
    wind_direction : 30 ,//degree
    wind_speed : 10 ,//km/h
    air_density : 1.225 //kg/m^3
}    

function environment(){


    function environment_submit(){
        // setTimeout(()=>{console.log(environment_data);},5000);
        // environment_data.wind_direction = 11;
        // environment_data.wind_speed = 22;
        // environment_data.air_density = 33;
        console.log(environment_data);
        // axios.post('environment/get_environment',environment_data).then(res =>{environment_data = res.data});
    }

    return(
        <div>
            <h1>Environment</h1>
            <form onSubmit={environment_submit}>
                <label>Wind Direction</label>
                <input type="text" name="wind_direction" onChange={e => environment_data.wind_direction = e.target.value} />
                <label>Wind Speed</label>
                <input type="text" name="wind_speed" onChange={e => environment_data.wind_speed = e.target.value} />
                <label>Air Density</label>
                <input type="text" name="air_density" onChange={e => environment_data.air_density = e.target.value} />
                <input type="submit" value="Submit" />
            

            </form>
            <button onClick={environment_submit}>Submit</button>
            {/* Current air density:{environment_data.air_density}
            Current wind direction:{environment_data.wind_direction}
            Current wind speed:{environment_data.wind_speed} */}
        </div>
    )

}
export default environment;