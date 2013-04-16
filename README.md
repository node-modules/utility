utility [![Build Status](https://secure.travis-ci.org/fengmk2/utility.png)](http://travis-ci.org/fengmk2/utility)
=======

![logo](https://raw.github.com/fengmk2/utility/master/logo.png)

A collection of useful utilities. 

* jscoverage: [100%](http://fengmk2.github.com/coverage/utility.html)

## Install

```bash
$ npm install utility
```

## Usage

```js
var utils = require('utility');

// md5 hash
utils.md5('@Python发烧友'); // '1369e7668bc600f0d90c06f5e395d7a9'
utils.md5(new Buffer('')); // 'd41d8cd98f00b204e9800998ecf8427e'

// hmac
// hmac-sha1 with base64 output encoding
utils.hmac('sha1', 'I am a key', 'hello world'); // 'pO6J0LKDxRRkvSECSEdxwKx84L0='

// base64 encode
utils.base64encode('你好￥'); // '5L2g5aW977+l'
utils.base64decode('5L2g5aW977+l') // '你好￥'

// urlsafe base64 encode
utils.base64encode('你好￥', true); // '5L2g5aW977-l'
utils.base64decode('5L2g5aW977-l', true); // '你好￥'

// empty function
process.nextTick(utils.noop);
function foo(callback) {
  callback = callback || utils.noop;
}

// html escape
utils.escape('<script/>"& &amp;'); // '&lt;script/&gt;&quot;&amp; &amp;'

// accessLogDate
utils.accessLogDate(); // '16/Apr/2013:16:40:09 +0800'
```

## accessLogDate() benchmark

[benchmark/date_format.js](https://github.com/fengmk2/utility/blob/master/benchmark/date_format.js)

```bash
$ node benchmark/date_format.js 

moment().format(): "16/Apr/2013:18:42:50 +0800"
utils.accessLogDate(): "16/Apr/2013:18:42:50 +0800"
fasterAccessDate2(): "16/Apr/2013:18:42:50 +0800"
new Date().toString(): "Tue Apr 16 2013 18:42:50 GMT+0800 (CST)"
Date(): "Tue Apr 16 2013 18:42:50 GMT+0800 (CST)"
------------------------
moment().format('DD/MMM/YYYY:HH:mm:ss ZZ') x 80,772 ops/sec ±0.99% (97 runs sampled)
utils.accessLogDate() x 341,267 ops/sec ±1.03% (96 runs sampled)
fasterAccessDate2() x 326,496 ops/sec ±5.19% (98 runs sampled)
new Date().toString() x 842,547 ops/sec ±0.92% (95 runs sampled)
Date() x 834,707 ops/sec ±0.77% (95 runs sampled)
Fastest is new Date().toString()
```

## License 

(The MIT License)

Copyright (c) 2012 - 2013 fengmk2 &lt;fengmk2@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.