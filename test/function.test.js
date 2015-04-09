/**!
 * utility - test/function.test.js
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
var should = require('should');

describe('function.test.js', function () {
  describe('getParamNames()', function () {
    it('should return parameter names', function () {
      utils.getParamNames(function () {}).should.eql([]);
      /* jshint ignore:start */
      utils.getParamNames(function (key1) {}).should.eql(['key1']);
      utils.getParamNames(function (key1,key2) {}).should.eql(['key1', 'key2']);
      utils.getParamNames(function (key1, key2) {}).should.eql(['key1', 'key2']);
      utils.getParamNames(function (key1, key2, key3, key4, callback) {
        console.log('foo');
      }).should.eql(['key1', 'key2', 'key3', 'key4', 'callback']);
      /* jshint ignore:end */

      utils.getParamNames(utils.getParamNames).should.eql(['func', 'cache']);
      utils.getParamNames(utils.getParamNames, false).should.eql(['func', 'cache']);
      utils.getParamNames(utils.md5).should.eql(['s', 'format']);
      utils.getParamNames(utils.hmac).should.eql(['algorithm', 'key', 'data', 'encoding']);
      utils.getParamNames(utils.hmac).should.eql(['algorithm', 'key', 'data', 'encoding']);
      utils.getParamNames(utils.base64encode).should.eql(['s', 'urlsafe']);
      utils.getParamNames(utils.base64decode).should.eql(['encodeStr', 'urlsafe', 'encoding']);
      utils.getParamNames(utils.escape).should.eql(['html']);
    });
  });

  describe('noop()', function () {
    it('should call noop return undefined', function () {
      should.ok(utils.noop() === undefined);
    });
  });
});
