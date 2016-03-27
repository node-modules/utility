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

test('has() should has property ok', t => {
  t.true(utils.has({a: 1}, 'a'));
  t.false(utils.has({a: 1}, 'b'));
  t.false(utils.has({a: 1}, 'constructor'));
  /* jshint -W001 */
  // ignore hasOwnProperty jshint error
  t.true(utils.has({'hasOwnProperty': 1, a: 1}, 'a'));
  t.true(utils.has({'hasOwnProperty': 1, a: 1}, 'hasOwnProperty'));
});

test('map() should get a new map', t => {
  const map = utils.map();
  t.notOk(map.constructor);
  t.notOk(map.__proto__);
  t.notOk(map.toString);
  map.a = 1;
  t.is(map.a, 1);
});

test('map() should get map with obj ok', t => {
  const map = utils.map({a: 1});
  t.notOk(map.constructor);
  t.notOk(map.__proto__);
  t.notOk(map.toString);
  t.is(map.a, 1);
});
