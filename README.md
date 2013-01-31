utility [![Build Status](https://secure.travis-ci.org/fengmk2/utility.png)](http://travis-ci.org/fengmk2/utility)
=======

![logo](https://raw.github.com/fengmk2/utility/master/logo.png)

Description

* jscoverage: [100%](http://fengmk2.github.com/coverage/utility.html)

## Install

```bash
$ npm install utility
```

## Usage

```js
var utils = require('utility');

// md5 hash
utils.md5('aer'); // 'd194f6194fc458544482bbb8f0b74c6b'
utils.md5(new Buffer('')); // 'd41d8cd98f00b204e9800998ecf8427e'

// empty function
process.nextTick(utils.noop);
function foo(callback) {
  callback = callback || utils.noop;
}

// html escape
utils.escape('<script/>"& &amp;'); // '&lt;script/&gt;&quot;&amp; &amp;'
```

## License 

(The MIT License)

Copyright (c) 2012 fengmk2 &lt;fengmk2@gmail.com&gt;

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