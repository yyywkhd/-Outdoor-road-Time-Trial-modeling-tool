//zac

var express = require('express');
var router = express.Router();
// var db = require('../sql.js');

// L
function calculate_power_in(Mech_off, slope, delta_Watts) {
    return Mech_off * slope * delta_Watts;
}

// AA
function calculate_wprime(pre_wprime, OT, default_wprime, dt, derative_t, Dcp) {
    if ( Dcp == 0 ) {
        return pre_wprime - OT;
    } else {
        return default_wprime - (default_wprime - pre_wprime) * Math.exp((-dt)/derative_t);
    }
}

// Z
function calculate_derative_t(No_recovery, Dcp, default_wprime) {
    if ( No_recovery == 1 ) { 
        return 2287.2 * (Dcp ^ -0.688);
    } else if ( No_recovery == 2 ) {
        return default_wprime/Dcp;
    } else {
        return 546 * Math.exp((-0.01) * Dcp) + 316;
    }
}

// P
function calculate_Power_gravity(Slope, Speed) {
    return Slope * 9.81 * 79 * Speed;
}

// S
function calculate_Accel(Propulsive_force, MoI_whl_front, Wheel_radius, MoI_whl_rear) {
    return Propulsive_force / (79 + (MoI_whl_front / Wheel_radius ^ 2)  +( MoI_whl_rear / Wheel_radius ^ 2));
}

// O
function calculate_Power_roll(Crr, Speed) {
    return 79 * Crr * 9.81 * Speed;
}

module.exports = router;