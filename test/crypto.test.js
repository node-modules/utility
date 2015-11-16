/**!
 * utility - test/crypto.test.js
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

describe('crypto.test.js', function () {
  describe('md5()', function () {
    it('should return md5 string', function () {
      utils.md5('mk2').should.equal('a683090976ec0f04dca81f6db9ca7484');
      utils.md5(new Buffer('')).should.equal('d41d8cd98f00b204e9800998ecf8427e');
      utils.md5(new Buffer('')).should.equal(utils.md5(''));
      utils.md5('苏千').should.equal('5f733c47c58a077d61257102b2d44481');
      utils.md5(new Buffer('苏千')).should.equal('5f733c47c58a077d61257102b2d44481');
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
      utils.sha1(new Buffer('苏千')).should.equal('0a4aff6bab634b9c2f99b71f25e976921fcde5a5');
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

  describe('sha256()', function () {
    it('should return sha256 hex string', function () {
      utils.sha256('').should.equal('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
      utils.sha256('123').should.equal('a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
      utils.sha256('哈哈中文').should.equal('0f9d15321510b57fc25b712de846c59cc541de89d47fcd06f6bfe1cd5ff2d7e3');
      utils.sha256(new Buffer('')).should.equal('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
      utils.sha256(new Buffer('123')).should.equal('a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
      utils.sha256(new Buffer('哈哈中文')).should.equal('0f9d15321510b57fc25b712de846c59cc541de89d47fcd06f6bfe1cd5ff2d7e3');
      utils.sha256(new Buffer('@Python发烧友')).should.equal('80ddd84d1453c994af764bf558c4b96adaced9dd8d7d2194705fe58e1b3162df');
      utils.sha256(new Buffer('苏千')).should.equal('75dd03e3fcdbba7d5bec07900bae740cc8e361d77e7df8949de421d3df5d3635');
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

  describe('base64encode(), base64decode()', function () {
    it('should encode and decode', function () {
      var text = utils.base64encode('哈哈中文 ok', true);
      var buf = utils.base64decode(text, true, 'buffer');
      buf.should.be.a.Buffer;
      buf.toString().should.equal(utils.base64decode(text, true));
      buf.toString().should.equal(utils.base64decode(text, true, 'utf8'));
    });
  });
});
