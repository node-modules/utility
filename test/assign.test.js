'use strict';

const assign = require('..').assign;

import test from 'ava';

test('should assign with object', t => {
  const a = { a: 0, c: 1 };
  const b = { a: 1, b: 1 };
  const c = assign(a, b);
  t.deepEqual(a, c);
  t.deepEqual(c, { a: 1, b: 1, c: 1 });
});

test('should assign with array', t => {
  const a = { a: 0, c: 0 };
  const b = [{ a: 1, b: 0 }, { b: 1, c: 1 }];
  const c = assign(a, b);
  t.deepEqual(a, c);
  t.deepEqual(c, { a: 1, b: 1, c: 1 });
});

test('should assign with empty', t => {
  const a = { a: 0, c: 0 };
  const b = [{ a: 1, b: 0 }, undefined ];
  const c = assign(a, b);
  t.deepEqual(a, c);
  t.deepEqual(c, { a: 1, b: 0, c: 0 });
});
