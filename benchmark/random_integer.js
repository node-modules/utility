'use strict';

var benchmarks = require('beautify-benchmark');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var crypto = require('crypto');
var utility = require('../');

function random256(upper) {
  return crypto.randomBytes(1)[0] % upper;
}

function random65536(upper) {
  return crypto.randomBytes(2).readUIntBE(0, 2) % upper;
}

console.log("random256: %s", random256(100));
console.log("utility.random(100): %s", utility.random(100));
console.log("random65536: %s", random65536(100));
console.log("utility.random(100): %s", utility.random(65536));
console.log('------------- %s -----------', Date());

suite
  .add('utility.random between 0 ~ 256', function() {
    utility.random(100);
  })
  .add('crypto.randomBytes between 0 ~ 256', function() {
    random256(100);
  })
  .add('utility.random between 0 ~ 65536', function() {
    utility.random(65536);
  })
  .add('crypto.randomBytes between 0 ~ 65536', function() {
    random65536(100);
  })
  // add listeners
  .on('cycle', function(event) {
    benchmarks.add(event.target);
  })
  .on('start', function(event) {
    console.log('\n  arguments to random number Benchmark\n  node version: %s, date: %s\n  Starting...',
      process.version, Date());
  })
  .on('complete', function done() {
    benchmarks.log();
  })
  .run({ async: false });

// $ node benchmark/random_integer.js
// random256: 80
// utility.random(100): 90
// random65536: 11
// utility.random(100): 20417
// ------------- Mon Nov 14 2016 12:50:58 GMT+0800 (CST) -----------

//   arguments to random number Benchmark
//   node version: v6.9.1, date: Mon Nov 14 2016 12:50:58 GMT+0800 (CST)
//   Starting...
//   4 tests completed.

//   utility.random between 0 ~ 256       x 46,706,056 ops/sec ±1.76% (83 runs sampled)
//   crypto.randomBytes between 0 ~ 256   x    353,527 ops/sec ±3.51% (74 runs sampled)
//   utility.random between 0 ~ 65536     x 48,401,527 ops/sec ±1.28% (87 runs sampled)
//   crypto.randomBytes between 0 ~ 65536 x    342,964 ops/sec ±6.29% (74 runs sampled)
