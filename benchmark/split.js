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

var crypto = require('crypto');
var utility = require('../');

var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var suite = new Benchmark.Suite();

console.log('utility.split("foo,bar")', utility.split('foo,bar'));
console.log('utility.split("foo.bar", ".")', utility.split('foo.bar', '.'));
console.log('utility.splitAlwaysOptimized("foo,bar")', utility.splitAlwaysOptimized('foo,bar'));
console.log('utility.splitAlwaysOptimized("foo.bar", ".")', utility.splitAlwaysOptimized('foo.bar', '.'));
console.log('------------- %s -----------', Date());

// %OptimizeFunctionOnNextCall(utility.split);
// %OptimizeFunctionOnNextCall(utility.splitAlwaysOptimized);

suite

.add('utility.splitAlwaysOptimized()', function () {
  utility.splitAlwaysOptimized();
  utility.splitAlwaysOptimized('foo,bar');
  utility.splitAlwaysOptimized('foo.bar', '.');
})

.add('utility.split()', function () {
  utility.split();
  utility.split('foo,bar');
  utility.split('foo.bar', '.');
})

.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('start', function(event) {
  console.log('\n  split string Benchmark\n  node version: %s, date: %s\n  Starting...',
    process.version, Date());
})
.on('complete', function done() {
  benchmarks.log();
})
.run({ 'async': false });
