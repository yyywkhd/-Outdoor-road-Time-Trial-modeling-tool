var express = require('express');
var router = express.Router();
var db = require('../sql.js');


/* GET home page. */
router.get('/', function(req, res, next) {
        db.query('SELECT * FROM bike_data',(err,data) => {
            if (err) {
                throw err
            }else{
                res.render('bike',{bike:data})
            }


        });
});


module.exports = router;
