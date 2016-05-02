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

var utility = require('../');

var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var suite = new Benchmark.Suite();

function getArguments() {
  return arguments;
}

function prototypeSlice() {
  return Array.prototype.slice.call(arguments);
}

function slice() {
  return [].slice.call(arguments);
}

function argumentsToArray() {
  return utility.argumentsToArray(arguments);
}

console.log('Array.prototpye.slice.call(#arguments(1, 2, 3, 4, 5))', prototypeSlice(1, 2, 3, 4, 5));
console.log('[].slice.call(#arguments(1, 2, 3, 4, 5))', slice(1, 2, 3, 4, 5));
console.log('utility.argumentsToArray(#arguments(1, 2, 3, 4, 5))', argumentsToArray(1, 2, 3, 4, 5));
console.log('------------- %s -----------', Date());

suite

.add('Array.prototpye.slice.call', function () {
  prototypeSlice(1, 2, 3, 4, 5);
})

.add('[].slice.call', function () {
  slice(1, 2, 3, 4, 5);
})

.add('utility.argumentsToArray', function () {
  argumentsToArray(1, 2, 3, 4, 5);
})

.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('start', function(event) {
  console.log('\n  arguments to array Benchmark\n  node version: %s, date: %s\n  Starting...',
    process.version, Date());
})
.on('complete', function done() {
  benchmarks.log();
})
.run({ 'async': false });

// arguments to array Benchmark
// node version: v4.2.4, date: Thu Apr 07 2016 01:04:11 GMT+0800 (CST)
// Starting...
// 3 tests completed.
//
// Array.prototpye.slice.call x    578,606 ops/sec ±1.87% (82 runs sampled)
// [].slice.call              x    584,230 ops/sec ±1.23% (87 runs sampled)
// utility.argumentsToArray   x 16,019,542 ops/sec ±1.98% (83 runs sampled)
