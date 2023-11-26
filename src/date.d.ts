export interface IYYYYMMDDHHmmssStaticOptions {
  dateSep?: string,
  timeSep?: string,
}
export interface IDateStructStaticReturns {
  YYYYMMDD: number,
  H: number,
}

/**
 * Access log format date. format: `moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')`
 *
 * @return {String}
 */
export function accessLogDate(d: Date): string;

/**
 * Normal log format date. format: `moment().format('YYYY-MM-DD HH:mm:ss.SSS')`
 *
 * @return {String}
 */
export function logDate(
  d?: string | Date,
  msSep?: string,
): string;
/**
 * alias to logDate
 */
export type YYYYMMDDHHmmssSSS = typeof logDate;

/**
 * `moment().format('YYYY-MM-DD HH:mm:ss')` format date string.
 *
 * @return {String}
 */
export function YYYYMMDDHHmmss(
  d: Date | string,
  options?: IYYYYMMDDHHmmssStaticOptions,
): string;

/**
 * `moment().format('YYYY-MM-DD')` format date string.
 *
 * @return {String}
 */
export function YYYYMMDD(
  d: string | Date,
  sep?: string,
): string;

/**
 * return datetime struct.
 *
 * @return {Object} date
 *  - {Number} YYYYMMDD, 20130401
 *  - {Number} H, 0, 1, 9, 12, 23
 */
export function datestruct(
  now?: Date,
): IDateStructStaticReturns;

/**
 * Get Unix's timestamp in seconds.
 * @return {Number}
 */
export function timestamp(
  t?: string | number,
): number | Date;
