import { strict as assert } from 'node:assert';
import * as utility from '../src/index.js';
import { runWithTimeout, TimeoutError, promiseTimeout } from '../src/index.js';

function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

describe('test/timeout.test.ts', () => {
  describe('runWithTimeout()', () => {
    it('should timeout', async () => {
      await assert.rejects(async () => {
        await runWithTimeout(async () => {
          await sleep(20);
        }, 10);
      }, (err: unknown) => {
        assert(err instanceof TimeoutError);
        assert.equal(err.timeout, 10);
        assert.equal(err.message, 'Timed out after 10ms');
        // console.error(err);
        return true;
      });

      await assert.rejects(async () => {
        await utility.runWithTimeout(async () => {
          await sleep(1000);
        }, 15);
      }, (err: unknown) => {
        assert(err instanceof TimeoutError);
        assert.equal(err.timeout, 15);
        assert.equal(err.message, 'Timed out after 15ms');
        // console.error(err);
        return true;
      });
    });

    it('should timeout', async () => {
      const result = await runWithTimeout(async () => {
        await sleep(20);
        return 100000;
      }, 100);
      assert.equal(result, 100000);
    });
  });

  describe('promiseTimeout()', () => {
    it('should timeout', async () => {
      await assert.rejects(async () => {
        await promiseTimeout(sleep(20), 10);
      }, (err: unknown) => {
        assert(err instanceof TimeoutError);
        assert.equal(err.timeout, 10);
        assert.equal(err.message, 'Timed out after 10ms');
        // console.error(err);
        return true;
      });
    });
  });
});
