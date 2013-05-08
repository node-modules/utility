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

// logDate
utils.logDate(); // '2013-04-17 14:43:02.674'

// datestruct
utils.datestruct(); // { YYYYMMDD: 20130416, H: 8 }

// Safe encodeURIComponent and decodeURIComponent
utils.decodeURIComponent(utils.encodeURIComponent('你好, nodejs')).should.equal('你好, nodejs');
```

## benchmark

* [jsperf: access log date format](http://jsperf.com/access-log-date-format)
* [benchmark/date_format.js](https://github.com/fengmk2/utility/blob/master/benchmark/date_format.js)

```bash
$ node benchmark/date_format.js 

moment().format("DD/MMM/YYYY:HH:mm:ss ZZ"): "16/Apr/2013:21:12:32 +0800"
utils.accessLogDate(): "16/Apr/2013:21:12:32 +0800"
fasterAccessDate(): "16/Apr/2013:21:12:32 +0800"
fasterAccessDate2(): "16/Apr/2013:21:12:32 +0800"
new Date().toString(): "Tue Apr 16 2013 21:12:32 GMT+0800 (CST)"
Date(): "Tue Apr 16 2013 21:12:32 GMT+0800 (CST)"
Date.now(): 1366117952162
------------------------
moment().format('DD/MMM/YYYY:HH:mm:ss ZZ') x 68,300 ops/sec ±5.05% (91 runs sampled)
utils.accessLogDate() x 1,341,341 ops/sec ±2.72% (90 runs sampled)
fasterAccessDate() x 357,833 ops/sec ±1.32% (98 runs sampled)
fasterAccessDate2() x 301,607 ops/sec ±5.03% (83 runs sampled)
new Date().toString() x 738,499 ops/sec ±3.54% (86 runs sampled)
Date() x 794,724 ops/sec ±2.77% (95 runs sampled)
Date.now() x 8,327,685 ops/sec ±1.85% (94 runs sampled)
Fastest is Date.now()
```

[benchmark/date_YYYYMMDD.js](https://github.com/fengmk2/utility/blob/master/benchmark/date_YYYYMMDD.js)

```bash
$ node benchmark/date_YYYYMMDD.js 

parseInt(moment().format("YYYYMMDD"), 10): 20130416
utils.datestruct().YYYYMMDD: 20130416
new Date().toString(): "Tue Apr 16 2013 21:12:02 GMT+0800 (CST)"
------------------------
parseInt(moment().format('YYYYMMDD'), 10) x 129,604 ops/sec ±0.46% (101 runs sampled)
utils.datestruct().YYYYMMDD x 2,317,461 ops/sec ±1.38% (95 runs sampled)
new Date().toString() x 816,731 ops/sec ±3.46% (93 runs sampled)
Fastest is utils.datestruct().YYYYMMDD

```

## Authors

```bash
$ git summary 

 project  : utility
 repo age : 6 months
 active   : 8 days
 commits  : 23
 files    : 14
 authors  : 
    23  fengmk2                 100.0%
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
