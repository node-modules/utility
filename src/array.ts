/**
 * Array random slice with items count
 */
export function randomSlice<T = any>(arr: T[], num?: number): T[] {
  if (!num || num >= arr.length) {
    return arr.slice();
  }
  const index = Math.floor(Math.random() * arr.length);
  const a: T[] = [];
  for (let i = 0, j = index; i < num; i++) {
    a.push(arr[j++]);
    if (j === arr.length) {
      j = 0;
    }
  }
  return a;
}

/**
 * Remove one exists element from an array
 * @param {Array} arr input array
 * @param  {Number} index - remove element index
 * @return {Array} the array instance
 */
export function spliceOne<T = any>(arr: T[], index: number): T[] {
  if (index < 0) {
    index = arr.length + index;
    // still negative, not found element
    if (index < 0) {
      return arr;
    }
  }

  // don't touch
  if (index >= arr.length) {
    return arr;
  }

  for (let i = index, k = i + 1, n = arr.length; k < n; i += 1, k += 1) {
    arr[i] = arr[k];
  }
  arr.pop();
  return arr;
}
