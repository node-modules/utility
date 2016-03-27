/**
 * Copyright(c) node-modules and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.com)
 */

'use strict';

/**
 * Module dependencies.
 */

import test from 'ava';
import utils from '../';

test('isSafeNumberString(), toSafeNumber() should detect number string success', t => {
  const numbers = [
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
  numbers.forEach(item => {
    t.is(utils.isSafeNumberString(item[0]), item[1]);
    if (item[1]) {
      t.is(utils.toSafeNumber(item[0]), Number(item[0]));
    } else {
      t.is(utils.toSafeNumber(item[0]), item[0]);
    }
  });
});

test('toSafeNumber() should convert number to number work', t => {
  t.is(utils.toSafeNumber(123), 123);
  t.is(utils.toSafeNumber(9007199254740992), 9007199254740992);
});
