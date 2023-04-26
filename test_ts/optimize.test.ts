import test from 'ava';
import * as utility from '../';


/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * "try" cannot be used as a function name, and typescript seems to be very strict about it
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

test('try() should work when no error', t => {
  const str = '{"foo": "bar"}';
  const res = utility.UNSTABLE_METHOD.try(function () {
    return JSON.parse(str);
  });

  t.deepEqual(res, {error: undefined, value: {foo: 'bar'}});
});

test('try() should work when throw err with error', t => {
  const str = '{"foo": "bar}';
  const res = utility.UNSTABLE_METHOD.try(function () {
    return JSON.parse(str);
  });
  t.true(res.error instanceof Error);
  t.falsy(res.value);
});

test('try() should work when throw err with string', t => {
  const res = utility.UNSTABLE_METHOD.try(function () {
    throw 'string error';
  });
  t.true(res.error instanceof Error);
  t.is(res.error!.message, 'string error');
  t.falsy(res.value);
});


// !!! TSError
// test('dig() should work with undefined', t => {
//   t.is(utility.dig(), void 0);
// });

test('dig() should work with {a: 1}', t => {
  t.deepEqual(utility.dig({a: 1}), {a: 1});
});

test('dig() should work with {a: 1} when access `a`', t => {
  t.is(utility.dig({a: 1}, 'a'), 1);
});

test('dig() should work with {a: 1} when access no exist deep key', t => {
  t.is(utility.dig({a: 1}, 'a', 'b'), void 0);
});

test('dig() should work with {a: {b: {c: 1}}} when access deep key', t => {
  t.is(utility.dig({a: {b: {c: 1}}}, 'a', 'b', 'c'), 1);
});

test('dig() should work with {a: {b: {c: 1}}} when access no exist deep key', t => {
  t.is(utility.dig({a: {b: {c: 1}}}, 'a', 'b', 'z'), void 0);
});

test('argumentsToArray(1, 2, 3)', t => {
  t.deepEqual(utility.argumentsToArray(getArguments(1, 2, 3)), [1, 2, 3]);
});

test('argumentsToArray(1, null, "string", {})', t => {
  t.deepEqual(utility.argumentsToArray(getArguments(1, null, 'string', {})), [1, null, 'string', {}]);
});

test('argumentsToArray()', t => {
  t.deepEqual(utility.argumentsToArray(getArguments()), []);
});

function getArguments(...args: any[]) {
  return args;
}
