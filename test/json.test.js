'use strict';

import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
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

test('readJSON() should return json', t => {
  const json = utils.readJSON(path.join(__dirname, '../package.json'));
  t.is(json.name, 'utility');
});

test('readJSON() should throw when file not found', t => {
  t.throws(function () {
    utils.readJSON('noexist');
  });
});

test('writeJSON() should write json object', t => {
  const target = path.join(__dirname, 'tmp/target');
  utils.writeJSON(target, { a: 1 });
  try {
    const content = fs.readFileSync(target, 'utf8');
    t.is(content, '{\n  "a": 1\n}\n');
  } finally {
    rimraf.sync(target);
  }
});

test('writeJSON() should write string', t => {
  const target = path.join(__dirname, 'tmp/target');
  utils.writeJSON(target, '{"a":1}');
  try {
    const content = fs.readFileSync(target, 'utf8');
    t.is(content, '{"a":1}');
  } finally {
    rimraf.sync(target);
  }
});
