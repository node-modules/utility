/**!
 * utility - benchmark/random_string.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var crypto = require('crypto');
var utility = require('../');

function randomString(length) {
  return crypto.randomBytes(length).toString('base64');
}

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

console.log("crypto.randomString(16): %s", randomString(16));
console.log("utility.randomString(16): %s", utility.randomString(16));
console.log("crypto.randomString(32): %s", randomString(32));
console.log("utility.randomString(32): %s", utility.randomString(32));
console.log('------------- %s -----------', Date());

suite
.add("crypto.randomString(16)", function () {
  randomString(16);
})
.add("crypto.randomString(32)", function () {
  randomString(32);
})
.add("utility.randomString(16)", function () {
  utility.randomString(16);
})
.add("utility.randomString(32)", function () {
  utility.randomString(32);
})

// add listeners
.on('cycle', function (event) {
  console.log(String(event.target));
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ async: false });

// $ node benchmark/random_string.js 
// crypto.randomString(16): EQxkpWOY/eBXI36RPxp6Iw==
// utility.randomString(16): flLMFbIDWebNnCL5
// crypto.randomString(32): 19QLMfaFbf9I/O+MSu3x2EEL5G2vzo5XUtrCISgaXAM=
// utility.randomString(32): QAxJ7tFxV4XqfJfSfQSLYIz9Oxi06L6L
// ------------- Mon May 05 2014 19:47:26 GMT+0800 (CST) -----------
// crypto.randomString(16) x 135,656 ops/sec ±6.24% (80 runs sampled)
// crypto.randomString(32) x 129,238 ops/sec ±4.73% (84 runs sampled)
// utility.randomString(16) x 2,149,891 ops/sec ±0.74% (100 runs sampled)
// utility.randomString(32) x 1,173,743 ops/sec ±0.56% (100 runs sampled)
// Fastest is utility.randomString(16)
