/*!
 * utility - benchmark/date_format.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

// http://jsperf.com/access-log-date-format

var utils = require('../');
var moment = require('moment');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var fasterAccessDate2 = function () {
  // 0   1   2  3    4        5        6
  // Tue Apr 16 2013 16:40:09 GMT+0800 (CST)
  // =>
  // 16/Apr/2013:16:40:09 +0800
  var dates = Date().split(' ');
  return dates[2] + '/' + dates[1] + '/' + dates[3] + ':' + dates[4] + ' ' + dates[5].substring(3);
};

console.log('moment().format(): %j', moment().format('DD/MMM/YYYY:HH:mm:ss ZZ'));
console.log('utils.accessLogDate(): %j', utils.accessLogDate());
console.log('fasterAccessDate2(): %j', fasterAccessDate2());
console.log('new Date().toString(): %j', new Date().toString());
console.log('Date(): %j', Date());
console.log('------------------------');

suite
.add("moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')", function () {
  moment().format('DD/MMM/YYYY:HH:mm:ss ZZ');
})
.add('utils.accessLogDate()', function () {
  utils.accessLogDate();
})
.add('fasterAccessDate2()', function () {
  fasterAccessDate2();
})
.add('new Date().toString()', function () {
  new Date().toString();
})
.add('Date()', function () {
  Date();
})
// add listeners
.on('cycle', function (event) {
  console.log(String(event.target));
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ async: false });
