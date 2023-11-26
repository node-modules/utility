/**
 * Array random slice with items count.
 * @param {Array} arr
 * @param {Number} num, number of sub items.
 * @return {Array}
 */
export function randomSlice<T = any>(
  arr: T[],
  num?: number,
): T[];

/**
 * Remove one exists element from an array
 * @param {Array} arr
 * @param  {Number} index - remove element index
 * @return {Array} the array instance
 */
export function spliceOne(
  arr: any[],
  index: number,
): any[];
