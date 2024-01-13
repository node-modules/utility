import { strict as assert } from 'node:assert';
import path from 'node:path';
import fs from 'node:fs';
import * as utility from '../src/index.js';
import { strictJSONParse } from '../src/index.js';

const __dirname = path.join(process.cwd(), 'test');

describe('test/json.test.ts', () => {
  describe('strictJSONParse()', () => {
    it('should parse normal json ok', () => {
      const obj = utility.strictJSONParse('{"foo": "bar"}');
      assert.deepEqual(obj, { foo: 'bar' });
    });

    it('should parse error when invalid json', () => {
      assert.throws(() => {
        strictJSONParse('{');
      });
    });

    it('should parse error when non-object json', () => {
      assert.throws(() => {
        strictJSONParse('"hello"');
      });
    });

    it('should parse error when null json', () => {
      assert.throws(() => {
        strictJSONParse('null');
      });
    });
  });

  describe('readJSONSync()', () => {
    it('readJSONSync() should return json', () => {
      const json = utility.readJSONSync(path.join(__dirname, '../package.json')) as { name: string };
      assert.equal(json.name, 'utility');
    });

    it('readJSONSync() should throw when file not found', () => {
      assert.throws(() => {
        utility.readJSONSync('noexist');
      });
    });
  });

  describe('writeJSONSync()', () => {
    it('writeJSONSync() should write json object', () => {
      const target = path.join(__dirname, 'tmp/target');

      utility.writeJSONSync(target, { a: 1 });
      try {
        const content = fs.readFileSync(target, 'utf8');
        assert.equal(content, '{\n  "a": 1\n}\n');
      } finally {
        fs.rmSync(target, { recursive: true });
      }
    });

    it('writeJSONSync() should write json with replacer and tabs', () => {
      const target = path.join(__dirname, 'tmp/target');

      utility.writeJSONSync(target, { age: 1 }, {
        replacer: (key, v) => (key === 'age' ? v - 1 : v),
        space: '\t',
      });

      try {
        const content = fs.readFileSync(target, 'utf8');
        assert.equal(content, '{\n\t"age": 0\n}\n');
      } finally {
        fs.rmSync(target, { recursive: true });
      }
    });

    it('writeJSONSync() should write string', () => {
      const target = path.join(__dirname, 'tmp/target');

      utility.writeJSONSync(target, '{"a":1}');
      try {
        const content = fs.readFileSync(target, 'utf8');
        assert.equal(content, '{"a":1}');
      } finally {
        fs.rmSync(target, { recursive: true });
      }
    });
  });

  describe('readJSON()', () => {
    it('readJSON() should return json', async () => {
      return utility
        .readJSON(path.join(__dirname, '../package.json'))
        .then(json => {
          assert.equal(json.name, 'utility');
        });
    });

    it('readJSON() should throw when file not found', async () => {
      await assert.rejects(async () => {
        await utility.readJSON('noexist');
      }, /ENOENT/);
    });
  });

  describe('writeJSON()', () => {
    it('writeJSON() should write json object', async () => {
      const target = path.join(__dirname, 'tmp/target1');

      return utility
        .writeJSON(target, { a: 1 })
        .then(() => {
          const content = fs.readFileSync(target, 'utf8');
          assert.equal(content, '{\n  "a": 1\n}\n');
        });
    });

    it('writeJSON() should write string', async () => {
      const target = path.join(__dirname, 'tmp/target2');

      await utility.writeJSON(target, '{"a":1}');
      const content = fs.readFileSync(target, 'utf8');
      assert.equal(content, '{"a":1}');
    });

    it('writeJSON() should write json with replacer and tabs', async () => {
      const target = path.join(__dirname, 'tmp/target');

      await utility.writeJSON(target, { age: 1 }, {
        replacer: (key, v) => (key === 'age' ? v - 1 : v),
        space: '\t',
      });
      const content = fs.readFileSync(target, 'utf8');
      assert.equal(content, '{\n\t"age": 0\n}\n');
    });
  });
});
