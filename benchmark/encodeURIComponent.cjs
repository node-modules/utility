/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('crypto');
const utility = require('../');

const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const suite = new Benchmark.Suite();

const encodeString = utility.encodeURIComponent('dsdf/!@#$++\\....,,束带结发');

console.log('utility.encodeURIComponent("dsdf/!@#$++\\....,,束带结发")',
  utility.encodeURIComponent('dsdf/!@#$++\\....,,束带结发'));
console.log('encodeURIComponent("dsdf/!@#$++\\....,,束带结发")',
  encodeURIComponent('dsdf/!@#$++\\....,,束带结发'));
console.log('utility.decodeURIComponent(encodeString)',
  utility.decodeURIComponent(encodeString));
console.log('decodeURIComponent(encodeString)',
  decodeURIComponent(encodeString));

suite

  .add('utility.encodeURIComponent()', function() {
    utility.encodeURIComponent('dsdf/!@#$++\\....,,束带结发');
  })

  .add('encodeURIComponent()', function() {
    encodeURIComponent('dsdf/!@#$++\\....,,束带结发');
  })

  .add('utility.decodeURIComponent()', function() {
    utility.decodeURIComponent(encodeString);
  })

  .add('decodeURIComponent()', function() {
    decodeURIComponent(encodeString);
  })

  .on('start', function() {
    console.log('\n  encodeURIComponent Benchmark\n  node version: %s, date: %s\n  Starting...',
      process.version, Date());
  })
  .on('cycle', function(event) {
    benchmarks.add(event.target);
  })
  .on('complete', function() {
    benchmarks.log();
  })
  .run({ async: false });

// $ node benchmark/encodeURIComponent.js
//
// utility.encodeURIComponent("dsdf/!@#$++\....,,束带结发") dsdf%2F!%40%23%24%2B%2B%5C....%2C%2C%E6%9D%9F%E5%B8%A6%E7%BB%93%E5%8F%91
// encodeURIComponent("dsdf/!@#$++\....,,束带结发") dsdf%2F!%40%23%24%2B%2B%5C....%2C%2C%E6%9D%9F%E5%B8%A6%E7%BB%93%E5%8F%91
// utility.decodeURIComponent(encodeString) dsdf/!@#$++\....,,束带结发
// decodeURIComponent(encodeString) dsdf/!@#$++\....,,束带结发
//
//   encodeURIComponent Benchmark
//   node version: v0.11.12, date: Sat Aug 23 2014 23:03:53 GMT+0800 (CST)
//   Starting...
//   4 tests completed.
//
//   utility.encodeURIComponent() x   314,966 ops/sec ±1.04% (99 runs sampled)
//   encodeURIComponent()         x   322,300 ops/sec ±0.90% (94 runs sampled)
//   utility.decodeURIComponent() x 1,121,973 ops/sec ±1.06% (96 runs sampled)
//   decodeURIComponent()         x 1,147,781 ops/sec ±0.92% (97 runs sampled)
