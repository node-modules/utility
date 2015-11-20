/**!
 * utility - test/optimize.test.js
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
var utils = require('../');

describe('optimize.test.js', function () {
  describe('try()', function () {
    it('should work when no error', function () {
      var str = '{"foo": "bar"}';
      var res = utils.try(function () {
        return JSON.parse(str);
      });

      res.should.eql({error: undefined, value: {foo: 'bar'}});
    });

    it('should work when throw err with error', function () {
      var str = '{"foo": "bar}';
      var res = utils.try(function () {
        return JSON.parse(str);
      });
      res.error.should.be.Error;
      should.not.exist(res.value);
    });


    it('should work when throw err with string', function () {
      var res = utils.try(function () {
        throw 'string error';
      });
      res.error.should.be.Error;
      res.error.message.should.equal('string error');
      should.not.exist(res.value);
    });
  });

  describe('dig()', function () {
    it('should work with {}', function () {
      utils.dig({}).should.eql({});
    });

    it('should work with undefined', function () {
      should(utils.dig() === void 0).ok();
    });

    it('should work with {a: 1}', function () {
      utils.dig({a: 1}).should.eql({a: 1});
    });

    it('should work with {a: 1} when access `a`', function () {
      utils.dig({a: 1}, 'a').should.eql(1);
    });

    it('should work with {a: 1} when access deep key', function () {
      should(utils.dig({a: 1}, 'a', 'b') === void 0).ok();
    });
  });
});
