var mysql = require('mysql')
//cloud database connection infomation
 var info = {
     host: "db-mysql-nyc3-79513-do-user-12149980-0.b.db.ondigitalocean.com",
     user: "cycoutadmin",
     port: "25060",
     password: "123456",
     database: "cycout_db"
}
//zac database connection information 
//var info = {
  //  host:'localhost',
    //port:3306,
    //user:"root",
    //password:"yourpasswd",
    //database:"athlete"
//}

// Waition database connection infomation
// var info = {
//     host: "localhost",
//     user: "husky",
//     port: "3306",
//     password: "",
//     database: "gpx"
// }

var db = mysql.createConnection(info);
var pool = mysql.createPool(info);

var exec = function (sql, params, callback) {
    pool.getConnection(function (err, con) {
        if (err) {
            callback(err, null, null);
        } else {
            if (params === null || params.length == 0) {
                var query = con.query(sql, function (err, results, fields) {
                    con.release();
                    callback(err, results, fields);
                })
                console.log("exec sql:"+query.sql);
            } else {
                con.query(sql, params, function (err, results, fields) {
                    con.release();
                    callback(err, results, fields);
                })
            }
        }

    });
}

db.exec = exec;
db.connect();
module.exports = db;
