/**
 * Copyright(c) node-modules and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var utils = require('../');
var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var suite = new Benchmark.Suite();

var foo = function (cid, startDate, endDate, rate, callback) {
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
  console.log('Date.now(): %j', Date.now());
};

console.log('cache:', utils.getParamNames(foo));
console.log('no cache:', utils.getParamNames(foo, false));
console.log('------------------------');

suite
.add("utils.getParamNames(foo)", function () {
  utils.getParamNames(foo);
})
.add("utils.getParamNames(foo, false) no cache", function () {
  utils.getParamNames(foo, false);
})
.add("utils.getParamNames(newfn)", function () {
  function newfn(foo, bar) {}
  utils.getParamNames(newfn);
})
.add("utils.getParamNames(newfn, false) no cache", function () {
  function newfn(foo, bar) {}
  utils.getParamNames(newfn, false);
})

.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('start', function(event) {
  console.log('\n  get param names Benchmark\n  node version: %s, date: %s\n  Starting...',
    process.version, Date());
})
.on('complete', function done() {
  benchmarks.log();
})
.run({ 'async': false });

// $ node benchmark/get_paramnames.js
//
// cache: [ 'cid', 'startDate', 'endDate', 'rate', 'callback' ]
// no cache: [ 'cid', 'startDate', 'endDate', 'rate', 'callback' ]
// ------------------------
//
//   get param names Benchmark
//   node version: v0.11.12, date: Sat Aug 23 2014 22:45:38 GMT+0800 (CST)
//   Starting...
//   4 tests completed.
//
//   utils.getParamNames(foo)                   x 44,782,022 ops/sec ±1.63% (100 runs sampled)
//   utils.getParamNames(foo, false) no cache   x  1,108,420 ops/sec ±0.96% (97 runs sampled)
//   utils.getParamNames(newfn)                 x  1,332,794 ops/sec ±1.08% (98 runs sampled)
//   utils.getParamNames(newfn, false) no cache x  1,366,816 ops/sec ±0.89% (98 runs sampled)
