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

function pseudoRandomString(length) {
  return crypto.pseudoRandomBytes(length).toString('base64');
}

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

console.log("crypto.randomString(16): %s", randomString(16));
console.log("crypto.pseudoRandomString(16): %s", pseudoRandomString(16));
console.log("utility.randomString(16): %s", utility.randomString(16));
console.log("crypto.randomString(32): %s", randomString(32));
console.log("crypto.pseudoRandomString(32): %s", pseudoRandomString(32));
console.log("utility.randomString(32): %s", utility.randomString(32));
console.log('------------- %s -----------', Date());

suite
.add("crypto.randomString(16)", function () {
  randomString(16);
})
.add("crypto.randomString(32)", function () {
  randomString(32);
})
.add("crypto.pseudoRandomString(16)", function () {
  pseudoRandomString(16);
})
.add("crypto.pseudoRandomString(32)", function () {
  pseudoRandomString(32);
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
// crypto.randomString(16): or0FCEq0YuQoHdoHIp3KlQ==
// crypto.pseudoRandomString(16): AD/CWJR3CbUG/fGji1fkkg==
// utility.randomString(16): Rj9O7bbVpxG6AQjQ
// crypto.randomString(32): 94Ny5xa/z1WH0KMYJfkkPum0b8qJ6ZysNmG0xlenYsk=
// crypto.pseudoRandomString(32): RqY4x3Xt2R1uKe0ZLhgXC5OfnRCTG7TPl8JLIPXceek=
// utility.randomString(32): jCQvW3HAXdzV2ohMzbvPhlJCsoPoqRuO
// ------------- Wed May 07 2014 10:18:13 GMT+0800 (CST) -----------
// crypto.randomString(16) x 140,867 ops/sec ±3.91% (77 runs sampled)
// crypto.randomString(32) x 136,991 ops/sec ±3.15% (87 runs sampled)
// crypto.pseudoRandomString(16) x 141,351 ops/sec ±4.21% (85 runs sampled)
// crypto.pseudoRandomString(32) x 131,813 ops/sec ±3.40% (85 runs sampled)
// utility.randomString(16) x 2,081,522 ops/sec ±2.03% (96 runs sampled)
// utility.randomString(32) x 1,110,170 ops/sec ±2.53% (96 runs sampled)
// Fastest is utility.randomString(16)
