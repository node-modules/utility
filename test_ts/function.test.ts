
import test from 'ava';
import * as utility from '../';


test('getParamNames() should return parameter names', t => {
  try {
    utility.getParamNames(null);  
  } catch (err) {
    t.is(err.message, 'The "func" must be a function. Received type "object"')
  }
  try {
    utility.getParamNames(undefined);  
  } catch (err) {
    t.is(err.message, 'The "func" must be a function. Received type "undefined"')
  }
  t.deepEqual(utility.getParamNames(function () {}), []);
  /* jshint ignore:start */
  t.deepEqual(utility.getParamNames(function (key1) {}), ['key1']);
  t.deepEqual(utility.getParamNames(function (key1,key2) {}), ['key1', 'key2']);
  t.deepEqual(utility.getParamNames(function (key1, key2) {}), ['key1', 'key2']);
  t.deepEqual(utility.getParamNames(function (key1, key2, key3, key4, callback) {
    console.log('foo');
  }), ['key1', 'key2', 'key3', 'key4', 'callback']);
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
