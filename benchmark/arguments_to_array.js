'use strict';

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

function arrayFrom() {
  return Array.from(arguments);
}

console.log('Array.prototpye.slice.call(#arguments(1, 2, 3, 4, 5))', prototypeSlice(1, 2, 3, 4, 5));
console.log('[].slice.call(#arguments(1, 2, 3, 4, 5))', slice(1, 2, 3, 4, 5));
console.log('Array.from(#arguments(1, 2, 3, 4, 5))', arrayFrom(1, 2, 3, 4, 5));
console.log('utility.argumentsToArray(#arguments(1, 2, 3, 4, 5))', argumentsToArray(1, 2, 3, 4, 5));
console.log('------------- %s -----------', Date());

suite

.add('Array.prototpye.slice.call', function () {
  prototypeSlice(1, 2, 3, 4, 5);
})

.add('[].slice.call', function () {
  slice(1, 2, 3, 4, 5);
})

.add('Array.from', function () {
  arrayFrom(1, 2, 3, 4, 5);
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
// node version: v4.4.6, date: Tue Jul 05 2016 12:11:34 GMT+0800 (CST)
// Starting...
// 4 tests completed.
//
// Array.prototpye.slice.call x    525,065 ops/sec ±1.65% (84 runs sampled)
// [].slice.call              x    494,868 ops/sec ±3.45% (83 runs sampled)
// Array.from                 x    622,764 ops/sec ±2.20% (85 runs sampled)
// utility.argumentsToArray   x 14,542,352 ops/sec ±2.18% (83 runs sampled)
