/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('crypto');
const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const utility = require('..');

const suite = new Benchmark.Suite();

function arraySplice(array, index) {
  array.splice(index, 1);
  return array;
}

function spliceOne(array, index) {
  for (let i = index, k = i + 1, n = array.length; k < n; i += 1, k += 1) {
    array[i] = array[k];
  }
  array.pop();
  return array;
}

class SubArray extends Array {
  spliceOne(index) {
    for (let i = index, k = i + 1, n = this.length; k < n; i += 1, k += 1) {
      this[i] = this[k];
    }
    this.pop();
    return this;
  }
}

console.log('arraySplice([1, 2, 3], 1): %j', arraySplice([ 1, 2, 3 ], 1));
console.log('new SubArray(1, 2, 3).spliceOne(1): %j', new SubArray(1, 2, 3).spliceOne(1));
console.log('spliceOne([1, 2, 3], 1): %j', spliceOne([ 1, 2, 3 ], 1));
console.log('arraySplice([1, 2, 3, 4, 5, 6, 7, 8, 9], 6): %j',
  arraySplice([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], 6));
console.log('new SubArray(1, 2, 3, 4, 5, 6, 7, 8, 9).spliceOne(6): %j',
  new SubArray(1, 2, 3, 4, 5, 6, 7, 8, 9).spliceOne(6));
console.log('spliceOne([1, 2, 3, 4, 5, 6, 7, 8, 9], 6): %j',
  spliceOne([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], 6));

suite

  .add('arraySplice([1, 2, 3], 1)', function() {
    arraySplice([ 1, 2, 3 ], 1);
  })
  .add('new SubArray(1, 2, 3).spliceOne(1)', function() {
    new SubArray(1, 2, 3).spliceOne(1);
  })
  .add('spliceOne([1, 2, 3], 1)', function() {
    spliceOne([ 1, 2, 3 ], 1);
  })

  .add('arraySplice([1, 2, 3, 4, 5, 6, 7, 8, 9], 6)', function() {
    arraySplice([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], 6);
  })
  .add('new SubArray(1, 2, 3, 4, 5, 6, 7, 8, 9).spliceOne(6)', function() {
    new SubArray(1, 2, 3, 4, 5, 6, 7, 8, 9).spliceOne(6);
  })
  .add('spliceOne([1, 2, 3, 4, 5, 6, 7, 8, 9], 6)', function() {
    spliceOne([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], 6);
  })

  .add('arraySplice(new Array(20), 11)', function() {
    arraySplice(new Array(20), 11);
  })
  .add('new SubArray(new Array(20)).spliceOne(11)', function() {
    new SubArray(new Array(20)).spliceOne(11);
  })
  .add('spliceOne(new Array(20), 11)', function() {
    spliceOne(new Array(20), 11);
  })

  .add('arraySplice(new Array(50), 30)', function() {
    arraySplice(new Array(50), 30);
  })
  .add('new SubArray(new Array(50)).spliceOne(30)', function() {
    new SubArray(new Array(50)).spliceOne(30);
  })
  .add('spliceOne(new Array(50), 30)', function() {
    spliceOne(new Array(50), 30);
  })

  .add('arraySplice(new Array(100), 80)', function() {
    arraySplice(new Array(100), 80);
  })
  .add('new SubArray(new Array(100)).spliceOne(80)', function() {
    new SubArray(new Array(100)).spliceOne(80);
  })
  .add('spliceOne(new Array(100), 80)', function() {
    spliceOne(new Array(100), 80);
  })

  .on('cycle', function(event) {
    benchmarks.add(event.target);
  })
  .on('complete', function() {
    benchmarks.log();
  })
  .run({ async: false });

// node benchmark/array_splice.js
//
// arraySplice([1, 2, 3], 1): [1,3]
// new SubArray(1, 2, 3).spliceOne(1): [1,3]
// spliceOne([1, 2, 3], 1): [1,3]
// arraySplice([1, 2, 3, 4, 5, 6, 7, 8, 9], 6): [1,2,3,4,5,6,8,9]
// new SubArray(1, 2, 3, 4, 5, 6, 7, 8, 9).spliceOne(6): [1,2,3,4,5,6,8,9]
// spliceOne([1, 2, 3, 4, 5, 6, 7, 8, 9], 6): [1,2,3,4,5,6,8,9]
//
//   map Benchmark
//   node version: v6.1.0, date: Sun May 08 2016 23:02:25 GMT+0800 (CST)
//   Starting...
//   15 tests completed.
//
//   arraySplice([1, 2, 3], 1)                            x  3,391,759 ops/sec ±1.75% (77 runs sampled)
//   new SubArray(1, 2, 3).spliceOne(1)                   x  2,146,665 ops/sec ±2.44% (78 runs sampled)
//   spliceOne([1, 2, 3], 1)                              x 30,957,606 ops/sec ±2.30% (76 runs sampled)
//   arraySplice([1, 2, 3, 4, 5, 6, 7, 8, 9], 6)          x  3,393,631 ops/sec ±1.58% (81 runs sampled)
//   new SubArray(1, 2, 3, 4, 5, 6, 7, 8, 9).spliceOne(6) x  1,898,975 ops/sec ±1.36% (81 runs sampled)
//   spliceOne([1, 2, 3, 4, 5, 6, 7, 8, 9], 6)            x 23,286,263 ops/sec ±2.40% (72 runs sampled)
//   arraySplice(new Array(20), 11)                       x  3,424,955 ops/sec ±1.39% (79 runs sampled)
//   new SubArray(new Array(20)).spliceOne(11)            x  1,703,608 ops/sec ±1.43% (79 runs sampled)
//   spliceOne(new Array(20), 11)                         x  6,371,527 ops/sec ±8.68% (71 runs sampled)
//   arraySplice(new Array(50), 30)                       x  2,961,652 ops/sec ±3.94% (81 runs sampled)
//   new SubArray(new Array(50)).spliceOne(30)            x  1,738,558 ops/sec ±2.28% (84 runs sampled)
//   spliceOne(new Array(50), 30)                         x  2,887,661 ops/sec ±4.01% (74 runs sampled)
//   arraySplice(new Array(100), 80)                      x  2,803,597 ops/sec ±2.12% (86 runs sampled)
//   new SubArray(new Array(100)).spliceOne(80)           x  1,695,942 ops/sec ±0.91% (88 runs sampled)
//   spliceOne(new Array(100), 80)                        x  3,175,629 ops/sec ±1.28% (86 runs sampled)
