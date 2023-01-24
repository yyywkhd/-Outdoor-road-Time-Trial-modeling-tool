/*
 * Author: Dong Wang
 * Description: help function for race power plan variable.
 */

/* required */
const express = require('express');
const router = express.Router();

// const db = require('../sql.js');

class RacePowerPosition {
    // constructor
    /*
        * @param {a number between 0 and 1} steadyState_P - steady state power percentage
        * @param {a number between 0 and 1} overThresholdCP_P - over threshold power percentage
        * @param {a number between 0 and 1} descend_P - descend power percentage
        * @param {an integer number} FTP - CP (or FTP)
        *
        * @param {a positive float number} powerForBelow - power for below slope
        * @param {a positive integer number} powerForOver - power for over slope
     */
    constructor(steadyState_P, overThresholdCP_P, descend_P, FTP, powerForBelow, powerForOver) {
        // calculate the steady state power, over threshold power and descend power
        this.steadyState = steadyState_P * FTP;
        this.overThresholdCP = overThresholdCP_P * FTP;
        this.descend = descend_P * FTP;

        // calculate Slope threshold below which rider comes off steady state power
        // and slope threshold above which rider goes over steady state power
        this.slopeBelow = powerForBelow / 200;
        this.slopeOver = powerForOver / 200;
        this._steadyState_P = steadyState_P;
        this._overThresholdCP_P = overThresholdCP_P;
        this._descend_P = descend_P;
        this._FTP = FTP;
        this._powerForBelow = powerForBelow;
        this._powerForOver = powerForOver;
    }


    /*
     * Input as percentages of critical power for three types of course section: ‘steady-state’, ‘over-threshold (CP)’ and ‘descend’.
     *
     * This is a pragmatic simplification vs. reality, where the rider will blend in between
     * these values dependent on a complex mix of gradient, w’ balance, momentum,
     * corners etc
     *
     * following three methods correspond to `Power input % of CP` cell in the Excel.
     */
    getSteadyState() {
        return this.steadyState;
    }

    getOverThresholdCP() {
        return this.overThresholdCP;
    }

    getDescend() {
        return this.descend;
    }


    /*
     * User defines slope values at which the model switches between these ranges
     *
     * Following methods correspond to `Power vs. slope info input` cell in the Excel.
     */
    getSlopeBelow() {
        return this.slopeBelow;
    }

    getSlopeOver() {
        return this.slopeOver;
    }

    /*
     * User similarly defines slope values at which the model switches between the position the rider holds (added in v4 of the spreadsheet)
     *
     * Following methods correspond to `Position selection` cell in the Excel.
     */
    setSlopeDescendPosition(value) {
        // Slope threshold below which rider goes into descending position
        this._slopeDescendPosition = value;
    }

    getSlopeDescendPosition() {
        return this._slopeDescendPosition;
    }

    setSlopeClimbPosition(value) {
        // Slope threshold above which rider goes into climbing position
        this._slopeClimbPosition = value;
    }

    getSlopeClimbPosition() {
        return this._slopeClimbPosition;
    }

    /* getter and setter for all the variables */
    getSteadyState_P() {
        return this._steadyState_P;
    }

    setSteadyState_P(value) {
        this._steadyState_P = value;
    }

    getOverThresholdCP_P() {
        return this._overThresholdCP_P;
    }

    setOverThresholdCP_P(value) {
        this._overThresholdCP_P = value;
    }

    getDescend_P() {
        return this._descend_P;
    }

    setDescend_P(value) {
        this._descend_P = value;
    }

    getFTP() {
        return this._FTP;
    }

    setFTP(value) {
        this._FTP = value;
    }

    getPowerForBelow() {
        return this._powerForBelow;
    }

    setPowerForBelow(value) {
        this._powerForBelow = value;
    }

    getPowerForOver() {
        return this._powerForOver;
    }

    setPowerForOver(value) {
        this._powerForOver = value;
    }
}


module.exports = router;