'use strict';

import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import assert from 'assert';
import test from 'ava';
import utils from '../';

test('strictJSONParse() should parse normal json ok', t => {
  const obj = utils.strictJSONParse('{"foo": "bar"}');
  t.deepEqual(obj, {foo: 'bar'});
});

test('strictJSONParse() should parse error when invalid json', t => {
  t.throws(function () {
    utils.strictJSONParse('{');
  });
});

test('strictJSONParse() should parse error when non-object json', t => {
  t.throws(function () {
    utils.strictJSONParse('"hello"');
  });
});

test('strictJSONParse() should parse error when null json', t => {
  t.throws(function () {
    utils.strictJSONParse('null');
  });
});

test('readJSONSync() should return json', t => {
  const json = utils.readJSONSync(path.join(__dirname, '../package.json'));
  t.is(json.name, 'utility');
});

test('readJSONSync() should throw when file not found', t => {
  t.throws(function () {
    utils.readJSONSync('noexist');
  });
});

test('writeJSONSync() should write json object', t => {
  const target = path.join(__dirname, 'tmp/target');
  utils.writeJSONSync(target, { a: 1 });
  try {
    const content = fs.readFileSync(target, 'utf8');
    t.is(content, '{\n  "a": 1\n}\n');
  } finally {
    rimraf.sync(target);
  }
});

test('writeJSONSync() should write json with replacer and tabs', t => {
  const target = path.join(__dirname, 'tmp/target');
  utils.writeJSONSync(target, { age: 1 }, {
    replacer: (key, v) => (key === 'age' ? v - 1 : v),
    space: '\t'
  });

  try {
    const content = fs.readFileSync(target, 'utf8');
    t.is(content, '{\n\t"age": 0\n}\n');
  } finally {
    rimraf.sync(target);
  }
});

test('writeJSONSync() should write string', t => {
  const target = path.join(__dirname, 'tmp/target');
  utils.writeJSONSync(target, '{"a":1}');
  try {
    const content = fs.readFileSync(target, 'utf8');
    t.is(content, '{"a":1}');
  } finally {
    rimraf.sync(target);
  }
});

test('readJSON() should return json', async t => {
  const json = await utils.readJSON(path.join(__dirname, '../package.json'));
  t.is(json.name, 'utility');
});

test('readJSON() should throw when file not found', async t => {
  const p = utils.readJSON('noexist');
  const err = await t.throws(p);
  assert(err);
});

test('writeJSON() should write json object', async t => {
  const target = path.join(__dirname, 'tmp/target1');
  await utils.writeJSON(target, { a: 1 });
  try {
    const content = fs.readFileSync(target, 'utf8');
    t.is(content, '{\n  "a": 1\n}\n');
  } finally {
    rimraf.sync(target);
  }
});

test('writeJSON() should write string', async t => {
  const target = path.join(__dirname, 'tmp/target2');
  await utils.writeJSON(target, '{"a":1}');
  try {
    const content = fs.readFileSync(target, 'utf8');
    t.is(content, '{"a":1}');
  } finally {
    rimraf.sync(target);
  }
});

test('writeJSON() should write json with replacer and tabs', async t => {
  const target = path.join(__dirname, 'tmp/target');
  await utils.writeJSON(target, { age: 1 }, {
    replacer: (key, v) => (key === 'age' ? v - 1 : v),
    space: '\t'
  });
  try {
    const content = fs.readFileSync(target, 'utf8');
    t.is(content, '{\n\t"age": 0\n}\n');
  } finally {
    rimraf.sync(target);
  }
});
