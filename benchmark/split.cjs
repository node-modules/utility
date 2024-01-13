/* eslint-disable @typescript-eslint/no-var-requires */
const utility = require('../');
const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const suite = new Benchmark.Suite();

console.log('utility.split("foo,bar")', utility.split('foo,bar'));
console.log('utility.split("foo.bar", ".")', utility.split('foo.bar', '.'));
console.log('utility.splitAlwaysOptimized("foo,bar")', utility.splitAlwaysOptimized('foo,bar'));
console.log('utility.splitAlwaysOptimized("foo.bar", ".")', utility.splitAlwaysOptimized('foo.bar', '.'));
console.log('------------- %s -----------', Date());

// %OptimizeFunctionOnNextCall(utility.split);
// %OptimizeFunctionOnNextCall(utility.splitAlwaysOptimized);

suite

  .add('utility.splitAlwaysOptimized()', function() {
    utility.splitAlwaysOptimized();
    utility.splitAlwaysOptimized('foo,bar');
    utility.splitAlwaysOptimized('foo.bar', '.');
  })

  .add('utility.split()', function() {
    utility.split();
    utility.split('foo,bar');
    utility.split('foo.bar', '.');
  })

  .on('cycle', function(event) {
    benchmarks.add(event.target);
  })
  .on('start', function() {
    console.log('\n  split string Benchmark\n  node version: %s, date: %s\n  Starting...',
      process.version, Date());
  })
  .on('complete', function done() {
    benchmarks.log();
  })
  .run({ async: false });
