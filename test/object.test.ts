import { strict as assert } from 'node:assert';
import * as utility from '../src/index.js';

describe('test/object.test.ts', () => {
  describe('has()', () => {
    it('should has property ok', () => {
      assert(utility.has({ a: 1 }, 'a'));
      assert(!utility.has({ a: 1 }, 'b'));
      assert(!utility.has({ a: 1 }, 'constructor'));
      assert(utility.has({ hasOwnProperty: 1, a: 1 }, 'a'));
      assert(utility.has({ hasOwnProperty: 1, a: 1 }, 'hasOwnProperty'));
    });
  });

  describe('getOwnEnumerables()', () => {
    it('should return all enumerable and ownership property names', () => {
      assert.deepEqual(utility.getOwnEnumerables({ a: 1 }), [ 'a' ]);
      const a = { a: 1 } as any;
      Object.defineProperties(a, {
        one: { enumerable: true, value: 'one' },
        two: { enumerable: false, value() {} },
      });
      if (typeof Symbol !== 'undefined') {
        const s = Symbol('s');
        a[s] = 'localSymbol';
      }
      assert.deepEqual(utility.getOwnEnumerables(a), [ 'a', 'one' ]);
      assert.deepEqual(utility.getOwnEnumerables({ b: null }), [ 'b' ]);
      assert.deepEqual(utility.getOwnEnumerables({ b: null, a: undefined, c: NaN, d: 0, e: '', f: [] }, true),
        [ 'd', 'e', 'f' ]);
      assert.deepEqual(utility.getOwnEnumerables({ a: 1, constructor: 'foo' }), [ 'a', 'constructor' ]);
      assert.deepEqual(utility.getOwnEnumerables({ hasOwnProperty: 1, a: 1 }), [ 'hasOwnProperty', 'a' ]);
      assert.deepEqual(utility.getOwnEnumerables({ hasOwnProperty: 1, a: 1, getOwnEnumerables: 0 }),
        [ 'hasOwnProperty', 'a', 'getOwnEnumerables' ]);
    });
  });

  describe('map()', () => {
    it('should get a new map', () => {
      const map = utility.map();
      assert(!map.constructor);
      assert.equal('__proto__' in map, false);
      assert(!map.toString);
      map.a = 1;
      assert.equal(map.a, 1);
    });

    it('should get map with obj ok', () => {
      const map = utility.map({ a: 1 });
      assert(!map.constructor);
      assert.equal('__proto__' in map, false);
      assert(!map.toString);
      assert.equal(map.a, 1);
    });
  });

  describe('assign()', () => {
    it('should assign with object', () => {
      const a = { a: 0, c: 1 };
      const b = { a: 1, b: 1 };
      const c = utility.assign(a, b);
      assert.deepEqual(a, c);
      assert.deepEqual(c, { a: 1, b: 1, c: 1 });
    });

    it('should assign with array', () => {
      const a = { a: 0, c: 0 };
      const b = [{ a: 1, b: 0 }, { b: 1, c: 1 }];
      const c = utility.assign(a, b);
      assert.deepEqual(a, c);
      assert.deepEqual(c, { a: 1, b: 1, c: 1 });
    });

    it('should assign with empty', () => {
      const a = { a: 0, c: 0 };
      const b = [{ a: 1, b: 0 }, undefined ];
      const c = utility.assign(a, b);
      assert.deepEqual(a, c);
      assert.deepEqual(c, { a: 1, b: 0, c: 0 });
    });
  });
});
