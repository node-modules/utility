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

function map0(obj) {
  var map = {};
  if (!obj) {
    return map;
  }

  for (var key in obj) {
    map[key] = obj[key];
  }
  return map;
}

function map1(obj) {
  var map = Object.create(null);
  if (!obj) {
    return map;
  }

  for (var key in obj) {
    map[key] = obj[key];
  }
  return map;
}

function map2(obj) {
  var map = new Map();
  if (!obj) {
    return map;
  }

  for (var key in obj) {
    map.set(key, obj[key]);
  }
  return map;
}

function Store() {}
Store.prototype = Object.create(null);

function map3(obj) {
  var map = new Store();
  if (!obj) {
    return map;
  }

  for (var key in obj) {
    map[key] = obj[key];
  }
  return map;
}

console.log('map0: %j', map0({ foo: 'bar' }));
console.log('map1: %j', map1({ foo: 'bar' }));
console.log('map3: %j', map3({ foo: 'bar' }));
console.log('utility.map: %j', utility.map({ foo: 'bar' }));

suite

.add('map = utility.map()', function() {
  utility.map({ foo: 'bar' });
})

.add('map = new Store()', function() {
  map3({ foo: 'bar' });
})

.add('map = {}', function() {
  map0({ foo: 'bar' });
})

.add('map = Object.create(null)', function() {
  map1({ foo: 'bar' });
})

.add('map = new Map()', function() {
  map2({ foo: 'bar' });
})

.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('start', function(event) {
  console.log('\n  map Benchmark\n  node version: %s, date: %s\n  Starting...',
    process.version, Date());
})
.on('complete', function done() {
  benchmarks.log();
})
.run({ 'async': false });

// node benchmark/map.js
//
// map0: {"foo":"bar"}
// map1: {"foo":"bar"}
// map3: {"foo":"bar"}
//
//   map Benchmark
//   node version: v4.4.3, date: Mon May 02 2016 14:16:53 GMT+0800 (CST)
//   Starting...
//   4 tests completed.
//
//   map = new Store()         x 28,292,183 ops/sec ±0.60% (98 runs sampled)
//   map = {}                  x 26,357,941 ops/sec ±0.64% (92 runs sampled)
//   map = Object.create(null) x  6,442,737 ops/sec ±0.60% (98 runs sampled)
//   map = new Map()           x  4,299,817 ops/sec ±0.57% (99 runs sampled)
//
// node benchmark/map.js
//
// map0: {"foo":"bar"}
// map1: {"foo":"bar"}
// map3: {"foo":"bar"}
//
//   map Benchmark
//   node version: v6.0.0, date: Mon May 02 2016 14:17:27 GMT+0800 (CST)
//   Starting...
//   4 tests completed.
//
//   map = new Store()         x 38,653,790 ops/sec ±0.54% (99 runs sampled)
//   map = {}                  x 39,003,607 ops/sec ±0.70% (95 runs sampled)
//   map = Object.create(null) x  9,407,616 ops/sec ±0.54% (98 runs sampled)
//   map = new Map()           x  6,951,186 ops/sec ±0.60% (96 runs sampled)
