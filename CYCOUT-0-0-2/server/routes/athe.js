var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../sql.js');

// application/x-www-form-urlencoded Code parsing
var urlencodedParser = bodyParser.urlencoded({extended: false})

  //Status returns 1 on success and 0 on failure
  var response = {
    "status": 0,
    "message": "error",
    "data": ""
}


//List
router.get('/list', function (req, res) {
    console.log(" /list request,param:", req.query);

    var params = {
        cloud_id: req.query.id
    }

db.exec("SELECT * FROM `infomation` where ? ",params,function(err, result, fields){
    console.log(result);
    if (err) {
        console.log("query fail", err);
        res.send(response);
        throw err;
    } else {
        console.log("query succ");
        response.status = 1;
        response.message = "succ";
        response.data = result;
        res.send(response);
    }
});

})


//insert 
router.post('/insert', urlencodedParser, function (req, res) {
    console.log(" /insert request,param:", req.body);

    //To obtain parameters
    var params = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        experience: req.body.experience,
        training_eleva: req.body.training_eleva,
        height: req.body.height,
        weight: req.body.weight,
        MAX_HR: req.body.MAX_HR,
        FTP: req.body.FTP,
        Pre_units: req.body.Pre_units,
        Gender: req.body.Gender,
        cloud_id: req.body.cloud_id
    }

    db.exec('INSERT INTO `infomation` SET ?',params,function(err, result, fields){
        console.log(result);
        if (err) {
            console.log("insert fail", err);
            res.send(response);
            throw err;
        } else {
            console.log("insert succ");
            response.status = 1;
            response.message = "succ";
            res.send(response);
        }
    });
})








//update 
router.post('/update', urlencodedParser, function (req, res) {
    console.log(" /update request,param:", req.body);
    //Status returns 1 on success and 0 on failure

    // var params = {
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     birthday: req.body.birthday,
    //     experience: req.body.experience,
    //     training_eleva: req.body.training_eleva,
    //     height: req.body.height,
    //     weight: req.body.weight,
    //     MAX_HR: req.body.MAX_HR,
    //     FTP: req.body.FTP,
    //     Pre_units: req.body.Pre_units,
    //     Gender: req.body.Gender,
    //     cloud_id: req.body.cloud_id
    // };
    params = [];
    var sql = "UPDATE infomation SET ";

    if(req.body.first_name)
    {
        params.push(req.body.first_name);
        sql += "first_name =  ? ,"
    }

    if(req.body.last_name)
    {
        params.push(req.body.last_name);
        sql += "last_name =  ? ,"
    }

    if(req.body.birthday)
    {
        params.push(req.body.birthday);
        sql += "birthday =  ? ,"
    }

    if(req.body.experience)
    {
        params.push(req.body.experience);
        sql += "experience =  ? ,"
    }

    if (req.body.training_eleva)
    {
        params.push(req.body.training_eleva);
        sql += "training_eleva =  ?,"
    }

    if(req.body.height)
    {
        params.push(req.body.height);
        sql += "height =  ?,"
    }

    if (req.body.MAX_HR)
    {
        params.push(req.body.MAX_HR);
        sql += "MAX_HR =  ?,"
    }

    if(req.body.FTP)
    {
        params.push(req.body.FTP);
        sql += "FTP =  ?,"
    }

    if(req.body.weight)
    {
        params.push(req.body.weight);
        sql += "weight =  ?,"
    }

    if(req.body.Pre_units)
    {
        params.push(req.body.Pre_units);
        sql += "Pre_units =  ?,"
    }

    if(req.body.Gender)
    {
        params.push(req.body.Gender);
        sql += "Gender =  ?,"
    }


    if(sql.endsWith(",")){
         sql = sql.substring(0,sql.lastIndexOf(","));
    }

    sql += " WHERE cloud_id = ? ";
    params.push(req.body.cloud_id);
    // params[id] = req.body.id;
    // sql += " where id  =  ?"

    // params[cloud_id] = req.body.cloud_id;
    // sql += " where cloud_id  =  ?"

    sql += ";"
    console.log(sql);
    console.log(params);
    if (params.length > 1) {
        db.exec(sql,params,function(err, result, fields){
            console.log("result",result);
            if (err) {
                console.log("update fail", err);
                res.send(response);
                throw err;
            } else {
                console.log("update succ");
                response.status = 1;
                response.message = "succ";
                res.send(response);
            }
        });
    }
    else {
        response.status = 0;
        response.message = "no data";
        res.send(response);
    }

})


//delete 
router.get('/delete', function (req, res) {
    console.log(" /delete request,param:", req.query);

    var params = {
        id: req.query.id
    }

db.exec("DELETE FROM infomation where ? ",params,function(err, result, fields){
    console.log(result);
    if (err) {
        console.log("query fail", err);
        res.send(response);
        throw err;
    } else {
        console.log("query succ");
        response.status = 1;
        response.message = "succ";
        response.data = result;
        res.send(response);
    }
});

});

module.exports = router;
