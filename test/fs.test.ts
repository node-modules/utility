import { strict as assert } from 'node:assert';
import path from 'node:path';
import { Stats } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as utility from '../src/index.js';
import { exists } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('test/fs.test.ts', () => {
  describe('exists()', () => {
    it('should work', async () => {
      let stats = await exists(__filename);
      assert(stats instanceof Stats);
      assert(stats.size > 0, 'stats.size > 0');
      assert.equal(stats.isFile(), true);
      assert.equal(stats.isDirectory(), false);

      stats = await utility.exists(__dirname);
      assert(stats instanceof Stats);
      assert(stats.size > 0, 'stats.size > 0');
      assert.equal(stats.isDirectory(), true);
      assert.equal(stats.isFile(), false);
      assert.equal(await exists(__dirname + '/nonexistent'), false);

      assert.equal(await exists('/root/../../../../../etc/passwd'), false);
    });
  });
});
