/*!
 * utility - test/utility.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var utils = require('../');
var should = require('should');

describe('utility.test.js', function () {
  describe('md5()', function () {
    it('should return md5 string', function () {
      utils.md5('aer').should.equal('d194f6194fc458544482bbb8f0b74c6b');
      utils.md5(new Buffer('')).should.equal('d41d8cd98f00b204e9800998ecf8427e');
      utils.md5('苏千').should.equal('5f733c47c58a077d61257102b2d44481');
    });
  });

  describe('escape()', function () {
    it('should return html safe string', function () {
      var unsafe = '<script src="foo.js">"""</script>\'"""\
      $ & &amp; && &&nbsp;\
      ';
      var safe = utils.escape(unsafe);
      safe.should.equal('&lt;script src=&quot;foo.js&quot;&gt;&quot;&quot;&quot;&lt;/script&gt;\'&quot;&quot;&quot;\
      $ &amp; &amp; &amp;&amp; &amp;&nbsp;\
      ');
    });
  });

  describe('base64encode() and base64decode()', function () {
    it('should return base64 encode string', function () {
      var s = '你好￥啊!@#)(_ +/\/\\\
""\u0063  / 认购渣打银行代客境外理财全球基金系 列产品,同品牌基金转换0收费. \
len1 YQ a\
len2 YWE aa\
len3 YWFh aaa\
no_padding YWJj abc\
padding YQ a\
hyphen fn5- ~~~\
underscore Pz8_ ???\
# this should fail and print out\
on_purpose_failure YQ b\
Encode string s using a URL-safe alphabet, which substitutes - instead of + and _ instead of / in the standard Base64 alphabet. The result can still contain =.';
      var expect = '5L2g5aW977+l5ZWKIUAjKShfICsvL1wiImMgIC8g6K6k6LSt5rij5omT6ZO26KGM5Luj5a6i5aKD5aSW55CG6LSi5YWo55CD5Z+66YeR57O7IOWIl+S6p+WTgSzlkIzlk4HniYzln7rph5HovazmjaIw5pS26LS5LiBsZW4xIFlRIGFsZW4yIFlXRSBhYWxlbjMgWVdGaCBhYWFub19wYWRkaW5nIFlXSmogYWJjcGFkZGluZyBZUSBhaHlwaGVuIGZuNS0gfn5+dW5kZXJzY29yZSBQejhfID8/PyMgdGhpcyBzaG91bGQgZmFpbCBhbmQgcHJpbnQgb3V0b25fcHVycG9zZV9mYWlsdXJlIFlRIGJFbmNvZGUgc3RyaW5nIHMgdXNpbmcgYSBVUkwtc2FmZSBhbHBoYWJldCwgd2hpY2ggc3Vic3RpdHV0ZXMgLSBpbnN0ZWFkIG9mICsgYW5kIF8gaW5zdGVhZCBvZiAvIGluIHRoZSBzdGFuZGFyZCBCYXNlNjQgYWxwaGFiZXQuIFRoZSByZXN1bHQgY2FuIHN0aWxsIGNvbnRhaW4gPS4=';
      utils.base64encode(s).should.equal(expect);
      utils.base64encode(new Buffer(s)).should.equal(expect);
      utils.base64decode(expect).should.equal(s);

      utils.base64decode(utils.base64encode(s)).should.equal(s);
      utils.base64encode(s).should.include('+');
      utils.base64encode(s).should.include('/');

      // urlsafe
      utils.base64decode(utils.base64encode(s, true), true).should.equal(s);
      utils.base64encode(s, true).should.not.include('+');
      utils.base64encode(s, true).should.not.include('/');
    });
  });

  describe('hmac()', function () {
    it('should return hmac-sha1', function () {
      // $ echo -n "hello world" | openssl dgst -binary -sha1 -hmac "I am a key" | openssl base64
      // > pO6J0LKDxRRkvSECSEdxwKx84L0=
      utils.hmac('sha1', 'I am a key', 'hello world').should.equal('pO6J0LKDxRRkvSECSEdxwKx84L0=');
      // $ echo -n "中文，你好" | openssl dgst -binary -sha1 -hmac "I am a key" | openssl base64
      // > 4Vnqz+LV0qMMt/a81E+EURcQMrI=
      utils.hmac('sha1', 'I am a key', '中文，你好', 'base64').should.equal('4Vnqz+LV0qMMt/a81E+EURcQMrI=');

      // should work with buffer data
      utils.hmac('sha1', 'I am a key', '中文，你好').should.equal(utils.hmac('sha1', 'I am a key', new Buffer('中文，你好')));
    });
  });
});