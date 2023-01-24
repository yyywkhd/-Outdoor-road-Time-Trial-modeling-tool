var express = require('express');
var router = express.Router();
var db = require('../sql.js');


router.post('/', function(req, res, next) {
    var postData=req.body
    db.query("insert into bike_data value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [0, postData.althlete_id,
            postData.bike_name,
            postData.bike_weight,
            postData.bike_type,
            postData.bike_components,
            postData.front_wheel_type,
            postData.front_wheel_width,
            postData.rear_wheel_type,
            postData.rear_wheel_width,
            postData.tire_type,
            postData.tube_type,
            postData.racing_pos,
            postData.climbing_pos,
            postData.helmet_type,
                                ],function(err,data){
            if (err) {
                throw err

            }else{
                db.query('SELECT * FROM bike_data',(err,data) => {
                    if (err) {
                        throw err
                    }else{
                        res.render('bike',{bike:data})
                    }


                });
            }
        })

});

module.exports = router;
