
import test from 'ava';
import * as utility from '../src';

test('has() should has property ok', t => {
  t.true(utility.has({ a: 1 }, 'a'));
  t.false(utility.has({ a: 1 }, 'b'));
  t.false(utility.has({ a: 1 }, 'constructor'));
  /* jshint -W001 */
  // ignore hasOwnProperty jshint error
  t.true(utility.has({ hasOwnProperty: 1, a: 1 }, 'a'));
  t.true(utility.has({ hasOwnProperty: 1, a: 1 }, 'hasOwnProperty'));
});

test('getOwnEnumerables() should return all enumerable and ownership property names', t => {
  t.deepEqual(utility.getOwnEnumerables({ a: 1 }), [ 'a' ]);
  const a = { a: 1 } as any;
  Object.defineProperties(a, {
    one: { enumerable: true, value: 'one' },
    two: { enumerable: false, value() {} },
  });
  if (typeof Symbol !== 'undefined') {
    const s = Symbol('s');
    a[s] = 'localSymbol';
  }
  t.deepEqual(utility.getOwnEnumerables(a), [ 'a', 'one' ]);
  t.deepEqual(utility.getOwnEnumerables({ b: null }), [ 'b' ]);
  t.deepEqual(utility.getOwnEnumerables({ b: null, a: undefined, c: NaN, d: 0, e: '', f: [] }, true),
    [ 'd', 'e', 'f' ]);
  t.deepEqual(utility.getOwnEnumerables({ a: 1, constructor: 'foo' }), [ 'a', 'constructor' ]);
  /* jshint -W001 */
  // ignore hasOwnProperty jshint error
  t.deepEqual(utility.getOwnEnumerables({ hasOwnProperty: 1, a: 1 }), [ 'hasOwnProperty', 'a' ]);
  t.deepEqual(utility.getOwnEnumerables({ hasOwnProperty: 1, a: 1, getOwnEnumerables: 0 }), [ 'hasOwnProperty', 'a', 'getOwnEnumerables' ]);
});

test('map() should get a new map', t => {
  const map = utility.map();
  t.falsy(map.constructor);
  t.falsy(map.__proto__);
  t.falsy(map.toString);
  map.a = 1;
  t.is(map.a, 1);
});

test('map() should get map with obj ok', t => {
  const map = utility.map({ a: 1 });
  t.falsy(map.constructor);
  t.falsy(map.__proto__);
  t.falsy(map.toString);
  t.is(map.a, 1);
});

test('assign() should assign with object', t => {
  const a = { a: 0, c: 1 };
  const b = { a: 1, b: 1 };
  const c = utility.assign(a, b);
  t.deepEqual(a, c);
  t.deepEqual(c, { a: 1, b: 1, c: 1 });
});

test('assign() should assign with array', t => {
  const a = { a: 0, c: 0 };
  const b = [{ a: 1, b: 0 }, { b: 1, c: 1 }];
  const c = utility.assign(a, b);
  t.deepEqual(a, c);
  t.deepEqual(c, { a: 1, b: 1, c: 1 });
});

test('assign() should assign with empty', t => {
  const a = { a: 0, c: 0 };
  const b = [{ a: 1, b: 0 }, undefined ];
  const c = utility.assign(a, b);
  t.deepEqual(a, c);
  t.deepEqual(c, { a: 1, b: 0, c: 0 });
});
