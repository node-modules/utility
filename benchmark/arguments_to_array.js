/**!
 * utility - benchmark/split.js
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

var utility = require('../');

var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var suite = new Benchmark.Suite();

function getArguments() {
  return arguments;
}

const args = getArguments(1, 2, 3, 4, 5);

console.log('Array.prototpye.slice.call(#arguments(1, 2, 3, 4, 5))', Array.prototype.slice.call(args));
console.log('[].slice.call(#arguments(1, 2, 3, 4, 5))', [].slice.call(args));
console.log('utility.argumentsToArray(#arguments(1, 2, 3, 4, 5))', utility.argumentsToArray(args));
console.log('------------- %s -----------', Date());

// %OptimizeFunctionOnNextCall(utility.split);
// %OptimizeFunctionOnNextCall(utility.splitAlwaysOptimized);

suite

.add('Array.prototpye.slice.call', function () {
  Array.prototype.slice.call(args);
})

.add('[].slice.call', function () {
  [].slice.call(args);
})

.add('utility.argumentsToArray', function () {
  utility.argumentsToArray(args);
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
// node version: v4.2.4, date: Wed Apr 06 2016 22:51:17 GMT+0800 (CST)
// Starting...
// 3 tests completed.
//
// Array.prototpye.slice.call x    640,294 ops/sec ±1.21% (96 runs sampled)
// [].slice.call              x    642,219 ops/sec ±1.17% (93 runs sampled)
// utility.argumentsToArray   x 28,964,974 ops/sec ±1.09% (95 runs sampled)
