import { strict as assert } from 'node:assert';
import * as utility from '../src/index.js';
import * as utils from '../src/index.js';
import { getParamNames } from '../src/index.js';

describe('test/function.test.ts', () => {
  describe('getParamNames()', () => {
    it('should return parameter names', () => {
      assert.throws(() => utility.getParamNames(null as any));
      assert.throws(() => utility.getParamNames(undefined as any));
      assert.deepEqual(utility.getParamNames(function() {}), []);
      /* eslint-disable @typescript-eslint/no-unused-vars */
      assert.deepEqual(utility.getParamNames(function(_key1) {}), [ '_key1' ]);
      assert.deepEqual(utility.getParamNames(function(_key1, _key2) {}), [ '_key1', '_key2' ]);
      assert.deepEqual(utility.getParamNames(function(_key1, _key2) {}), [ '_key1', '_key2' ]);
      assert.deepEqual(getParamNames(function(_key1, _key2, _key3, _key4, _callback) {
        console.log('foo');
      }), [ '_key1', '_key2', '_key3', '_key4', '_callback' ]);

      assert.deepEqual(utility.getParamNames(utility.getParamNames), [ 'func', 'cache' ]);
      assert.deepEqual(utility.getParamNames(utility.getParamNames, false), [ 'func', 'cache' ]);
      assert.deepEqual(utility.getParamNames(utility.md5), [ 's', 'format' ]);
      assert.deepEqual(utility.getParamNames(utility.hmac), [ 'algorithm', 'key', 'data', 'encoding' ]);
      assert.deepEqual(utility.getParamNames(utility.hmac), [ 'algorithm', 'key', 'data', 'encoding' ]);
      assert.deepEqual(utility.getParamNames(utility.base64encode), [ 's', 'urlSafe' ]);
      assert.deepEqual(utility.getParamNames(utility.base64decode), [ 'encodeStr', 'urlSafe', 'encoding' ]);
    });

    it('should return parameter names', () => {
      assert.throws(() => utility.getParamNames(null as any));
      assert.throws(() => utility.getParamNames(undefined as any));
      assert.deepEqual(utils.getParamNames(function() {}), []);
      assert.deepEqual(utils.getParamNames(function(key1) {
        console.log(key1);
      }), [ 'key1' ]);
      assert.deepEqual(utils.getParamNames(function(key1, key2) {
        console.log(key1, key2);
      }), [ 'key1', 'key2' ]);
      assert.deepEqual(utils.getParamNames(function(key1, key2) {
        console.log(key1, key2);
      }), [ 'key1', 'key2' ]);
      assert.deepEqual(utils.getParamNames(function(key1, key2, key3, key4, callback) {
        console.log('foo');
        console.log(key1, key2, key3, key4, callback);
      }), [ 'key1', 'key2', 'key3', 'key4', 'callback' ]);

      assert.deepEqual(utils.getParamNames(utils.getParamNames), [ 'func', 'cache' ]);
      assert.deepEqual(utils.getParamNames(utils.getParamNames, false), [ 'func', 'cache' ]);
      assert.deepEqual(utils.getParamNames(utils.md5), [ 's', 'format' ]);
      assert.deepEqual(utils.getParamNames(utils.hmac), [ 'algorithm', 'key', 'data', 'encoding' ]);
      assert.deepEqual(utils.getParamNames(utils.hmac), [ 'algorithm', 'key', 'data', 'encoding' ]);
      assert.deepEqual(utils.getParamNames(utils.base64encode), [ 's', 'urlSafe' ]);
      assert.deepEqual(utils.getParamNames(utils.base64decode), [ 'encodeStr', 'urlSafe', 'encoding' ]);
    });
  });

  describe('noop()', () => {
    it('noop() should call noop return undefined', () => {
      assert.equal(utility.noop(), undefined);
    });
  });
});
