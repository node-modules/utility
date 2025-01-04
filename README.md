# utility

[![NPM version][npm-image]][npm-url]
[![CI](https://github.com/node-modules/utility/actions/workflows/nodejs.yml/badge.svg)](https://github.com/node-modules/utility/actions/workflows/nodejs.yml)
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![Node.js Version](https://img.shields.io/node/v/utility.svg?style=flat)](https://nodejs.org/en/download/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)

[npm-image]: https://img.shields.io/npm/v/utility.svg?style=flat-square
[npm-url]: https://npmjs.org/package/utility
[codecov-image]: https://codecov.io/github/node-modules/utility/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/node-modules/utility?branch=master
[download-image]: https://img.shields.io/npm/dm/utility.svg?style=flat-square
[download-url]: https://npmjs.org/package/utility

A collection of useful utilities.

## Install

```bash
npm install utility
```

## Usage

```js
const utils = require('utility');
```

Also you can use it within typescript, like this ↓

```ts
import * as utils from 'utility';
```

### md5

```ts
import { md5 } from 'utility';

md5('苏千');
// '5f733c47c58a077d61257102b2d44481'

md5(Buffer.from('苏千'));
// '5f733c47c58a077d61257102b2d44481'

// md5 base64 format
md5('苏千', 'base64'); 
// 'X3M8R8WKB31hJXECstREgQ=='

// Object md5 hash. Sorted by key, and JSON.stringify. See source code for detail
md5({foo: 'bar', bar: 'foo'}).should.equal(md5({bar: 'foo', foo: 'bar'}));
```

### sha1

```ts
import { sha1 } from 'utility';

sha1('苏千');
// '0a4aff6bab634b9c2f99b71f25e976921fcde5a5'

sha1(Buffer.from('苏千'));
// '0a4aff6bab634b9c2f99b71f25e976921fcde5a5'

// sha1 base64 format
sha1('苏千', 'base64');
// 'Ckr/a6tjS5wvmbcfJel2kh/N5aU='

// Object sha1 hash. Sorted by key, and JSON.stringify. See source code for detail
sha1({foo: 'bar', bar: 'foo'}).should.equal(sha1({bar: 'foo', foo: 'bar'}));
```

### sha256

```ts
import { sha256 } from 'utility';

sha256(Buffer.from('苏千'));
// '75dd03e3fcdbba7d5bec07900bae740cc8e361d77e7df8949de421d3df5d3635'
```

### hmac

```ts
import { hmac } from 'utility';

// hmac-sha1 with base64 output encoding
hmac('sha1', 'I am a key', 'hello world');
// 'pO6J0LKDxRRkvSECSEdxwKx84L0='
```

### decode and encode

```ts
import { base64encode, base64decode, escape, unescape, encodeURIComponent, decodeURIComponent } from 'utility';

// base64 encode
base64encode('你好￥');
// '5L2g5aW977+l'
base64decode('5L2g5aW977+l');
// '你好￥'

// urlsafe base64 encode
base64encode('你好￥', true);
// '5L2g5aW977-l'
base64decode('5L2g5aW977-l', true);
// '你好￥'

// html escape and unescape
escape('<script/>"& &amp;');
// '&lt;script/&gt;&quot;&amp; &amp;amp;'
unescape('&lt;script/&gt;&quot;&amp; &amp;amp;');
// '<script/>"& &amp;'

// Safe encodeURIComponent and decodeURIComponent
decodeURIComponent(encodeURIComponent('你好, Node.js'));
// '你好, Node.js'
```

### others

___[WARNNING] `getIP()` remove, PLEASE use `https://github.com/node-modules/address` module instead.___

```js
// get a function parameter's names
utils.getParamNames(function (key1, key2) {}); // ['key1', 'key2']

// get a random string, default length is 16.
utils.randomString(32, '1234567890'); //18774480824014856763726145106142

// check if object has this property
utils.has({hello: 'world'}, 'hello'); //true

// empty function
utils.noop = function () {}

// throw out an assertion error if you were given an invalid "func"
try {
  utils.getParamNames(null); // Only function is allowed
} catch (err) {
  console.error(err); // Assertion Error
}
```

### Date utils

```js
// accessLogDate
utils.accessLogDate(); // '16/Apr/2013:16:40:09 +0800'

// logDate,
// 'YYYY-MM-DD HH:mm:ss.SSS' format date string
utils.logDate(); // '2013-04-17 14:43:02.674'
utils.YYYYMMDDHHmmssSSS(); // '2013-04-17 14:43:02.674'
utils.YYYYMMDDHHmmssSSS(','); // '2013-04-17 14:43:02,674'

// 'YYYY-MM-DD HH:mm:ss' format date string
utils.YYYYMMDDHHmmss(); // '2013-04-17 14:43:02'
utils.YYYYMMDDHHmmss(new Date(), {dateSep: '.'}); // '2013.04.17 14:43:02'

// 'YYYY-MM-DD' format date string
utils.YYYYMMDD(); // '2013-04-17'
utils.YYYYMMDD(''); // '20130417'
utils.YYYYMMDD(','); // '2013,04,17'

// datestruct
utils.datestruct(); // { YYYYMMDD: 20130416, H: 8 }

// Unix's timestamp
utils.timestamp(); // 1378153226

// Parse timestamp
// seconds
utils.timestamp(1385091596); // Fri Nov 22 2013 11:39:56 GMT+0800 (CST)
// millseconds
utils.timestamp(1385091596000); // Fri Nov 22 2013 11:39:56 GMT+0800 (CST)

// Get Date from Milliseconds
utils.getDateFromMilliseconds(1385091596000) // 2013-11-22
utils.getDateFromMilliseconds(1385091596000, utility.DateFormat.DateTimeWithTimeZone) // 22/Nov/2013:01:46:36 +0000
utils.getDateFromMilliseconds(1385091596000, utility.DateFormat.DateTimeWithMilliSeconds) // 2013-11-22 01:46:36.000
utils.getDateFromMilliseconds(1385091596000, utility.DateFormat.DateTimeWithSeconds) // 2013-11-22 01:46:36
utils.getDateFromMilliseconds(1385091596000, utility.DateFormat.UnixTimestamp) // 1385091596
```

### Number utils

```js
// Detect a number string can safe convert to Javascript Number.: `-9007199254740991 ~ 9007199254740991`
utils.isSafeNumberString('9007199254740991'); // true
utils.isSafeNumberString('9007199254740993'); // false

// Convert string to number safe:
utils.toSafeNumber('9007199254740991'); // 9007199254740991
utils.toSafeNumber('9007199254740993'); // '9007199254740993'

// Produces a random integer between the inclusive `lower` and exclusive `upper` bounds.
utils.random(100); // [0, 100)
utils.random(2, 1000); // [2, 1000)
utils.random(); // 0
```

### Timeout

#### `runWithTimeout(scope, timeout)`

Executes a scope promise with a specified timeout duration. If the promise doesn't resolve within the timeout period, it will reject with a `TimeoutError`.

```ts
import { runWithTimeout } from 'utility';

await runWithTimeout(async () => {
  // long run operation here
}, 1000);
```

### map

Create a `real` map in javascript.

use `Object.create(null)`

```js
const map = utils.map({a: 1});

// should.not.exist(map.constructor);
// should.not.exist(map.__proto__);
// should.not.exist(map.toString);
// should not exist any property

console.log(map); // {a: 1}
```

### String utils

```js
// split string by sep
utils.split('foo,bar,,,', ','); // ['foo', 'bar']

// replace string work with special chars which `String.prototype.replace` can't handle
utils.replace('<body> hi', '<body>', '$& body'); // '$& body hi'

// replace http header invalid characters
utils.replaceInvalidHttpHeaderChar('abc你好11'); // {invalid: true, val: 'abc  11'}
```

### Try

```js
const res = utils.try(function () {
  return JSON.parse(str);
});

// {error: undefined, value: {foo: 'bar'}}
// {error: Error, value: undefined}
```

```Note``` that when you use ```typescript```, you must use the following methods to call ' Try '

```js
import { UNSTABLE_METHOD } from 'utility';

UNSTABLE_METHOD.try(...);
...
```

### argumentsToArray

```js
function foo() {
  const arr = utils.argumentsToArray(arguments);
  console.log(arr.join(', '));
}
```

### JSON

```js
const obj = utils.strictJSONparse('"hello"');
// will throw when JSON string is not object

const pkg = utils.readJSONSync('package.json');
utils.writeJSONSync('package.json', pkg, {
  replacer: null,
  space: '\t',
});
```

Or you can use async API

```js
async () => {
  const pkg = await utils.readJSON('package.json');
  await utils.writeJSON('package.json', pkg);
}
```

> __Hint:__ In `utils.writeJSON*()`, if `pkg` is an object, the __optional__ third parameter `options` may contain two
> keys.
>
> + `replacer`: Equals to `JSON.stringify()`'s second parameter;
> + `space`: Equals to `JSON.stringify()`'s third parameter. Defaults to `2`.
>
> Refs:
>
> + <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter>
> + <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument>

### Object.assign

```js
// assign object
utils.assign({}, { a: 1 });

// assign multiple object
utils.assign({}, [ { a: 1 }, { b: 1 } ]);
```

## benchmark

+ [jsperf: access log date format](http://jsperf.com/access-log-date-format)
+ [benchmark/date_format.js](https://github.com/node-modules/utility/blob/master/benchmark/date_format.cjs)

```bash
$ node benchmark/date_format.cjs

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

[benchmark/date_YYYYMMDD.js](https://github.com/node-modules/utility/blob/master/benchmark/date_YYYYMMDD.cjs)

```bash
$ node benchmark/date_YYYYMMDD.cjs

parseInt(moment().format("YYYYMMDD"), 10): 20130416
utils.datestruct().YYYYMMDD: 20130416
new Date().toString(): "Tue Apr 16 2013 21:12:02 GMT+0800 (CST)"
------------------------
parseInt(moment().format('YYYYMMDD'), 10) x 129,604 ops/sec ±0.46% (101 runs sampled)
utils.datestruct().YYYYMMDD x 2,317,461 ops/sec ±1.38% (95 runs sampled)
new Date().toString() x 816,731 ops/sec ±3.46% (93 runs sampled)
Fastest is utils.datestruct().YYYYMMDD
```

## License

[MIT](LICENSE.txt)

## Contributors

[![Contributors](https://contrib.rocks/image?repo=node-modules/utility)](https://github.com/node-modules/utility/graphs/contributors)

Made with [contributors-img](https://contrib.rocks).
