/**!
 * utility - test/number.test.js
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

describe('number.test.js', function () {
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
});
