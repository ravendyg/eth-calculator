const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const calculateRouter = require('./src/backend/routes/calculate');
const statisticsRouter = require('./src/backend/routes/statistics');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use('/calculate', calculateRouter);
app.use('/statistics', statisticsRouter);
app.use(express.static(path.join(__dirname, 'build')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
