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

test('getParamNames() should return parameter names', t => {
  t.same(utils.getParamNames(function () {}), []);
  /* jshint ignore:start */
  t.same(utils.getParamNames(function (key1) {}), ['key1']);
  t.same(utils.getParamNames(function (key1,key2) {}), ['key1', 'key2']);
  t.same(utils.getParamNames(function (key1, key2) {}), ['key1', 'key2']);
  t.same(utils.getParamNames(function (key1, key2, key3, key4, callback) {
    console.log('foo');
  }), ['key1', 'key2', 'key3', 'key4', 'callback']);
  /* jshint ignore:end */

  t.same(utils.getParamNames(utils.getParamNames), ['func', 'cache']);
  t.same(utils.getParamNames(utils.getParamNames, false), ['func', 'cache']);
  t.same(utils.getParamNames(utils.md5), ['s', 'format']);
  t.same(utils.getParamNames(utils.hmac), ['algorithm', 'key', 'data', 'encoding']);
  t.same(utils.getParamNames(utils.hmac), ['algorithm', 'key', 'data', 'encoding']);
  t.same(utils.getParamNames(utils.base64encode), ['s', 'urlsafe']);
  t.same(utils.getParamNames(utils.base64decode), ['encodeStr', 'urlsafe', 'encoding']);
});

test('noop() should call noop return undefined', t => {
  t.is(utils.noop(), undefined);
});
