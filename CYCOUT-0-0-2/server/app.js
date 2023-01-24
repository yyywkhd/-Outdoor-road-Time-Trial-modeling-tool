var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// bike
var bikeRouter = require("./routes/bike");
var bikeAdd = require("./routes/bikeAdd");
var del = require("./routes/delete");
var gpx = require("./routes/gpx_post");
var UInfoRouter = require("./routes/athe");

// prediction
var environment_data = require("./prediction_function/environment");
var course_info = require("./prediction_function/course_info");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// router for bike
app.use('/bike', bikeRouter);
app.use('/bikeAdd',bikeAdd);
app.use('/delete', del);

// router for gpx
app.use('/gpx', gpx);

// router for userinfo
app.use('/userinfo', UInfoRouter);

// router for prediction
app.use('/environment', environment_data);
app.use('/course_info', course_info);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
