//Contributed by: Waitong Suen
//Description: This is the file include all prediction function environment variables
var express = require('express');
var router = express.Router();
var db = require('../sql.js');

function get_track(course_id){
    var course_info_list=[];
    return new Promise((resolve,reject)=>{
        var query = "SELECT point.pt_ele, point.pt_long, point.pt_lat FROM point INNER JOIN trk_seg ON trk_seg.pt_id = point.pt_id WHERE trk_seg.trk_id = (?) ORDER BY trk_seg.trk_index ASC";
        db.query(query,course_id, (err,course_info)=>{ 
            if (err) {
                throw err
            }else{
                for (var i = 0; i < course_info.length; i++) {  
                    course_info_list.push({lon: course_info[i].pt_long, lat: course_info[i].pt_lat});
                }
                resolve(course_info_list);
            }
        });

    });
    console.log("there is error in course_info.js, get_track function");
}

function toRad(num){
    return num * Math.PI / 180;
}

function toDeg(num){
    return num * 180 / Math.PI;
}

// function get_distance(lat1,lon1,lat2,lon2,prev_dist){
    function get_distance(lat1,lon1,lat2,lon2){
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c * 1000;
    return d.toFixed(1);
}

function get_bearing(lat1, lon1, lat2, lon2) {
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
    var lon1 = toRad(lon1);
    var lon2 = toRad(lon2);

    // MOD(ATAN2((COS(lat1)*SIN(lat2))-(SIN(lat1)*COS(lat1)*COS(lon2-lon1)), SIN(lon2-lon1)*COS(lat2)),2*PI())
    var y = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat1)*Math.cos(lon2-lon1);
    var x = Math.sin(lon2-lon1)*Math.cos(lat2);
    var intan = Math.atan2(x,y);
    // console.log("intan:",intan);
    return  Math.abs(intan % (2*Math.PI));
    // var y = Math.sin(lon2-lon1) * Math.cos(lat2);
    // var x = Math.cos(lat1)*Math.sin(lat2) -
    //         Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1);
    // var brng = Math.atan2(y, x);
    // brng = toDeg(brng);
    // return 360 - ((brng + 360) % 360);
}

function get_full_list(course){
    // console.log("get_full_list:",course);
    var new_list = [{
        'lat':course[0].lat,
        'lon':course[0].lon,
        'dist':0,
        'bearing':0
    }];
    for (var i = 1; i < course.length; i++) {
        var current = {
            'lat':0,
            'lon':0,
            'dist':0,
            'bearing':0
        }
        current.lat = course[i].lat;
        current.lon = course[i].lon;
        if(i == course.length-1){
            current.dist = get_distance(course[i].lat,course[i].lon,course[0].lat,course[0].lon);
            current.dist += parseFloat(new_list[i-1].dist);
            current.dist.toFixed(1);
            current.bearing = get_bearing(course[i].lat,course[i].lon,course[0].lat,course[0].lon);
        }else{
            // current.dist = get_distance(course[i].lat,course[i].lon,course[i+1].lat,course[i+1].lon,new_list[i-1].dist);
            current.dist = parseFloat(get_distance(course[i].lat,course[i].lon,course[i+1].lat,course[i+1].lon));
            current.dist += parseFloat(new_list[i-1].dist);
            current.dist.toFixed(1);
            current.bearing = get_bearing(course[i].lat,course[i].lon,course[i+1].lat,course[i+1].lon);
        }
        new_list.push(current);
    }
    return new_list;
}

async function get_course_info(course_id){
    var my_course = await get_track(course_id);
    var result = get_full_list(my_course);
    return result;
}

router.get('/run_track_info',async function(req, res, next) {
    var value = get_distance(35.37245,138.92742,35.37262,138.9279);
    console.log("value:",value);
    var result = await get_course_info(2);
    res.send(result);
});


