'use strict';

var utility = require('../');
var objectAssign = require('object-assign');

var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var suite = new Benchmark.Suite();


suite
.add('Object.assign', function () {
  Object.assign({}, { a: 1 }, { b: 1 });
})

.add('utility.assign', function () {
  utility.assign({}, [ { a: 1 }, { b: 1 } ]);
})

.add('object-assign', function () {
  objectAssign({}, { a: 1 }, { b: 1 });
})

.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('start', function(event) {
  console.log('\n  assign Benchmark\n  node version: %s, date: %s\n  Starting...',
    process.version, Date());
})
.on('complete', function done() {
  benchmarks.log();
})
.run({ 'async': false });

// assign Benchmark
// node version: v6.9.1, date: Mon Feb 20 2017 17:55:34 GMT+0800 (CST)
// Starting...
// 3 tests completed.
//
// Object.assign  x 1,913,779 ops/sec ±2.75% (83 runs sampled)
// utility.assign x 1,997,215 ops/sec ±17.72% (71 runs sampled)
// object-assign  x 1,934,413 ops/sec ±2.37% (81 runs sampled)
//
// assign Benchmark
// node version: v4.6.2, date: Mon Feb 20 2017 17:56:05 GMT+0800 (CST)
// Starting...
// 3 tests completed.
//
// Object.assign  x   273,343 ops/sec ±3.26% (81 runs sampled)
// utility.assign x 1,672,904 ops/sec ±3.33% (80 runs sampled)
// object-assign  x   367,842 ops/sec ±3.32% (76 runs sampled)
