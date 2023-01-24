

var express = require('express');
var router = express.Router();
// var db = require('../sql.js');

Dist = 0.1
speed = 0.3
Bearing_deg = 0
Headwind_direction = -150
Relative_wind_angle = Bearing_deg-Headwind_direction // 150
wind_speed = 1.00
// convert degrees to radians
function radians(degrees) {
    return degrees * (Math.PI / 180);
}

// convert degrees to radians
function degree(radians) {
    return radians * (180 / Math.PI);
}


function Relative_wind_speed(speed,wind_speed,Relative_wind_angle){
    result = Math.sqrt((Math.pow((speed+wind_speed*Math.cos(radians(Relative_wind_angle))),2))+Math.pow((wind_speed*Math.sin(radians(Relative_wind_angle))),2))
    return result
}

function Effective_yaw_angle(wind_speed,wind_speed,Relative_wind_angle){
    result = degree(Math.atan(wind_speed*Math.sin(radians(Relative_wind_angle))/(speed+wind_speed*Math.cos(radians(Relative_wind_angle)))))

    return result
}

function Vlookup(lookup_value,table_array,col_index_number,range_lookup){

}


function CDA(delta_CDA,position,Input_Output,Relative_wind_speed,Calcs,Effective_yaw_angle,Yaw_response){
    temp = Vlookup(Relative_wind_speed,Calcs,2,true)
    result = delta_CDA+Vlookup(position,Input_Output,temp,true)+Vlookup(Math.abs(Effective_yaw_angle),Yaw_response,3,true)
    return result
}
module.exports = router;