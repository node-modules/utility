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

test('randomString() should get random string by default', t => {
  t.regex(utils.randomString(), /^[0-9a-zA-Z]{16}$/);
});

test('randomString() should get number random string with a length of 16', t => {
  t.regex(utils.randomString(16, '0123456789'), /^\d{16}$/);
});

test('split(), splitAlwaysOptimized() should work with default sep', t => {
  t.deepEqual(utils.split('haha, ok  ,,,,,xxx xxx ,aaa'), ['haha', 'ok', 'xxx xxx', 'aaa']);
  t.deepEqual(utils.splitAlwaysOptimized('haha, ok  ,,,,,xxx xxx ,aaa'), ['haha', 'ok', 'xxx xxx', 'aaa']);
});

test('split(), splitAlwaysOptimized() should work with sep=|', t => {
  t.deepEqual(utils.split('haha|ok |xxx xxx|,aaa', '|'), ['haha', 'ok', 'xxx xxx', ',aaa']);
  t.deepEqual(utils.splitAlwaysOptimized('haha|ok |xxx xxx|,aaa', '|'), ['haha', 'ok', 'xxx xxx', ',aaa']);
});

test('split(), splitAlwaysOptimized() should return []', t => {
  t.deepEqual(utils.split(',,,,'), []);
  t.deepEqual(utils.split(), []);
  t.deepEqual(utils.split(null), []);
  t.deepEqual(utils.split(''), []);

  t.deepEqual(utils.splitAlwaysOptimized(',,,,'), []);
  t.deepEqual(utils.splitAlwaysOptimized(''), []);
  t.deepEqual(utils.splitAlwaysOptimized('', null), []);
  t.deepEqual(utils.splitAlwaysOptimized('', null, null), []);
});

test('replace() should replace work with special chars', t => {
  t.is(utils.replace('{ <body> }', '<body>', 'this is body $& $` $\' $$'), '{ this is body $& $` $\' $$ }');
  t.is(utils.replace('{ <body> }', '', 'this is body $& $` $\' $$'), 'this is body $& $` $\' $${ <body> }');
  t.is(utils.replace('{ <body> }', 'ddd', 'this is body $& $` $\' $$'), '{ <body> }');
});

test('replace() should support function', t => {
  t.is(utils.replace('{ <body> }', '<body>', function () {
    return 'this is body $& $` $\' $$';
  }), '{ this is body $& $` $\' $$ }');
});

test('replace() should support regex', t => {
  t.is(utils.replace('{ <body> }', /<body>/, function () {
    return 'this is body $& $` $\' $$';
  }), '{ this is body $& $` $\' $$ }');

  t.is(utils.replace('{ <body> }', /<body>/, 'this is body $& $` $\' $$'), '{ this is body $& $` $\' $$ }');
});
