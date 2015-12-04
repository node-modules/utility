/**!
 * utility - test/web.test.js
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

var utils = require('../');

describe('web.test.js', function () {
  describe('escape()', function () {
    it('should return html safe string', function () {
      var unsafe = '<script src="foo.js">"""</script>\'"""\
      $ & &amp; && &&nbsp;\
      ';
      var safe = utils.escape(unsafe);
      safe.should.equal('&lt;script src=&quot;foo.js&quot;&gt;&quot;&quot;&quot;&lt;/script&gt;&#39;&quot;&quot;&quot;\
      $ &amp; &amp;amp; &amp;&amp; &amp;&amp;nbsp;\
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
      utils.base64encode(s).should.containEql('+');
      utils.base64encode(s).should.containEql('/');

      // urlsafe
      utils.base64decode(utils.base64encode(s, true), true).should.equal(s);
      utils.base64encode(s, true).should.not.containEql('+');
      utils.base64encode(s, true).should.not.containEql('/');
    });
  });

  describe('encodeURIComponent() and decodeURIComponent()', function () {
    it('should encode and decode success', function () {
      var texts = [
        'foo', '中文', '数字',
        '%',
        String.fromCharCode(0xDFFF), // http://cnodejs.org/topic/4fd6b7ba839e1e581407aac8
        123, 0, 1, Math.pow(2, 53),
        null, undefined,
        new Buffer('中文水电费'), new Buffer(100),
      ];
      texts.forEach(function (text) {
        if (typeof text === 'string') {
          utils.decodeURIComponent(utils.encodeURIComponent(text)).should.equal(text);
        } else {
          utils.decodeURIComponent(utils.encodeURIComponent(text)).should.equal(String(text));
        }
      });
    });

    it('should return source string when decode error', function () {
      utils.decodeURIComponent('%').should.equal('%');
    });
  });
});
