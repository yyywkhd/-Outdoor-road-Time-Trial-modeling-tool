//Contributed by: Waitong Suen
//Description: This is the file include all prediction function environment variables

var express = require('express');
var router = express.Router();
// var db = require('../sql.js');

var wind_direction = 30 //degree
var wind_speed = 10 //km/h
var air_density = 1.225 //kg/m^3

router.post('/get_environment', function(req, res, next) {
    var data_get = req.body;
    console.log("server receive: ", data_get);
    if(data_get.wind_direction != 999){
        console.log("user change wind direction:", data_get.wind_direction);
        wind_direction = data_get.wind_direction;
    }
    if(data_get.wind_speed != 999){
        console.log("user change wind speed:", data_get.wind_speed);
        wind_speed = data_get.wind_speed;
    }
    if(data_get.air_density != 999){
        console.log("user change air density:", data_get.air_density);
        air_density = data_get.air_density;
    }
    
    console.log("server now have: ", wind_direction," ", wind_speed," ", air_density);
    res.json({wind_direction: wind_direction, wind_speed: wind_speed, air_density: air_density});
});

// router.get('/check_environment', function(req, res, next){
//     console.log("server send: ", wind_direction," ", wind_speed," ", air_density);
//     res.json({wind_direction: wind_direction, wind_speed: wind_speed, air_density: air_density});
// });



module.exports = router;