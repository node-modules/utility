import { strict as assert } from 'node:assert';
import * as utility from '../src/index.js';
import { randomSlice, spliceOne } from '../src/index.js';

describe('test/array.test.ts', () => {
  describe('randomSlice()', () => {
    it('should work on simple number array', () => {
      const arr = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
      assert.deepEqual(randomSlice(arr), arr);
      assert.deepEqual(randomSlice(arr, 100000), arr);
      assert.deepEqual(randomSlice(arr, 14), arr);
      assert.deepEqual(randomSlice(arr, 13), arr);
      assert.equal(randomSlice(arr, 1).length, 1);
      assert.equal(randomSlice(arr, 12).length, 12);
      assert.deepEqual(randomSlice(arr, 0), arr);
      assert.equal(randomSlice(arr, 6).length, 6);
    });

    it('should return sub items', () => {
      const arr: number[] = [
        0, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12,
      ];
      const arr2: any[] = [
        0, 1, 2, 'duan', 'zhao',
        'yang', { name: 'duan', age: 20 }, false, 10,
        11, 2, 333, 333,
      ];

      assert.deepEqual(utility.randomSlice(arr), arr);
      assert.deepEqual(randomSlice(arr), arr);
      assert.deepEqual(utility.randomSlice(arr, 100000), arr);
      assert.deepEqual(utility.randomSlice(arr, 14), arr);
      assert.deepEqual(utility.randomSlice(arr, 13), arr);
      assert.equal(utility.randomSlice(arr, 1).length, 1);
      assert.equal(utility.randomSlice(arr, 12).length, 12);
      assert.deepEqual(utility.randomSlice(arr, 0), arr);
      assert.equal(utility.randomSlice(arr, 6).length, 6);

      assert.deepEqual(utility.randomSlice(arr2), arr2);
      assert.deepEqual(utility.randomSlice(arr2, 100000), arr2);
      assert.deepEqual(utility.randomSlice(arr2, 14), arr2);
      assert.deepEqual(utility.randomSlice(arr2, 13), arr2);
      assert.equal(utility.randomSlice(arr2, 1).length, 1);
      assert.equal(utility.randomSlice(arr2, 12).length, 12);
      assert.deepEqual(utility.randomSlice(arr2, 0), arr2);
      assert.equal(utility.randomSlice(arr2, 6).length, 6);
    });
  });

  describe('spliceOne()', () => {
    it('should work', () => {
      assert.deepEqual(spliceOne([ 1, 2, 3 ], 0), [ 2, 3 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], 1), [ 1, 3 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], 2), [ 1, 2 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], 3), [ 1, 2, 3 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], 4), [ 1, 2, 3 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], 5), [ 1, 2, 3 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], -0), [ 2, 3 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], -1), [ 1, 2 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], -2), [ 1, 3 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], -3), [ 2, 3 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], -4), [ 1, 2, 3 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], -5), [ 1, 2, 3 ]);
      assert.deepEqual(spliceOne([ 1, 2, 3 ], 100), [ 1, 2, 3 ]);

      assert.deepEqual(spliceOne([ 1 ], 0), []);
      assert.deepEqual(spliceOne([ 1 ], 1), [ 1 ]);
      assert.deepEqual(spliceOne([], 0), []);
      assert.deepEqual(spliceOne([], 100), []);
    });
  });
});
