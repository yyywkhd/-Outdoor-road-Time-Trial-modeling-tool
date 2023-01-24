var express = require('express');
var router = express.Router();
var db = require('../sql.js');
/*
Data body example:
track
{
	"start_id": 1,
	"end_id": 5,
	"user_id": 1,
	"track_id": 2,
	"track_name":"test",
}

point
{
    track_id:
    pt_index:
    pt_id:
    pt_name:
    pt_lon:
    pt_lat:
}

*/

router.get('/get_point_id', function(req,res, next) {
    var query =  "SELECT pt_id FROM point ORDER BY pt_id DESC LIMIT 1;";
    db.query(query,(err,data)=>{

       if (err) {
            throw err
        }else{
            var id = JSON.stringify(data[0].pt_id)
            id++
            console.log("server send: next point id is :", id)
            res.json(id)
        }
    });
});


router.get('/get_track_id', function(req,res, next) {
    var query =  "SELECT trk_id FROM track ORDER BY trk_id DESC LIMIT 1;";
    db.query(query,(err,data)=>{

       if (err) {
            throw err
        }else{
            var trk_id = JSON.stringify(data[0].trk_id);
            trk_id++;
            console.log("server send: next track id is :", trk_id)
            // console.log(id)
            res.json(trk_id)
        }
    });
});



router.post('/track_insert', function(req, res, next) {
    var postData=req.body
    console.log(postData)
    db.query("insert into user_track value (?,?)",
            [postData.user_id, postData.track_id ],function(err,data){
        });
    db.query("insert into track value (?,?,?,?)",
        [postData.track_id,postData.track_name,postData.start_id,postData.end_id ],function(err,data){
    });
    // for(let i = 0; i < postData.point.length; i++){
    //     db.query("insert into trk_seg value (?,?,?,?)",
    //         [postData.track_id, postData.point[i].pt_index,postData.point[i].pt_id,0 ],function(err,data){
    //     });
    //     db.query("insert into point value (?,?,?,?)",
    //         [postData.point[i].pt_id, postData.point[i].pt_name,postData.point[i].pt_lon,postData.point[i].pt_lat ],function(err,data){
    //     });
    //     console.log("done on point",i)
    // }
    console.log("Server input track data done")
    res.sendStatus(200);
});



router.post('/point_insert', function(req, res, next) {
    var postData=req.body
    console.log(postData)
    db.query("insert into trk_seg value (?,?,?,?)",
            [postData.track_id, postData.pt_index, postData.pt_id,0 ],function(err,data){
        });
        db.query("insert into point value (?,?,?,?,?)",
            [postData.pt_id, postData.pt_name,postData.pt_lon,postData.pt_lat,postData.pt_ele ],function(err,data){
        });
        // console.log("done on point",postData.pt_index)
        res.sendStatus(200);
});

router.get('/get_track', function(req, res, next) {
    var track = req.body.track_id;

    console.log(req.body)
    console.log(track)
    // var track_id = 1
    // var query = "SELECT trk_seg.trk_index, trk_seg.wpt, point.pt_long, point.pt_lat FROM point INNER JOIN trk_seg ON trk_seg.pt_id = point.pt_id WHERE trk_seg.trk_id = (?) ORDER BY trk_seg.trk_index ASC"
    var query = "SELECT point.pt_long, point.pt_lat FROM point INNER JOIN trk_seg ON trk_seg.pt_id = point.pt_id WHERE trk_seg.trk_id = (?) ORDER BY trk_seg.trk_index ASC"
    db.query(query,track,(err,data)=>{

       if (err) {
            throw err
        }else{
            console.log("path sent from server: \n",data)
            res.json(data)
        }
    });
});

router.get('/get_track_demo', function(req, res, next) {
    // var track_id = 1
    // var query = "SELECT trk_seg.trk_index, trk_seg.wpt, point.pt_long, point.pt_lat FROM point INNER JOIN trk_seg ON trk_seg.pt_id = point.pt_id WHERE trk_seg.trk_id = (?) ORDER BY trk_seg.trk_index ASC"
    var query = "SELECT point.pt_ele, point.pt_long, point.pt_lat FROM point INNER JOIN trk_seg ON trk_seg.pt_id = point.pt_id WHERE trk_seg.trk_id = 2 ORDER BY trk_seg.trk_index ASC"
    db.query(query,(err,data)=>{

       if (err) {
            throw err
        }else{
            console.log("path sent from server:4 \n")
            res.json(data)
        }
    });
});

// function get_point(){
//     // let query =  "SELECT MAX(pt_id) FROM point"
//     let query =  "SELECT pt_id FROM point ORDER BY pt_id DESC LIMIT 1"
//     // var result = db.query(query);
//     var result = db.query(query,function(err,data,fields){

//         if(err){return err;}
//         var id = JSON.stringify(data[0].pt_id)
//         console.log("inner",id)
//     });
//     console.log("outer",result)
//     return result;
// }

// router.post('/trk_seg', function(req, res, next) {
//     var id = 0
//     id = get_point()
//     // console.log("outside db",id)
//     // res.send();
//     // db.query("insert into trk_seg (trk_id,wpt) value (?,?)",
//     // [postData.track_id, index ,postData.point[i].pt_id,0 ],function(err,data){

//     // });
// });

// router.post('/track_insert', function(req, res, next) {
//     var postData=req.body

//     db.query("insert into user_track value (?,?)",
//             [postData.user_id, postData.track_id ],function(err,data){
//         });
//     db.query("insert into track (trk_id,trk_name,start_id,end_id) value (?,?,?)",
//         [postData.track_name,postData.start_id,postData.end_id ],function(err,data){
//     });
//     //get point id
//     for(let i = 0; i < postData.point.length; i++){
//         // console.log("id, index",id,index)
//         db.query("insert into trk_seg value (?,?,?,?)",
//             [postData.track_id, index ,postData.point[i].pt_id,0 ],function(err,data){
//                 index++;
//         });
//         db.query("insert into point (pt_name,pt_long,pt_lat) value (?,?,?)",
//             [postData.point[i].pt_name,postData.point[i].pt_lon,postData.point[i].pt_lat ],function(err,data){
//         });
//         console.log("done on point",i)
//     }
//     db.query('SELECT * FROM point',(err,data) => {
//         if (err) {
//             throw err
//         }else{
//             res.render('point_treatment',{point:data})
//         }
//     });

// });


/*
SELECT
    trk_seg.trk_index, trk_seg.wpt, point.pt_long, point.pt_lat
FROM
    point INNER JOIN trk_seg
ON
    trk_seg.pt_id = point.pt_id
WHERE
    trk_seg.trk_id = 1
ORDER BY
    trk_seg.trk_index ASC;
    */



/*
get last point id

var query = "SELECT MAX(pt_id) FROM point";

db.query(query,(err,data)=>{
    console.log(data)
   if (err) {
        throw err
    }else{
        var id = JSON.stringify(data[0]['MAX(pt_id)'])
        console.log(id)
        res.render('point_treatment',{point:data})
    }
});
*/
module.exports = router;