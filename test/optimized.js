/**!
 * utility - test/optimized.js
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

var should = require('should');
var optimized = require('optimized');
var utils = require('../');

/**
 * split
 */

optimized(utils.splitAlwaysOptimized, ['foo,bar', ',']).should.equal(true);
utils.splitAlwaysOptimized('foo,bar');
optimized.detect(utils.splitAlwaysOptimized).optimized.should.equal(true);
optimized(utils.splitAlwaysOptimized, ['foo,bar']).should.equal(true);
utils.splitAlwaysOptimized('foo.bar', '.');
optimized.detect(utils.splitAlwaysOptimized).optimized.should.equal(true);
optimized(utils.splitAlwaysOptimized, ['foo.bar', '.']).should.equal(true);
utils.splitAlwaysOptimized('foo,bar', ',');
optimized.detect(utils.splitAlwaysOptimized).optimized.should.equal(true);
utils.splitAlwaysOptimized('foo,bar');
optimized.detect(utils.splitAlwaysOptimized).optimized.should.equal(true);
utils.splitAlwaysOptimized();
optimized.detect(utils.splitAlwaysOptimized).optimized.should.equal(true);

optimized(utils.split).should.equal(true);
utils.split('foo,bar');
optimized.detect(utils.split).optimized.should.equal(false);
optimized(utils.split, ['foo,bar']).should.equal(true);
utils.split('foo.bar', '.');
optimized.detect(utils.split).optimized.should.equal(false);
optimized(utils.split, ['foo.bar', '.']).should.equal(true);
utils.split('foo,bar', ',');
optimized.detect(utils.split).optimized.should.equal(true);
utils.split('foo,bar');
optimized.detect(utils.split).optimized.should.equal(true);
utils.split();
optimized.detect(utils.split).optimized.should.equal(true);

/**
 * hash
 */

optimized(utils.hash, ['md5', 'string']).should.equal(true);
utils.hash('md5', {foo: 'bar'}).should.be.a.String;
optimized.detect(utils.hash).optimized.should.equal(true);

optimized(utils.hash, ['md5', {foo: '123123'}]).should.equal(true);

utils.hash('md5', 'string', 'base64').should.be.a.String;
optimized.detect(utils.hash).optimized.should.equal(false);

optimized(utils.hash, ['md5', 'string', 'base64']).should.equal(true);
utils.hash('md5', {foo: 'bar'}).should.be.a.String;
optimized.detect(utils.hash).optimized.should.equal(true);
utils.hash('md5', 'string', 'base64').should.be.a.String;
optimized.detect(utils.hash).optimized.should.equal(true);

optimized(utils.md5, ['string']).should.equal(true);
optimized(utils.sha1, ['string']).should.equal(true);

optimized(utils.hmac, ['sha1', 'key', 'value']).should.equal(true);

/**
 * base64encode, base64decode
 */

var encodeString = utils.base64encode('string');
var encodeStringURLSafe = utils.base64encode('string', true);

optimized(utils.base64encode, ['string']).should.equal(true);
optimized(utils.base64encode, ['string', true]).should.equal(true);
optimized(utils.base64encode, [new Buffer('string')]).should.equal(true);
optimized(utils.base64encode, [new Buffer('string'), true]).should.equal(true);
optimized(utils.base64encode, ['string']).should.equal(true);
optimized(utils.base64encode, ['string', true]).should.equal(true);
optimized(utils.base64encode, [new Buffer('string')]).should.equal(true);
optimized(utils.base64encode, [new Buffer('string'), true]).should.equal(true);

optimized(utils.base64decode, [encodeString]).should.equal(true);
optimized(utils.base64decode, [encodeStringURLSafe, true]).should.equal(true);
optimized(utils.base64decode, [encodeString]).should.equal(true);
optimized(utils.base64decode, [encodeStringURLSafe, true]).should.equal(true);

/**
 * escape
 */

optimized(utils.escape, ['<html>okla']).should.equal(true);
optimized(utils.escape, [1]).should.equal(true);
optimized(utils.escape, ['<html>okla']).should.equal(true);
optimized(utils.escape, [1]).should.equal(true);

/**
 * randomSlice
 */

optimized(utils.randomSlice, [[1, 2, 3, 4], 2]).should.equal(true);
optimized(utils.randomSlice, [[1, 2, 3, 4], 4]).should.equal(true);
optimized(utils.randomSlice, [[1, 2, 3, 4], 5]).should.equal(true);
optimized(utils.randomSlice, [[1, 2, 3, 4], 2]).should.equal(true);
optimized(utils.randomSlice, [[1, 2, 3, 4], 4]).should.equal(true);
optimized(utils.randomSlice, [[1, 2, 3, 4], 5]).should.equal(true);

/**
 * encodeURIComponent, decodeURIComponent
 */

optimized(utils.encodeURIComponent, ['dsdf/!@#$++\\....,,束带结发']).should.equal(false);
optimized(utils.decodeURIComponent, ['dsdf/!@#$++\\....,,束带结发']).should.equal(false);

/**
 * accessLogDate
 */

optimized(utils.accessLogDate).should.equal(true);
optimized(utils.accessLogDate, [new Date()]).should.equal(true);
optimized(utils.accessLogDate).should.equal(true);
optimized(utils.accessLogDate, [new Date()]).should.equal(true);

/**
 * YYYYMMDDHHmmssSSS
 */

optimized(utils.YYYYMMDDHHmmssSSS).should.equal(true);
optimized(utils.YYYYMMDDHHmmssSSS, [new Date()]).should.equal(true);
optimized(utils.YYYYMMDDHHmmssSSS, [',']).should.equal(true);
optimized(utils.YYYYMMDDHHmmssSSS, [new Date(), ',']).should.equal(true);
optimized(utils.YYYYMMDDHHmmssSSS, [null, ',']).should.equal(true);
optimized(utils.YYYYMMDDHHmmssSSS).should.equal(true);
optimized(utils.YYYYMMDDHHmmssSSS, [new Date()]).should.equal(true);
optimized(utils.YYYYMMDDHHmmssSSS, [',']).should.equal(true);
optimized(utils.YYYYMMDDHHmmssSSS, [new Date(), ',']).should.equal(true);
optimized(utils.YYYYMMDDHHmmssSSS, [null, ',']).should.equal(true);

/**
 * getParamNames
 */

optimized(utils.getParamNames, [utils.YYYYMMDDHHmmssSSS]).should.equal(false);
optimized(utils.getParamNames, [utils.YYYYMMDDHHmmssSSS, false]).should.equal(true);
optimized(utils.getParamNames, [utils.YYYYMMDDHHmmssSSS]).should.equal(true);
optimized(utils.getParamNames, [utils.YYYYMMDDHHmmssSSS, false]).should.equal(true);

/**
 * has
 */

optimized(utils.has, [{}, 'YYYYMMDDHHmmssSSS']).should.equal(true);
optimized(utils.has, [{'123': 'foo'}, '123']).should.equal(true);

/**
 * map
 */

optimized(utils.map).should.equal(true);
optimized(utils.map, [{'foo': 'bar'}]).should.equal(false);
optimized(utils.map).should.equal(true);
optimized(utils.map, [{'foo1': 'bar1'}]).should.equal(true);
optimized(utils.map, [{'foo2': 'bar2'}]).should.equal(true);
