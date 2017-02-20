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
  t.falsy(map.constructor);
  t.falsy(map.__proto__);
  t.falsy(map.toString);
  map.a = 1;
  t.is(map.a, 1);
});

test('map() should get map with obj ok', t => {
  const map = utils.map({a: 1});
  t.falsy(map.constructor);
  t.falsy(map.__proto__);
  t.falsy(map.toString);
  t.is(map.a, 1);
});

test('assign() should assign with object', t => {
  const a = { a: 0, c: 1 };
  const b = { a: 1, b: 1 };
  const c = utils.assign(a, b);
  t.deepEqual(a, c);
  t.deepEqual(c, { a: 1, b: 1, c: 1 });
});

test('assign() should assign with array', t => {
  const a = { a: 0, c: 0 };
  const b = [{ a: 1, b: 0 }, { b: 1, c: 1 }];
  const c = utils.assign(a, b);
  t.deepEqual(a, c);
  t.deepEqual(c, { a: 1, b: 1, c: 1 });
});

test('assign() should assign with empty', t => {
  const a = { a: 0, c: 0 };
  const b = [{ a: 1, b: 0 }, undefined ];
  const c = utils.assign(a, b);
  t.deepEqual(a, c);
  t.deepEqual(c, { a: 1, b: 0, c: 0 });
});
