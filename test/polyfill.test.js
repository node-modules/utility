/**!
 * utility - test/polyfill.test.js
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

describe('polyfill.test.js', function () {
  describe('setImmediate()', function () {
    it('should work', function (done) {
      var count = 0;
      utils.setImmediate(function () {
        count.should.equal(1);
        done();
      });
      count++;
    });

    it('should pass arguments work', function (done) {
      var count = 0;
      utils.setImmediate(function (arg) {
        count.should.equal(1);
        arg.should.equal(2);
        done();
      }, 2);
      count++;
    })
  });
});
