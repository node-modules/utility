/*!
 * utility - test/utility.test.js
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
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
      utils.md5('mk2').should.equal('a683090976ec0f04dca81f6db9ca7484');
      utils.md5(new Buffer('')).should.equal('d41d8cd98f00b204e9800998ecf8427e');
      utils.md5(new Buffer('')).should.equal(utils.md5(''));
      utils.md5('苏千').should.equal('5f733c47c58a077d61257102b2d44481');
      utils.md5('苏千', 'base64').should.equal('X3M8R8WKB31hJXECstREgQ==');
      utils.md5('123', 'base64').should.equal('ICy5YqxZB1uWSwcVLSNLcA==');
      utils.md5('', 'base64').should.equal('1B2M2Y8AsgTpgAmY7PhCfg==');

      utils.md5({foo: 'bar', bar: 'foo'}).should.equal('63a9d72936c6f7366fa5e72fa0cac8b4');
      utils.md5({foo: 'bar', bar: 'foo'}).should.equal(utils.md5({bar: 'foo', foo: 'bar'}));
      utils.md5({foo: 'bar', bar: 'foo', v: [1, 2, 3]}).should.equal(utils.md5({v: [1, 2, 3], bar: 'foo', foo: 'bar'}));
      utils.md5({foo: 'bar', bar: 'foo', args: {age: 1, name: 'foo'}, args2: {haha:'哈哈', bi: 'boo'}, v: [1, 2, 3]})
        .should.equal(utils.md5({v: [1, 2, 3], bar: 'foo', foo: 'bar', args2: {bi: 'boo', haha:'哈哈'}, args: {name: 'foo', age: 1}}));
    });
  });

  describe('sha1()', function () {
    it('should return sha1 string', function () {
      utils.sha1('mk2').should.equal('0b1765f5e21e9d8a6da828ee59ce159c7d1a733e');
      utils.sha1(new Buffer('')).should.equal('da39a3ee5e6b4b0d3255bfef95601890afd80709');
      utils.sha1(new Buffer('')).should.equal(utils.sha1(''));
      utils.sha1('苏千').should.equal('0a4aff6bab634b9c2f99b71f25e976921fcde5a5');
      utils.sha1('苏千', 'base64').should.equal('Ckr/a6tjS5wvmbcfJel2kh/N5aU=');
      utils.sha1('123', 'base64').should.equal('QL0AFWMIX8NRZTKeof9cXsvbvu8=');
      utils.sha1('', 'base64').should.equal('2jmj7l5rSw0yVb/vlWAYkK/YBwk=');

      utils.sha1({foo: 'bar', bar: 'foo'}).should.equal('91bb58051ed80d841941730c1f1399c9e0d8701b');
      utils.sha1({foo: 'bar', bar: 'foo'}).should.equal(utils.sha1({bar: 'foo', foo: 'bar'}));
      utils.sha1({foo: 'bar', bar: 'foo', v: [1, 2, 3]}).should.equal(utils.sha1({v: [1, 2, 3], bar: 'foo', foo: 'bar'}));
      utils.sha1({foo: 'bar', bar: 'foo', args: {age: 1, name: 'foo'},
        args2: {haha:'哈哈', bi: 'boo'}, v: [1, 2, 3]})
      .should.equal(utils.sha1({v: [1, 2, 3], bar: 'foo', foo: 'bar',
        args2: {bi: 'boo', haha:'哈哈'}, args: {name: 'foo', age: 1}}));
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
      utils.getParamNames(function (key1, key2, key3, key4, callback) {
        console.log('foo');
      }).should.eql(['key1', 'key2', 'key3', 'key4', 'callback']);

      utils.getParamNames(utils.getParamNames).should.eql(['func', 'cache']);
      utils.getParamNames(utils.getParamNames, false).should.eql(['func', 'cache']);
      utils.getParamNames(utils.md5).should.eql(['s', 'format']);
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
      utils.logDate(',').should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      utils.logDate(null, ',').should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      utils.logDate(new Date(1372062988014)).should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            utils.logDate(n).should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
            utils.logDate(n, ',').should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
          }
        }
      }
    });
  });

  describe('YYYYMMDDHHmmss()', function () {
    it('should return an "YYYY-MM-DD HH:mm:ss" format date string', function () {
      utils.YYYYMMDDHHmmss().should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
      utils.YYYYMMDDHHmmss(new Date(1372062988014)).should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            utils.YYYYMMDDHHmmss(n).should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
          }
        }
      }
    });
  });

  describe('YYYYMMDD()', function () {
    it('should return an "YYYY-MM-DD" format date string', function () {
      utils.YYYYMMDD().should.match(/^\d{4}\-\d{2}\-\d{2}$/);
      utils.YYYYMMDD(new Date(1372062988014)).should.match(/^\d{4}\-\d{2}\-\d{2}$/);
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            utils.YYYYMMDD(n).should.match(/^\d{4}\-\d{2}\-\d{2}$/);
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

  describe('timestamp()', function () {
    it('should return a unix timestamp', function () {
      var ts = utils.timestamp();
      ts.should.be.a.number;
      ts.should.above(1378153366);
      String(ts).should.length(10);

      utils.timestamp(1385091596).getTime().should.equal(1385091596000);
      utils.timestamp('1385091596').getTime().should.equal(1385091596000);
      utils.timestamp(1385091596000).getTime().should.equal(1385091596000);
      utils.timestamp('1385091596000').getTime().should.equal(1385091596000);
    });
  });

  describe('isSafeNumberString(), toSafeNumber()', function () {
    var numbers = [
      // str, safe or not
      [String(utils.MAX_SAFE_INTEGER), true],
      [String(utils.MIN_SAFE_INTEGER), true],
      [String(utils.MAX_SAFE_INTEGER + 10), false],
      [String(utils.MIN_SAFE_INTEGER - 10), false],
      ['9007199254740991', true],
      ['-9007199254740991', true],
      ['9007199254740992', false],
      ['-9007199254740992', false],
      ['9007199254740993', false],
      ['-9007199254740993', false],
      ['9007199254740992123', false],
      ['18014398509481984', false],
      ['2251799813685248', true],
      ['-2251799813685248', true],
      ['-9007199254740992', false],
      ['-9007199254740990', true],
      ['90071992547409', true],
      ['-2251799813685248', true],
      ['0', true],
      ['1', true],
      ['-1', true],
      ['1000000', true],
      ['-10000000000', true],
    ];
    it('should detect number string success', function () {
      numbers.forEach(function (item) {
        utils.isSafeNumberString(item[0]).should.equal(item[1], item);
        if (item[1]) {
          utils.toSafeNumber(item[0]).should.equal(Number(item[0]));
        } else {
          utils.toSafeNumber(item[0]).should.equal(item[0]);
        }
      });
    });

    it('should convert number to number work', function () {
      utils.toSafeNumber(123).should.equal(123);
      utils.toSafeNumber(9007199254740992).should.equal(9007199254740992);
    });
  });

  describe('setImmediate()', function () {
    it('should work', function (done) {
      utils.setImmediate(done);
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
      // should.exists(address);
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

  describe('randomString()', function () {
    it('should get random string by default', function () {
      var str = utils.randomString();
      str.should.match(/^[0-9a-zA-Z]{16}$/);
    });

    it('should get number random string with a length of 16', function () {
      var str = utils.randomString(16, '0123456789');
      str.should.match(/^\d{16}$/);
    });
  });

  describe('has()', function () {
    it('should has property ok', function () {
      utils.has({a: 1}, 'a').should.equal(true);
      utils.has({a: 1}, 'b').should.equal(false);
      utils.has({a: 1}, 'constructor').should.equal(false);
      /* jshint -W001 */
      // ignore hasOwnProperty jshint error
      utils.has({'hasOwnProperty': 1, a: 1}, 'a').should.equal(true);
      utils.has({'hasOwnProperty': 1, a: 1}, 'hasOwnProperty').should.equal(true);
    });
  });
  describe('map()', function () {
    it('should get a new map', function () {
      var map = utils.map();
      should.not.exist(map.constructor);
      should.not.exist(map.__proto__);
      should.not.exist(map.toString);
      map.a = 1;
      map.a.should.equal(1);
    });

    it('should get map with obj ok', function () {
      var map = utils.map({a: 1});
      should.not.exist(map.constructor);
      should.not.exist(map.__proto__);
      should.not.exist(map.toString);
      map.a.should.equal(1);
    });
  });
});
