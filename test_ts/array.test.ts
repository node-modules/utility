import test from 'ava';
import * as utility from '../src';


test('randomSlice() should return sub items', t => {
  const arr: number[] = [
    0, 1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12
  ];
  const arr2: any[] = [
    0, 1, 2, 'duan', 'zhao',
    'yang', { name: 'duan', age: 20 }, false, 10,
    11, 2, 333, 333
  ];

  t.deepEqual(utility.randomSlice(arr), arr);
  t.deepEqual(utility.randomSlice(arr, 100000), arr);
  t.deepEqual(utility.randomSlice(arr, 14), arr);
  t.deepEqual(utility.randomSlice(arr, 13), arr);
  t.is(utility.randomSlice(arr, 1).length, 1);
  t.is(utility.randomSlice(arr, 12).length, 12);
  t.deepEqual(utility.randomSlice(arr, 0), arr);
  t.is(utility.randomSlice(arr, 6).length, 6);

  t.deepEqual(utility.randomSlice(arr2), arr2);
  t.deepEqual(utility.randomSlice(arr2, 100000), arr2);
  t.deepEqual(utility.randomSlice(arr2, 14), arr2);
  t.deepEqual(utility.randomSlice(arr2, 13), arr2);
  t.is(utility.randomSlice(arr2, 1).length, 1);
  t.is(utility.randomSlice(arr2, 12).length, 12);
  t.deepEqual(utility.randomSlice(arr2, 0), arr2);
  t.is(utility.randomSlice(arr2, 6).length, 6);
});
