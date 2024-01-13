/* eslint-disable @typescript-eslint/no-var-requires */
// http://jsperf.com/access-log-date-format
const utils = require('../');
const moment = require('moment');
const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');

const suite = new Benchmark.Suite();

const fasterAccessDate = function() {
  // 0   1   2  3    4        5        6
  // Tue Apr 16 2013 16:40:09 GMT+0800 (CST)
  // =>
  // 16/Apr/2013:16:40:09 +0800
  const dates = new Date().toString().split(' ');
  return dates[2] + '/' + dates[1] + '/' + dates[3] + ':' + dates[4] + ' ' + dates[5].substring(3);
};

const fasterAccessDate2 = function() {
  // 0   1   2  3    4        5        6
  // Tue Apr 16 2013 16:40:09 GMT+0800 (CST)
  // =>
  // 16/Apr/2013:16:40:09 +0800
  const dates = Date().split(' ');
  return dates[2] + '/' + dates[1] + '/' + dates[3] + ':' + dates[4] + ' ' + dates[5].substring(3);
};

console.log('moment().format("DD/MMM/YYYY:HH:mm:ss ZZ"): %j', moment().format('DD/MMM/YYYY:HH:mm:ss ZZ'));
console.log('utils.accessLogDate(): %j', utils.accessLogDate());
console.log('utils.logDate(): %j', utils.logDate());
console.log('fasterAccessDate(): %j', fasterAccessDate());
console.log('fasterAccessDate2(): %j', fasterAccessDate2());
console.log('new Date().toString(): %j', new Date().toString());
console.log('Date(): %j', Date());
console.log('Date.now(): %j', Date.now());
console.log('------------------------');

suite
  .add("moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')", function() {
    moment().format('DD/MMM/YYYY:HH:mm:ss ZZ');
  })
  .add('utils.accessLogDate()', function() {
    utils.accessLogDate();
  })
  .add('utils.logDate()', function() {
    utils.logDate();
  })
  .add('fasterAccessDate()', function() {
    fasterAccessDate();
  })
  .add('fasterAccessDate2()', function() {
    fasterAccessDate2();
  })
  .add('new Date().toString()', function() {
    new Date().toString();
  })
  .add('Date()', function() {
    Date();
  })
  .add('Date.now()', function() {
    Date.now();
  })
  .on('cycle', function(event) {
    benchmarks.add(event.target);
  })
  .on('complete', function done() {
    benchmarks.log();
  })
  .run({ async: false });
