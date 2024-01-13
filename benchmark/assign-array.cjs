/* eslint-disable @typescript-eslint/no-var-requires */
const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const utility = require('..');

const suite = new Benchmark.Suite();


suite

  .add('Object.assign apply unshift', function() {
    const args = [{ a: 1 }, { b: 1 }];
    const target = {};
    args.unshift(target);
    Object.assign.apply(null, args);
  })

  .add('Object.assign apply concat', function() {
    const args = [{ a: 1 }, { b: 1 }];
    const target = {};
    Object.assign.apply(null, [ target ].concat(args));
  })

  .add('Object.assign for', function() {
    const args = [{ a: 1 }, { b: 1 }];
    const target = {};
    for (let i = 0, l = args.length - 1; i <= l; i++) {
      Object.assign(target, args[i]);
    }
  })

  .add('Object.assign spread', function() {
    const args = [{ a: 1 }, { b: 1 }];
    const target = {};
    Object.assign(target, ...args);
  })

  .add('utility.assign', function() {
    const args = [{ a: 1 }, { b: 1 }];
    const target = {};
    utility.assign(target, args);
  })

  .on('cycle', function(event) {
    benchmarks.add(event.target);
  })
  .on('start', function() {
    console.log('\n  assign Benchmark\n  node version: %s, date: %s\n  Starting...',
      process.version, Date());
  })
  .on('complete', function done() {
    benchmarks.log();
  })
  .run({ async: false });

// assign Benchmark
// node version: v6.9.1, date: Mon Feb 20 2017 20:27:06 GMT+0800 (CST)
// Starting...
// 6 tests completed.
//
// Object.assign apply unshift x 1,156,744 ops/sec ±8.44% (66 runs sampled)
// Object.assign apply concat  x 1,013,666 ops/sec ±1.29% (83 runs sampled)
// Object.assign for           x 1,862,435 ops/sec ±1.40% (83 runs sampled)
// Object.assign spread        x   644,261 ops/sec ±1.35% (83 runs sampled)
// utility.assign              x 3,050,304 ops/sec ±1.32% (84 runs sampled)
