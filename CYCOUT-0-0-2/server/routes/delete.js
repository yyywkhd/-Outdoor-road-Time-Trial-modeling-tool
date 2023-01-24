var express = require('express');
var router = express.Router();
var db = require('../sql.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    var id = req.query.bike_id;
    db.query("delete from bike_data where bike_id=?",[parseInt(id)],function(err,data){

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

    });
});

module.exports = router;
