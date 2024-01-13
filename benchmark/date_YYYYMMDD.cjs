/* eslint-disable @typescript-eslint/no-var-requires */
// http://jsperf.com/access-log-date-format

const moment = require('moment');
const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const utils = require('..');

const suite = new Benchmark.Suite();

console.log('parseInt(moment().format("YYYYMMDD"), 10): %j', parseInt(moment().format('YYYYMMDD'), 10));
console.log('utils.datestruct().YYYYMMDD: %j', utils.datestruct().YYYYMMDD);
console.log('new Date().toString(): %j', new Date().toString());
console.log('------------------------');

suite
  .add("parseInt(moment().format('YYYYMMDD'), 10)", function() {
    parseInt(moment().format('YYYYMMDD'), 10);
  })
  .add('utils.datestruct().YYYYMMDD', function() {
    utils.datestruct().YYYYMMDD;
  })
  .add('new Date().toString()', function() {
    new Date().toString();
  })
  .on('cycle', function(event) {
    benchmarks.add(event.target);
  })
  .on('complete', function() {
    benchmarks.log();
  })
  .run({ async: false });
