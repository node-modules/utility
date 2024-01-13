/* eslint-disable @typescript-eslint/no-var-requires */
const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');

const suite = new Benchmark.Suite();

const meta = {
  date: Date(),
  level: 'info',
  pid: process.pid,
  paddingMessage: 'hi/foo/bar/123123',
  message: 'ok sdf sdfdsfsdf',
};
console.log(`${meta.date} ${meta.level} ${meta.pid} ${meta.paddingMessage} ${meta.message}`);
console.log(meta.date + ' ' + meta.level + ' ' + meta.pid + ' ' + meta.paddingMessage + ' ' + meta.message);

// add tests
suite

  .add('str + str + ...', function() {
    const str = meta.date + ' ' + meta.level + ' ' + meta.pid + ' ' + meta.paddingMessage + ' ' + meta.message;
  })
  .add('tpl string', function() {
    const str = `${meta.date} ${meta.level} ${meta.pid} ${meta.paddingMessage} ${meta.message}`;
  })

// add listeners
  .on('cycle', function(event) {
    benchmarks.add(event.target);
  })
  .on('start', function() {
    console.log('\n  node version: %s, date: %s\n  Starting...', process.version, Date());
  })
  .on('complete', function() {
    benchmarks.log();
  })
// run async
  .run({ async: false });

// node benchmark/string_tpl.js
//
// Thu Feb 25 2016 01:16:37 GMT+0800 (CST) info 89352 hi/foo/bar/123123 ok sdf sdfdsfsdf
// Thu Feb 25 2016 01:16:37 GMT+0800 (CST) info 89352 hi/foo/bar/123123 ok sdf sdfdsfsdf
//
//   node version: v4.3.1, date: Thu Feb 25 2016 01:16:37 GMT+0800 (CST)
//   Starting...
//   2 tests completed.
//
//   str + str + ... x 53,194,964 ops/sec ±1.04% (93 runs sampled)
//   tpl string      x  4,947,842 ops/sec ±1.72% (88 runs sampled)
