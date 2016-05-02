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

test('strictJSONParse() should parse normal json ok', t => {
  const obj = utils.strictJSONParse('{"foo": "bar"}');
  t.deepEqual(obj, {foo: 'bar'});
});

test('strictJSONParse() should parse error when invalid json', t => {
  t.throws(function () {
    utils.strictJSONParse('{');
  });
});

test('strictJSONParse() should parse error when non-object json', t => {
  t.throws(function () {
    utils.strictJSONParse('"hello"');
  });
});

test('strictJSONParse() should parse error when null json', t => {
  t.throws(function () {
    utils.strictJSONParse('null');
  });
});
