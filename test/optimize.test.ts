import { strict as assert } from 'node:assert';
import * as utility from '../src/index.js';

describe('test/optimize.test.ts', () => {
  describe('tryCatch(), try()', () => {
    it('try() should work when no error', () => {
      const str = '{"foo": "bar"}';
      const res = utility.UNSTABLE_METHOD.try(function() {
        return JSON.parse(str);
      });
      assert.deepEqual(res, { error: undefined, value: { foo: 'bar' } });
      const res2 = utility.tryCatch(function() {
        return JSON.parse(str);
      });
      assert.deepEqual(res2, { error: undefined, value: { foo: 'bar' } });
    });

    it('try() should work when throw err with error', () => {
      const str = '{"foo": "bar}';
      const res = utility.tryCatch(function() {
        return JSON.parse(str);
      });
      assert(res.error instanceof Error);
      assert.equal(res.value, undefined);
    });

    it('try() should work when throw err with string', () => {
      const res = utility.tryCatch(() => {
        throw 'string error';
      });
      assert(res.error instanceof Error);
      assert.equal(res.error!.message, 'string error');
      assert.equal(res.value, undefined);
    });
  });

  describe('dig()', () => {
    it('dig() should work with undefined', () => {
      assert.equal(utility.dig(), void 0);
      assert.equal(utility.dig(), undefined);
    });

    it('dig() should work with {a: 1}', () => {
      assert.deepEqual(utility.dig({ a: 1 }), { a: 1 });
    });

    it('dig() should work with {a: 1} when access `a`', () => {
      assert.equal(utility.dig({ a: 1 }, 'a'), 1);
    });

    it('dig() should work with {a: 1} when access no exist deep key', () => {
      assert.equal(utility.dig({ a: 1 }, 'a', 'b'), void 0);
    });

    it('dig() should work with {a: {b: {c: 1}}} when access deep key', () => {
      assert.equal(utility.dig({ a: { b: { c: 1 } } }, 'a', 'b', 'c'), 1);
    });

    it('dig() should work with {a: {b: {c: 1}}} when access no exist deep key', () => {
      assert.equal(utility.dig({ a: { b: { c: 1 } } }, 'a', 'b', 'z'), void 0);
    });
  });

  describe('argumentsToArray()', () => {
    it('argumentsToArray(1, 2, 3)', () => {
      assert.deepEqual(utility.argumentsToArray(getArguments(1, 2, 3)), [ 1, 2, 3 ]);
    });

    it('argumentsToArray(1, null, "string", {})', () => {
      assert.deepEqual(utility.argumentsToArray(getArguments(1, null, 'string', {})), [ 1, null, 'string', {}]);
    });

    it('argumentsToArray()', () => {
      assert.deepEqual(utility.argumentsToArray(getArguments()), []);
    });
  });
});

function getArguments(...args: any[]) {
  return args;
}
