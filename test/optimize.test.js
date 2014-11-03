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
});
