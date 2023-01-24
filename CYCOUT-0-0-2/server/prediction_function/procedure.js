//Contributed by: Nhu Long Nguyen

var express = require('express');
var router = express.Router();
// var db = require('../sql.js');

function solve_quadratic(a, b, c) {
    let delta = b * b - 4 * a * c;
    let res = 0.5;
    if (delta < 0) return 0.5;

    if (delta == 0) res = -b / (2 * a);
    else {
        let x1 = (-b + Math.sqrt(delta)) / (2 * a);
        let x2 = (-b - Math.sqrt(delta)) / (2 * a);

        if (x1 > 0) res = x1;
        else if (x2 > 0) res = x2;
    }

    return res;
}

function predict_time(distance) {
    let dt = 0.5, v = 0.1, d1 = 0.1, u = 0.1, d2 = d1, t = 0;
    let a;
    while (d2 < distance) {
        // Get variables, one of them is a - acceleration

        // Calculate
        v = u + a * dt; //t = dt
        d2 = d1 + (v * dt);

        // Check if we go over the destination
        if (d2 > distance) {
            dt = solve_quadratic(a, u, d1 - d2);
        } else {
            u = v;
            d1 = d2;
        }

        t += dt;

    }

    return t;
}


module.exports = router;