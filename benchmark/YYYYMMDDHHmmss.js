/**!
 * utility - benchmark/YYYYMMDDHHmmss.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var utility = require('../');
var moment = require('moment');

var suite = new Benchmark.Suite();

console.log(utility.YYYYMMDDHHmmss());
console.log(moment().format('YYYY-MM-DD HH:mm:ss'));

// add tests
suite

.add('utility.YYYYMMDDHHmmss()', function() {
  utility.YYYYMMDDHHmmss();
})
.add("moment().format('YYYY-MM-DD HH:mm:ss')", function() {
  moment().format('YYYY-MM-DD HH:mm:ss');
})

// add listeners
.on('cycle', function (event) {
  benchmarks.add(event.target);
})
.on('start', function () {
  console.log('\n  node version: %s, date: %s\n  Starting...', process.version, Date());
})
.on('complete', function() {
  benchmarks.log();
})
// run async
.run({ 'async': false });

// $ node benchmark/YYYYMMDDHHmmss.js
//
// 2014-06-19 12:37:15
// 2014-06-19 12:37:15
//
//   node version: v0.11.12, date: Thu Jun 19 2014 12:37:15 GMT+0800 (CST)
//   Starting...
//   2 tests completed.
//
//   utility.YYYYMMDDHHmmss()               x 2,878,879 ops/sec ±2.44% (96 runs sampled)
//   moment().format('YYYY-MM-DD HH:mm:ss') x   138,521 ops/sec ±1.11% (96 runs sampled)
