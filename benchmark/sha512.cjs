/* eslint-disable @typescript-eslint/no-var-requires */
const Benchmark = require('benchmark');
const crypto = require('node:crypto');
const utils = require('..');

const suite = new Benchmark.Suite();

function createHashWithSHA512(s) {
  const sum = crypto.createHash('sha512');
  sum.update(s);
  return sum.digest('hex');
}

console.log("utils.sha512({foo: 'bar', bar: 'foo', v: [1, 2, 3]})", utils.sha512({ foo: 'bar', bar: 'foo', v: [ 1, 2, 3 ] }));
console.log("utils.sha512(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]}))",
  utils.sha512(JSON.stringify({ foo: 'bar', bar: 'foo', v: [ 1, 2, 3 ] })));
console.log("utils.sha512('苏千')", utils.sha512('苏千'));

console.log('------------- %s -----------', Date());

suite
  .add("utils.sha512({foo: 'bar', bar: 'foo', v: [1, 2, 3]})", function() {
    utils.sha512({ foo: 'bar', bar: 'foo', v: [ 1, 2, 3 ] });
  })
  .add("utils.sha512(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]})))", function() {
    utils.sha512(JSON.stringify({ foo: 'bar', bar: 'foo', v: [ 1, 2, 3 ] }));
  })
  .add("utils.sha512('苏千')", function() {
    utils.sha512('苏千');
  });

if (crypto.hash) {
  suite.add('createHashWithSHA512(Buffer.alloc(1024))', function() {
    createHashWithSHA512(Buffer.alloc(1024));
  }).add("crypto.hash('sha512', Buffer.alloc(1024))", function() {
    crypto.hash('sha512', Buffer.alloc(1024));
  });
  console.log("crypto.hash('sha512', Buffer.alloc(1024))", crypto.hash('sha512', Buffer.alloc(1024)));
  console.log('createHashWithSHA512(Buffer.alloc(1024))', createHashWithSHA512(Buffer.alloc(1024)));
}

suite

// add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: false });
