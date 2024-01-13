// http://www.2ality.com/2013/10/safe-integers.html
// http://es6.ruanyifeng.com/#docs/number
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
export const MIN_SAFE_INTEGER = -MAX_SAFE_INTEGER;
export const MAX_SAFE_INTEGER_STR = String(MAX_SAFE_INTEGER);
const MAX_SAFE_INTEGER_STR_LENGTH = MAX_SAFE_INTEGER_STR.length;

/**
 * Detect a number string can safe convert to Javascript Number.
 *
 * @param {String} s number format string, like `"123"`, `"-1000123123123123123123"`
 */
export function isSafeNumberString(s: string) {
  if (s[0] === '-') {
    s = s.substring(1);
  }
  if (s.length < MAX_SAFE_INTEGER_STR_LENGTH ||
    (s.length === MAX_SAFE_INTEGER_STR_LENGTH && s <= MAX_SAFE_INTEGER_STR)) {
    return true;
  }
  return false;
}

/**
 * Convert string to Number if string in safe Number scope.
 *
 * @param {String} s number format string.
 * @return {Number|String} success will return Number, otherwise return the original string.
 */
export function toSafeNumber(s: string | number): number | string {
  if (typeof s === 'number') {
    return s;
  }

  return isSafeNumberString(s) ? Number(s) : s;
}

/**
 * Produces a random integer between the inclusive `lower` and `upper` bounds.
 *
 * @param {Number} lower The lower bound.
 * @param {Number} upper The upper bound.
 * @return {Number} Returns the random number.
 */
export function random(lower?: number, upper?: number): number {
  // random()
  if (lower === undefined) {
    return 0;
  }
  // random(lower) => random(0, lower)
  if (upper === undefined) {
    upper = lower;
    lower = 0;
  }
  let temp: number;
  // random(upper, lower)
  if (lower > upper) {
    temp = lower;
    lower = upper;
    upper = temp;
  }
  return Math.floor(lower + Math.random() * (upper - lower));
}
