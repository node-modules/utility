'use strict';

import test from 'ava';
import utils from '../';

test('try() should work when no error', t => {
  const str = '{"foo": "bar"}';
  const res = utils.UNSTABLE_METHOD.try(function () {
    return JSON.parse(str);
  });

  t.deepEqual(res, {error: undefined, value: {foo: 'bar'}});
});

test('try() should work when throw err with error', t => {
  const str = '{"foo": "bar}';
  const res = utils.UNSTABLE_METHOD.try(function () {
    return JSON.parse(str);
  });
  t.true(res.error instanceof Error);
  t.falsy(res.value);
});

test('try() should work when throw err with string', t => {
  const res = utils.UNSTABLE_METHOD.try(function () {
    throw 'string error';
  });
  t.true(res.error instanceof Error);
  t.is(res.error.message, 'string error');
  t.falsy(res.value);
});

test('dig() should work with {}', t => {
  t.deepEqual(utils.dig({}), {});
});

test('dig() should work with undefined', t => {
  t.is(utils.dig(), void 0);
});

test('dig() should work with {a: 1}', t => {
  t.deepEqual(utils.dig({a: 1}), {a: 1});
});

test('dig() should work with {a: 1} when access `a`', t => {
  t.is(utils.dig({a: 1}, 'a'), 1);
});

test('dig() should work with {a: 1} when access no exist deep key', t => {
  t.is(utils.dig({a: 1}, 'a', 'b'), void 0);
});

test('dig() should work with {a: {b: {c: 1}}} when access deep key', t => {
  t.is(utils.dig({a: {b: {c: 1}}}, 'a', 'b', 'c'), 1);
});

test('dig() should work with {a: {b: {c: 1}}} when access no exist deep key', t => {
  t.is(utils.dig({a: {b: {c: 1}}}, 'a', 'b', 'z'), void 0);
});

test('argumentsToArray(1, 2, 3)', t => {
  t.deepEqual(utils.argumentsToArray(getArguments(1, 2, 3)), [1, 2, 3]);
});

test('argumentsToArray(1, null, "string", {})', t => {
  t.deepEqual(utils.argumentsToArray(getArguments(1, null, 'string', {})), [1, null, 'string', {}]);
});

test('argumentsToArray()', t => {
  t.deepEqual(utils.argumentsToArray(getArguments()), []);
});

function getArguments() {
  return arguments;
}
