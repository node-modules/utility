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

test('randomSlice() should return sub items', t => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  t.same(utils.randomSlice(arr), arr);
  t.same(utils.randomSlice(arr, 100000), arr);
  t.same(utils.randomSlice(arr, 14), arr);
  t.same(utils.randomSlice(arr, 13), arr);
  t.is(utils.randomSlice(arr, 1).length, 1);
  t.is(utils.randomSlice(arr, 12).length, 12);
  t.same(utils.randomSlice(arr, 0), arr);
  t.is(utils.randomSlice(arr, 6).length, 6);
});
