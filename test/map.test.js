/**!
 * utility - test/map.test.js
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

describe('map.test.js', function () {
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