router.post('/track_info_Sim',async function(req, res, next) {
    // console.log("req.body:",req.body.course_id);
    // // var result = await get_course_info(req.body.course_id);
    // var result = await get_course_info(2);
    // var elevation = 593;
    // var course_info = [];
    // for (var i = 0; i < result.length; i++) {
    //     // course_info.push([result[i].lat, result[i].lon,elevation,(parseFloat(result[i].dist)).toFixed(1)]);
    //     course_info.push([result[i].lat, result[i].lon,elevation,result[i].dist]);
    // }
    // console.log("course_info:",course_info[0]);
    // res.json(course_info);

    var course_info_list = [];
    var course_id = req.body.course_id;
    var query = "SELECT point.pt_ele, point.pt_long, point.pt_lat FROM point INNER JOIN trk_seg ON trk_seg.pt_id = point.pt_id WHERE trk_seg.trk_id = (?) ORDER BY trk_seg.trk_index ASC";
    db.query(query,course_id, (err,data)=>{ 
        if (err) {
            throw err
        }else{
            var course_info_list = [];
            for (var i = 0; i < data.length; i++) {  
                var bearing;
                var dist;
                if(i == 0){
                    dist = 0;
                    bearing = 0;
                }else if(i == data.length-1){
                    dist = parseFloat(get_distance(data[i].pt_lat,data[i].pt_long,data[0].pt_lat,data[0].pt_long));
                    dist += parseFloat(course_info_list[i-1].dist);
                    dist.toFixed(1);
                    bearing = get_bearing(data[i].pt_lat,data[i].pt_long,data[0].pt_lat,data[0].pt_long);
                }else{
                    dist = parseFloat(get_distance(data[i].pt_lat,data[i].pt_long,data[i+1].pt_lat,data[i+1].pt_long));
                    // if (i >0){
                    dist += parseFloat(course_info_list[i-1].dist);
                    // }
                    dist.toFixed(1);
                    bearing = get_bearing(data[i].pt_lat,data[i].pt_long,data[i+1].pt_lat,data[i+1].pt_long);
                }
                course_info_list.push({lon: data[i].pt_long, lat: data[i].pt_lat, ele: data[i].pt_ele, dist: dist, bearing: bearing});
            }
            res.json(course_info_list);
        }
    });
});

module.exports = router;



// Waiton's playground

// var express = require('express');
// var router = express.Router();
// var db = require('../sql.js');

// var course_info_list=[];
// // var course;

// function get_track(course_id){
//     // return new Promise((resolve,reject)=>{
//     // var course_info_list=[];
//     const promise_list = [];
//     var query = "SELECT point.pt_long, point.pt_lat FROM point INNER JOIN trk_seg ON trk_seg.pt_id = point.pt_id WHERE trk_seg.trk_id = (?) ORDER BY trk_seg.trk_index ASC";
//     db.query(query,course_id, (err,course_info)=>{ 
        
//         if (err) {
//              throw err
//          }else{
//             var points = {'lon':0,'lat':0};
//             //  console.log("path sent from server: \n",course_info[0]);

//              for (var i = 0; i < course_info.length; i++) {
//                 points.lat = course_info[i].pt_lat;
//                 points.lon = course_info[i].pt_long;
//                 // course_info_list.push(points);
//                 promise_list.push(new Promise((resolve,reject)=>{
//                     resolve(points);
//                 }));

//             }
//             return Promise.all(promise_list);
            
//         }

//     }
//     );
    
//     // }) 
// }
// function toRad(num){
//     return num * Math.PI / 180;
// }

// function toDeg(num){
//     return num * 180 / Math.PI;
// }

// function get_distance(lat1,lon1,lat2,lon2){
//     var R = 6371; // km
//     var dLat = toRad(lat2-lat1);
//     var dLon = toRad(lon2-lon1);
//     var lat1 = toRad(lat1);
//     var lat2 = toRad(lat2);

//     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//             Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//     var d = R * c;
//     return d;
// }

// function get_bearing(lat1, lon1, lat2, lon2) {
//     var lat1 = toRad(lat1);
//     var lat2 = toRad(lat2);
//     var lon1 = toRad(lon1);
//     var lon2 = toRad(lon2);

