import assert from 'node:assert';

/**
 * A empty function.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function noop(..._args: any[]): any {
  // noop
}

/**
 * Get a function parameter's names.
 *
 * @param {Function} func any function
 * @param {Boolean} [cache] default is true
 * @return {Array} names
 */
export function getParamNames(func: (...args: any[]) => any, cache?: boolean): string[] {
  const type = typeof func;
  assert.equal(type, 'function', `The "func" must be a function. Received type "${type}"`);

  cache = cache !== false;
  if (cache && '__cache_names' in func) {
    return func.__cache_names as string[];
  }
  const str = func.toString();
  const names = str.slice(str.indexOf('(') + 1, str.indexOf(')')).match(/([^\s,]+)/g) || [];
  Reflect.set(func, '__cache_names', names);
  return names;
}
