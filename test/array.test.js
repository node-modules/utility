/**!
 * utility - test/array.test.js
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

describe('array.test.js', function () {
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
});