//     // MOD(ATAN2((COS(lat1)*SIN(lat2))-(SIN(lat1)*COS(lat1)*COS(lon2-lon1)), SIN(lon2-lon1)*COS(lat2)),2*PI())
//     var y = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat1)*Math.cos(lon2-lon1);
//     var x = Math.sin(lon2-lon1)*Math.cos(lat2);
//     var intan = Math.atan2(x,y);
//     // console.log("intan:",intan);
//     return  intan % (2*Math.PI);
//     // var y = Math.sin(lon2-lon1) * Math.cos(lat2);
//     // var x = Math.cos(lat1)*Math.sin(lat2) -
//     //         Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1);
//     // var brng = Math.atan2(y, x);
//     // brng = toDeg(brng);
//     // return 360 - ((brng + 360) % 360);
// }

// function get_full_list(course){
//     // console.log("get_full_list:",course);
//     var new_list = [{
//         'lat':course[0].lat,
//         'lon':course[0].lon,
//         'dist':0,
//         'bearing':0
//     }];
//     var current = {
//         'lat':0,
//         'lon':0,
//         'dist':0,
//         'bearing':0
//     }
//     for (var i = 1; i < course.length; i++) {
//         current.lat = course[i].lat;
//         current.lon = course[i].lon;
//         if(i == course.length-1){
//             current.dist = get_distance(course[i].lat,course[i].lon,course[0].lat,course[0].lon);
//             current.bearing = get_bearing(course[i].lat,course[i].lon,course[0].lat,course[0].lon);
//         }else{
//             current.dist = get_distance(course[i].lat,course[i].lon,course[i+1].lat,course[i+1].lon);
//             current.bearing = get_bearing(course[i].lat,course[i].lon,course[i+1].lat,course[i+1].lon);
//         }
//         new_list.push(current);
//     }
//     return new_list;
// }

// // function sleep(ms) {
// //     return new Promise(resolve => setTimeout(resolve, ms));
// //   }

// async function get_course_info(course_id){
//     // var course = await Promise.all(get_track(course_id));
//     const course = await get_track(course_id);
//     // await sleep(1000);
//     // course.then(value){
//         console.log("end of get_course_info:",course);
//         return course;
//     // };
// }


// async function test(course_id){
//     var lo1 = Promise.resolve({lon: 138.586868, lat: -34.921141});
//     var lo2 = Promise.resolve({lon: 138.586869, lat: -34.921142});
//     var lo3 = Promise.resolve({lon: 138.586870, lat: -34.921143});
//     var array = [];
//     // array.push(lo1);
//     // array.push(lo2);
//     // array.push(lo3);
//     var query = "SELECT point.pt_long, point.pt_lat FROM point INNER JOIN trk_seg ON trk_seg.pt_id = point.pt_id WHERE trk_seg.trk_id = (?) ORDER BY trk_seg.trk_index ASC";
//     return new Promise((resolve,reject)=>{
//         db.query(query,course_id, (err,course_info)=>{ 
//             if (err) {
//                 throw err
//             }else{
//                 //  console.log("path sent from server: \n",course_info[0]);

//                 for (var i = 0; i < course_info.length; i++) {
//                     // var points = {'lon':0,'lat':0};
//                     // points.lat = course_info[i].pt_lat;
//                     // points.lon = course_info[i].pt_long;
//                     array.push({lon: course_info[i].pt_long, lat: course_info[i].pt_lat});
//                 }
//                 resolve(array);
//                 // console.log(array);
                
//                 // return Promise.all(array);
//                 // console.log("should not show");
//             }
            
//         });
//     });
//     // return Promise.all(array);
// }

// router.get('/run_track_info',async function(req, res, next) {
//     // var course2 = get_course_info(2);
//     // setTimeout(() => { console.log("inside",course_info_list[4]); }, 5000);
//     // console.log("2inside",course_info_list[0]);
//     // await sleep(1000);
//     // var my_course = await get_course_info(2);
//     var my_course = await test(2);
//     // console.log(get_distance(35.37245,138.92742,35.37262,138.9279));
//     // setTimeout(() =>{console.log("end of get_course_info:",my_course);res.send(my_course);}, 5000);
//     // console.log(get_bearing(35.37245,138.92742,35.37262,138.9279));
//     console.log("my_course:",my_course);
//     // my_course = get_full_list(my_course);

//     res.send(my_course);

// });



// module.exports = router;

