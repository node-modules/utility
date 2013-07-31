/*!
 * utility - test/utility.test.js
 * Copyright(c) 2012 - 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var os = require('os');
var utils = require('../');
var mm = require('mm');
var should = require('should');
var moment = require('moment');

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

  describe('getParamNames()', function () {
    it('should return parameter names', function () {
      utils.getParamNames(function () {}).should.eql([]);
      utils.getParamNames(function (key1) {}).should.eql(['key1']);
      utils.getParamNames(function (key1,key2) {}).should.eql(['key1', 'key2']);
      utils.getParamNames(function (key1, key2) {}).should.eql(['key1', 'key2']);
      utils.getParamNames(function (   key1   ,   key2, key3 
       ,key4, callback) {
        console.log('foo');
      }).should.eql(['key1', 'key2', 'key3', 'key4', 'callback']);

      utils.getParamNames(utils.getParamNames).should.eql(['func', 'cache']);
      utils.getParamNames(utils.getParamNames, false).should.eql(['func', 'cache']);
      utils.getParamNames(utils.md5).should.eql(['s']);
      utils.getParamNames(utils.hmac).should.eql(['algorithm', 'key', 'data', 'encoding']);
      utils.getParamNames(utils.hmac).should.eql(['algorithm', 'key', 'data', 'encoding']);
      utils.getParamNames(utils.base64encode).should.eql(['s', 'urlsafe']);
      utils.getParamNames(utils.base64decode).should.eql(['encode', 'urlsafe']);
      utils.getParamNames(utils.escape).should.eql(['html']);
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

  describe('randomSlice()', function () {
    it('should return sub items', function () {
      var arr = [0,1,2,3,4,5,6,7,8,9,10,11,12];
      utils.randomSlice(arr).should.eql(arr);
      utils.randomSlice(arr, 100000).should.eql(arr);
      utils.randomSlice(arr, 14).should.eql(arr);
      utils.randomSlice(arr, 13).should.eql(arr);
      utils.randomSlice(arr, 1).should.length(1);
      utils.randomSlice(arr, 12).should.length(12);
      utils.randomSlice(arr, 0).should.eql(arr);
      utils.randomSlice(arr, 6).should.length(6);
    });
  });

  describe('logDate()', function () {
    it('should return an log format date string', function () {
      utils.logDate().should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
      utils.logDate(new Date(1372062988014)).should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            utils.logDate(n).should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
          }
        }
      }
    });
  });

  describe('accessLogDate()', function () {
    it('should return an access log format date string', function () {
      // 16/Apr/2013:16:40:09 +0800
      utils.accessLogDate().should.match(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [\+\-]\d{4}$/);
      moment().format('DD/MMM/YYYY:HH:mm:ss ZZ').should.equal(utils.accessLogDate());
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            moment(n).format('DD/MMM/YYYY:HH:mm:ss ZZ').should.equal(utils.accessLogDate(n));
          }
        }
      }
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

  describe('datestruct()', function () {
    it('should return an date struct', function () {
      var d = utils.datestruct();
      d.YYYYMMDD.toString().should.equal(moment().format('YYYYMMDD'));
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            var struct = utils.datestruct(n);
            struct.YYYYMMDD.toString().should.equal(moment(n).format('YYYYMMDD'));
            struct.H.toString().should.equal(moment(n).format('H'));
          }
        }
      }
    });
  });

  describe('getIP(), getIPv6(), getIPv4()', function () {
    afterEach(mm.restore);

    it('should return ip version 4 address', function () {
      mm(os, 'networkInterfaces', function () {
        return { lo0: 
         [ { address: '::1', family: 'IPv6', internal: true },
           { address: 'fe80::1', family: 'IPv6', internal: true },
           { address: '127.0.0.1', family: 'IPv4', internal: true } ],
        en0:
         [ { address: 'fe81::cabc:c8ff:feef:f996', family: 'IPv6',
             internal: true },
           { address: '10.0.1.123', family: 'IPv4', internal: false } ],
        en7:
         [ { address: 'fe80::cabc:c8ff:feef:f996', family: 'IPv6',
             internal: false },
           { address: '10.0.1.123', family: 'IPv4', internal: false } ],
        vmnet1: [ { address: '10.99.99.254', family: 'IPv4', internal: false } ],
        vmnet8: [ { address: '10.88.88.1', family: 'IPv4', internal: false } ],
        ppp0: [ { address: '10.2.0.231', family: 'IPv4', internal: false } ] 
        };
      });
      mm(os, 'platform', function () {
        return 'darwin';
      });
      var address = utils.getIP();
      should.exists(address);
      // address.should.equal(utils.getIPv4());
      // address.should.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
      // address.should.equal('10.0.1.123');
      mm.restore();

      mm(os, 'networkInterfaces', function () {
        return { lo0: 
         [ { address: '::1', family: 'IPv6', internal: true },
           { address: 'fe80::1', family: 'IPv6', internal: true },
           { address: '127.0.0.1', family: 'IPv4', internal: true } ],
        eth0: 
         [ { address: 'fe81::cabc:c8ff:feef:f996', family: 'IPv6',
             internal: true },
           { address: '10.0.1.124', family: 'IPv4', internal: false } ],
        eth2: 
         [ { address: 'fe80::cabc:c8ff:feef:f996', family: 'IPv6',
             internal: false },
           { address: '10.0.1.123', family: 'IPv4', internal: false } ],
        vmnet1: [ { address: '10.99.99.254', family: 'IPv4', internal: false } ],
        vmnet8: [ { address: '10.88.88.1', family: 'IPv4', internal: false } ],
        ppp0: [ { address: '10.2.0.231', family: 'IPv4', internal: false } ] 
        };
      });
      mm(os, 'platform', function () {
        return 'linux';
      });
      address = utils.getIP();
      // should.exists(address);
      // address.should.equal(utils.getIPv4());
      // address.should.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
      // address.should.equal('10.0.1.124');
    });

    it('should return ip version 6 address', function () {
      mm(os, 'networkInterfaces', function () {
        return { lo0: 
         [ { address: '::1', family: 'IPv6', internal: true },
           { address: 'fe80::1', family: 'IPv6', internal: true },
           { address: '127.0.0.1', family: 'IPv4', internal: true } ],
        eth0:
         [ { address: 'fe81::cabc:c8ff:feef:f996', family: 'IPv6',
             internal: true },
           { address: '10.0.1.123', family: 'IPv4', internal: false } ],
        eth7:
         [ { address: 'fe80::cabc:c8ff:feef:f996', family: 'IPv6',
             internal: false },
           { address: '10.0.1.123', family: 'IPv4', internal: false } ],
        vmnet1: [ { address: '10.99.99.254', family: 'IPv4', internal: false } ],
        vmnet8: [ { address: '10.88.88.1', family: 'IPv4', internal: false } ],
        ppp0: [ { address: '10.2.0.231', family: 'IPv4', internal: false } ] 
        };
      });
      mm(os, 'platform', function () {
        return 'linux';
      });
      
      var address = utils.getIPv6();
      // should.exists(address);
      // address.should.equal('fe80::cabc:c8ff:feef:f996');
    });
  });
});
