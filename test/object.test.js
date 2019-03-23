'use strict';

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

test('getOwnEnumerables() should return all enumerable and ownership property names', t => {
  t.deepEqual(utils.getOwnEnumerables({}), []);
  t.deepEqual(utils.getOwnEnumerables(), []);
  t.deepEqual(utils.getOwnEnumerables(1), []);
  t.deepEqual(utils.getOwnEnumerables([]), []);
  t.deepEqual(utils.getOwnEnumerables(null), []);
  t.deepEqual(utils.getOwnEnumerables('foo'), []);
  t.deepEqual(utils.getOwnEnumerables(new Date()), []);
  t.deepEqual(utils.getOwnEnumerables(Date), []);
  t.deepEqual(utils.getOwnEnumerables(function() {}), []);
  t.deepEqual(utils.getOwnEnumerables({a: 1}), [ 'a' ]);
  const a = { a: 1 };
  Object.defineProperties(a, {
    one: { enumerable: true, value: 'one' },
    two: { enumerable: false, value: function() {} },
  });
  if (typeof Symbol !== 'undefined') {
    const s = Symbol('s');
    a[s] = 'localSymbol';
  }
  t.deepEqual(utils.getOwnEnumerables(a), [ 'a', 'one' ]);
  t.deepEqual(utils.getOwnEnumerables({b: null}), [ 'b' ]);
  t.deepEqual(utils.getOwnEnumerables({b: null, a: undefined, c: NaN, d: 0, e: '', f: []}, true),
    [ 'd', 'e', 'f' ]);
  t.deepEqual(utils.getOwnEnumerables({a: 1, constructor: 'foo'}), [ 'a', 'constructor' ]);
  /* jshint -W001 */
  // ignore hasOwnProperty jshint error
  t.deepEqual(utils.getOwnEnumerables({'hasOwnProperty': 1, a: 1}), [ 'hasOwnProperty', 'a' ]);
  t.deepEqual(utils.getOwnEnumerables({'hasOwnProperty': 1, a: 1, 'getOwnEnumerables': 0}),
    [ 'hasOwnProperty', 'a', 'getOwnEnumerables' ]);
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
