import React from "react";
import "../Dashboard/Dashboard.css";

function DashboardForm() {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-10 line">
          <div class="row">
            <div class="col-sm-4 col-md-4 column">
              <h2 class="title">My Bikes</h2>
              <h3 class="count myBikes">00</h3>
              <div class="add">
                <a href="/login">
                  <span class="material-symbols-outlined">library_add</span>
                </a>
              </div>
            </div>
            <div class="col-sm-4 col-md-4 column">
              <h2 class="title">My Courses</h2>
              <h3 class="count myCourses">00</h3>
              <div class="add">
                <a href="/#">
                  <span class="material-symbols-outlined">library_add</span>
                </a>
              </div>
            </div>
            <div class="col-sm-4 col-md-4 column">
              <h2 class="title">My Races</h2>
              <h3 class="count myRaces">00</h3>
              <div class="add">
                <a href="/#">
                  <span class="material-symbols-outlined">library_add</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-10 line">
            <h2>Recent Race Plans</h2>
            <div class="table-responsive">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th>Race</th>
                    <th>Course</th>
                    <th>Distance</th>
                    <th>Time</th>
                    <th>Speed (avg)</th>
                    <th>Power (avg)</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardForm;
