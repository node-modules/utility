/*!
 * utility - benchmark/md5.js
 *
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var utils = require('../');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

console.log("utils.md5({foo: 'bar', bar: 'foo', v: [1, 2, 3]})", utils.md5({foo: 'bar', bar: 'foo', v: [1, 2, 3]}));
console.log("utils.md5(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]}))",
  utils.md5(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]})));
console.log("utils.md5('苏千')", utils.md5('苏千'));

console.log("utils.sha1({foo: 'bar', bar: 'foo', v: [1, 2, 3]})", utils.sha1({foo: 'bar', bar: 'foo', v: [1, 2, 3]}));
console.log("utils.sha1(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]}))",
  utils.sha1(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]})));
console.log("utils.sha1('苏千')", utils.sha1('苏千'));
console.log('------------- %s -----------', Date());

suite
.add("utils.md5({foo: 'bar', bar: 'foo', v: [1, 2, 3]})", function () {
  utils.md5({foo: 'bar', bar: 'foo', v: [1, 2, 3]});
})
.add("utils.md5(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]})))", function () {
  utils.md5(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]}));
})
.add("utils.md5('苏千')", function () {
  utils.md5('苏千');
})

.add("utils.sha1({foo: 'bar', bar: 'foo', v: [1, 2, 3]})", function () {
  utils.sha1({foo: 'bar', bar: 'foo', v: [1, 2, 3]});
})
.add("utils.sha1(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]})))", function () {
  utils.sha1(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]}));
})
.add("utils.sha1('苏千')", function () {
  utils.sha1('苏千');
})

// add listeners
.on('cycle', function (event) {
  console.log(String(event.target));
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ async: false });

// $ node benchmark/md5.js 
// utils.md5({foo: 'bar', bar: 'foo', v: [1, 2, 3]}) 079a571be06a7845409f8fc91647b0f4
// utils.md5(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]})) ab6697805af372cbfe1ea3227e8ac304
// utils.md5('苏千') 5f733c47c58a077d61257102b2d44481
// utils.sha1({foo: 'bar', bar: 'foo', v: [1, 2, 3]}) 0a44d8b7712ee1da7be00c3046f0d852ced14f41
// utils.sha1(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]})) 7cea654dc053a1ecb8ae4edaafb14011d408be5c
// utils.sha1('苏千') 0a4aff6bab634b9c2f99b71f25e976921fcde5a5
// ------------- Wed May 07 2014 14:59:24 GMT+0800 (CST) -----------
// utils.md5({foo: 'bar', bar: 'foo', v: [1, 2, 3]}) x 192,534 ops/sec ±3.44% (92 runs sampled)
// utils.md5(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]}))) x 303,061 ops/sec ±1.71% (88 runs sampled)
// utils.md5('苏千') x 426,337 ops/sec ±5.13% (81 runs sampled)
// utils.sha1({foo: 'bar', bar: 'foo', v: [1, 2, 3]}) x 198,976 ops/sec ±1.24% (99 runs sampled)
// utils.sha1(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]}))) x 305,395 ops/sec ±1.67% (90 runs sampled)
// utils.sha1('苏千') x 449,135 ops/sec ±4.32% (84 runs sampled)
