
import * as fs from 'fs';
import * as path from 'path';
const rimraf = require('rimraf');
import test from 'ava';
import * as utility from '../src';


test('strictJSONParse() should parse normal json ok', t => {
  const obj = utility.strictJSONParse('{"foo": "bar"}');
  t.deepEqual(obj, {foo: 'bar'});
});

test('strictJSONParse() should parse error when invalid json', t => {
  t.throws(function () {
    utility.strictJSONParse('{');
  });
});

test('strictJSONParse() should parse error when non-object json', t => {
  t.throws(function () {
    utility.strictJSONParse('"hello"');
  });
});

test('strictJSONParse() should parse error when null json', t => {
  t.throws(function () {
    utility.strictJSONParse('null');
  });
});

test('readJSONSync() should return json', t => {
  const json = utility.readJSONSync(path.join(__dirname, '../package.json')) as { name: string };
  t.is(json.name, 'utility');
});

test('readJSONSync() should throw when file not found', t => {
  t.throws(function () {
    utility.readJSONSync('noexist');
  });
});

test('writeJSONSync() should write json object', t => {
  const target = path.join(__dirname, 'tmp/target');

  utility.writeJSONSync(target, { a: 1 });
  try {
    const content = fs.readFileSync(target, 'utf8');
    t.is(content, '{\n  "a": 1\n}\n');
  } finally {
    rimraf.sync(target);
  }
});

test('writeJSONSync() should write json with replacer and tabs', t => {
  const target = path.join(__dirname, 'tmp/target');

  utility.writeJSONSync(target, { age: 1 }, {
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

  utility.writeJSONSync(target, '{"a":1}');
  try {
    const content = fs.readFileSync(target, 'utf8');
    t.is(content, '{"a":1}');
  } finally {
    rimraf.sync(target);
  }
});


test('readJSON() should return json', t => {
  return utility
    .readJSON(path.join(__dirname, '../package.json'))
    .then((json) => {
      t.is(json.name, 'utility')
    })
});

test('readJSON() should throw when file not found', t => {
  const p = utility.readJSON('noexist');
  const err = t.throws(p).then().catch((err) => err);

  return err;
});

test('writeJSON() should write json object', t => {
  const target = path.join(__dirname, 'tmp/target1');

  return utility
    .writeJSON(target, { a: 1 })
    .then(() => {
      const content = fs.readFileSync(target, 'utf8');
      t.is(content, '{\n  "a": 1\n}\n');
    });
});

test('writeJSON() should write string', t => {
  const target = path.join(__dirname, 'tmp/target2');

  return utility
    .writeJSON(target, '{"a":1}')
    .then(() => {
      const content = fs.readFileSync(target, 'utf8');
      t.is(content, '{"a":1}');
    })
});

test('writeJSON() should write json with replacer and tabs', t => {
  const target = path.join(__dirname, 'tmp/target');

  return utility
    .writeJSON(target, { age: 1 }, {
      replacer: (key, v) => (key === 'age' ? v - 1 : v),
      space: '\t'
    })
    .then(() => {
      const content = fs.readFileSync(target, 'utf8');
      t.is(content, '{\n\t"age": 0\n}\n');
    });
});
