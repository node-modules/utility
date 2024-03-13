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

// node benchmark/sha512.cjs
// utils.sha512({foo: 'bar', bar: 'foo', v: [1, 2, 3]}) 81e725c5a3e77365521c0f7448e2099d7400b92e8893230495b2ae54d7bb938c063a575ad7cb79750b45f59824a9ff0b251f9d0ba27cadcff0cda8f745538950
// utils.sha512(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]})) 1f8288664f4ead755b2e6b5a6b4c4fdfd8fb4933fa398524461f598e22e402af7ae9b49e9473c9cbeb036abbe6e6c6ab3f8484f3d15acc79beaf8aecc0a9b076
// utils.sha512('苏千') 913e9b219f70541725a6ed721b42ae88e79f7ea1c7aec53be80ab277d4704b556df265cc4235f942f9dfbbbbd88e02ba2e18f60b217853835aeb362fb1830016
// ------------- Wed Mar 13 2024 10:27:21 GMT+0800 (中国标准时间) -----------
// crypto.hash('sha512', Buffer.alloc(1024)) 8efb4f73c5655351c444eb109230c556d39e2c7624e9c11abc9e3fb4b9b9254218cc5085b454a9698d085cfa92198491f07a723be4574adc70617b73eb0b6461
// createHashWithSHA512(Buffer.alloc(1024)) 8efb4f73c5655351c444eb109230c556d39e2c7624e9c11abc9e3fb4b9b9254218cc5085b454a9698d085cfa92198491f07a723be4574adc70617b73eb0b6461
// utils.sha512({foo: 'bar', bar: 'foo', v: [1, 2, 3]}) x 1,169,875 ops/sec ±6.92% (95 runs sampled)
// utils.sha512(JSON.stringify({foo: 'bar', bar: 'foo', v: [1, 2, 3]}))) x 1,742,893 ops/sec ±1.56% (98 runs sampled)
// utils.sha512('苏千') x 3,102,952 ops/sec ±1.09% (97 runs sampled)
// createHashWithSHA512(Buffer.alloc(1024)) x 597,443 ops/sec ±1.08% (90 runs sampled)
// crypto.hash('sha512', Buffer.alloc(1024)) x 796,968 ops/sec ±0.59% (96 runs sampled)
// Fastest is utils.sha512('苏千')
