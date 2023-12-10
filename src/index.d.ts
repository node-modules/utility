export * from './array';
export * from './date';

/**
 * Static object define
 */
type ObjStatic = { [key: string]: any };


/**
 * ---------------0_0-------------------
 * @description Defines For Function Method
 * @see https://github.com/node-modules/utility#others
 * ---------------0^0--------------------
 */

/**
 * A empty function.
 *
 * @return {Function}
 * @public
 */
export function noop(): () => any;

/**
 * Get a function parameter's names.
 *
 * @param {Function} func
 * @param {Boolean} [useCache], default is true
 * @return {Array} names
 */
export function getParamNames(
  func: (...args: any[]) => any,
  cache?: boolean,
): string[];


/**
 * ----------------0_0-----------------------
 * @description Defines For JSON methods
 * @see https://github.com/node-modules/utility#json
 * -----------------0^0-----------------------
 */

export interface IJSONStaticOptions {
  space?: number | string,
  replacer?: (
    key: string,
    value: any,
  ) => any,
}

export function strictJSONParse(
  str: string,
): ObjStatic;

export function readJSONSync(
  filepath: string,
): ObjStatic;

export function writeJSONSync(
  filepath: string,
  str: string | ObjStatic,
  options?: IJSONStaticOptions,
): void;

export function readJSON(
  filepath: string,
): Promise<any>;

export function writeJSON(
  filepath: string,
  str: string | ObjStatic,
  options?: IJSONStaticOptions,
): Promise<any>;

export function mkdir(
  dir: string,
): Promise<any>;

/**
 * ------------------0_0------------------------
 * @description Defines For Number Methods
 * @see https://github.com/node-modules/utility#number-utils
 * --------------------0^0----------------------
 */


/**
 * CONSTANTS STATIC
 */
export const MAX_SAFE_INTEGER: number;
export const MIN_SAFE_INTEGER: number;
export const MAX_SAFE_INTEGER_STR: string;
export const MAX_SAFE_INTEGER_STR_LENGTH: number;

/**
 * Detect a number string can safe convert to Javascript Number.
 *
 * @param {String} s number format string, like `"123"`, `"-1000123123123123123123"`
 * @return {Boolean}
 */
export function isSafeNumberString(
  s: string,
): boolean;

/**
 * Convert string to Number if string in safe Number scope.
 *
 * @param {String} s number format string.
 * @return {Number|String} success will return Number, otherise return the original string.
 */
export function toSafeNumber(
  s: string | number,
): number | string;

/**
 * Produces a random integer between the inclusive `lower` and `upper` bounds.
 *
 * @param {Number} lower The lower bound.
 * @param {Number} upper The upper bound.
 * @return {Number} Returns the random number.
 */
export function random(
  lower?: number,
  upper?: number,
): number;


/**
 * ------------------0_0--------------------------
 * @description Defines For Object Methods
 * @see https://github.com/node-modules/utility#objectassign
 * -------------------0^0------------------------
 */


/**
 * High performance assign before node6
 * @param {Object} target - target object
 * @param {Object | Array} objects - object assign from
 * @return {Object} - return target object
 */
export function assign(
  target: ObjStatic,
  objects: ObjStatic | any[],
): ObjStatic;

export function has(
  obj: ObjStatic,
  prop: string,
): boolean;

export function getOwnEnumerables(
  obj: ObjStatic,
  ignoreNull?: boolean,
): string[];

/**
 * generate a real map object(clean object), no constructor, no __proto__
 * @param {Object} [obj] - init object, optional
 * @return {Object}
 */
export function map(
  obj?: ObjStatic,
): ObjStatic;


/**
 * -----------------0_0---------------------------
 * @description Defines For Optimize Methods
 * @see https://github.com/node-modules/utility#argumentstoarray
 * -----------------0^0------------------------
 */

export interface ITryStaticReturns {
  error: Error | undefined,
  value: any,
}

export const UNSTABLE_METHOD: {
  /**
   * optimize try catch
   * @param {Function} fn
   * @return {Object}
   *   - {Error} error
   *   - {Mix} value
   */
  try: (
    fn: (...args: any[]) => any,
  ) => ITryStaticReturns,
};

/**
 * avoid if (a && a.b && a.b.c)
 * @param {Object} obj
 * @param {...String} keys
 * @return {Object}
 */
export function dig(
  obj: ObjStatic,
  ...args: any[],
): any;

/**
 * optimize arguments to array
 * @param {Arguments} args
 * @return {Array}
 */
export function argumentsToArray(
  ...args: any[],
): any[];


/**
 * -------------------0_0---------------------
 * @description Defines For Polyfill Methods
 * @see https://github.com/node-modules/utility#timers
 * -------------------0^0-------------------
 */

export function setImmediate(
  callback: (...args: any[]) => void,
  ...args: any[],
): NodeJS.Immediate;
export function setImmediate(
  fn: (...args: any[]) => any,
  ...args: any[],
): void;


/**
 * ------------------0_0--------------------
 * @description Defines For String Methods
 * @see https://github.com/node-modules/utility#others
 * -------------------0^0---------------------
 */

export interface IReplaceInvalidHttpHeaderCharReturns {
  val: string,
  invalid: boolean,
}

export function randomString(
  length?: number,
  charSet?: string | string[],
): string;

/**
 * split string to array
 * @param  {String} str
 * @param  {String} [sep] default is ','
 * @return {Array}
 */
export function split(
  str: string,
  sep?: string,
): string[];

/**
 * always optimized
 */
export function splitAlwaysOptimized(
  ...args: any[],
): string[];

/**
 * Replace string
 *
 * @param  {String} str
 * @param  {String|RegExp} substr
 * @param  {String|Function} newSubstr
 * @return {String}
 */
export function replace(
  str: string,
  substr: string | RegExp,
  newSubstr: string | ((...args: any[]) => any),
): string;

/**
 * Replace invalid http header characters with replacement
 *
 * @param  {String} val
 * @param  {String|Function} replacement - can be `function(char)`
 * @return {Object}
 */
export function replaceInvalidHttpHeaderChar(
  val: string,
  replacement?: string | ((...args: any[]) => any)
): IReplaceInvalidHttpHeaderCharReturns;

/**
 * Detect invalid http header characters in a string
 *
 * @param {String} val
 * @return {Boolean}
 */
export function includesInvalidHttpHeaderChar(
  val: string,
): boolean;

/**
 * ------------------0_0----------------------
 * @description Defines For Web Methods
 * @see https://github.com/node-modules/utility#decode-and-encode
 * ------------------0^0------------------------
 */

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @public
 */
export function escape(
  test: string,
): string;

/**
 * Unescape the given string from html
 * @param {String} html
 * @param {String} type
 * @return {String}
 * @public
 */
export function unescape(
  html: string,
  type?: string,
): string | ObjStatic;

/**
 * Safe encodeURIComponent, won't throw any error.
 * If `encodeURIComponent` error happen, just return the original value.
 *
 * @param {String} text
 * @return {String} URL encode string.
 */
export function encodeURIComponent(
  text: string,
): string;

/**
 * Safe decodeURIComponent, won't throw any error.
 * If `decodeURIComponent` error happen, just return the original value.
 *
 * @param {String} encodeText
 * @return {String} URL decode original string.
 */
export function decodeURIComponent(
  encodeText: string,
): string;
