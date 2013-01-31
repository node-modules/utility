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
});