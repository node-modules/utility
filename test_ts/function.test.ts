import test from 'ava';
import * as utility from '../';

test('getParamNames() should return parameter names', t => {
  t.throws(() => utility.getParamNames(null as any));
  t.throws(() => utility.getParamNames(undefined as any));
  t.deepEqual(utility.getParamNames(function () {}), []);
  /* jshint ignore:start */
  t.deepEqual(utility.getParamNames(function (_key1) {}), ['_key1']);
  t.deepEqual(utility.getParamNames(function (_key1,_key2) {}), ['_key1', '_key2']);
  t.deepEqual(utility.getParamNames(function (_key1, _key2) {}), ['_key1', '_key2']);
  t.deepEqual(utility.getParamNames(function (_key1, _key2, _key3, _key4, _callback) {
    console.log('foo');
  }), ['_key1', '_key2', '_key3', '_key4', '_callback']);
  /* jshint ignore:end */

  t.deepEqual(utility.getParamNames(utility.getParamNames), ['func', 'cache']);
  t.deepEqual(utility.getParamNames(utility.getParamNames, false), ['func', 'cache']);
  t.deepEqual(utility.getParamNames(utility.md5), ['s', 'format']);
  t.deepEqual(utility.getParamNames(utility.hmac), ['algorithm', 'key', 'data', 'encoding']);
  t.deepEqual(utility.getParamNames(utility.hmac), ['algorithm', 'key', 'data', 'encoding']);
  t.deepEqual(utility.getParamNames(utility.base64encode), ['s', 'urlsafe']);
  t.deepEqual(utility.getParamNames(utility.base64decode), ['encodeStr', 'urlsafe', 'encoding']);
});

test('noop() should call noop return undefined', t => {
  t.is(utility.noop(), undefined);
});
