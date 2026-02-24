import { LRU } from 'ylru';
// Cache up to 1000 entries
const lru = new LRU(1000);

export function resetTimezone(date: Date) {
  let TIMEZONE: string = '';
  const offsetInMinutes = date.getTimezoneOffset();
  const _hourOffset: number = Math.floor(-offsetInMinutes / 60);
  const _minuteOffset: number = Math.abs(offsetInMinutes % 60);

  TIMEZONE += _hourOffset >= 0 ? '+' : '-';
  TIMEZONE += `${String(Math.abs(_hourOffset)).padStart(2, '0')}${String(_minuteOffset).padStart(2, '0')}`;

  return TIMEZONE;
}

const MONTHS: Record<string, string> = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  // eslint-disable-next-line quote-props
  '10': 'Oct',
  // eslint-disable-next-line quote-props
  '11': 'Nov',
  // eslint-disable-next-line quote-props
  '12': 'Dec',
};

export function getTimezone(d: Date) {
  const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  const timeZone = lru.get(key);
  if (timeZone === undefined) {
    // Cache for 24 hours
    lru.set(key, resetTimezone(d), { maxAge: 86400000 });
    return lru.get(key);
  }
  return timeZone;
}

function formatDatePart(num: number) {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * Return `[ YYYY, MM, DD, HH, mm, ss ]` date string array
 */
export function getDateStringParts(d?: Date, onlyDate?: boolean) {
  const date = d || new Date();
  const month = formatDatePart(date.getMonth() + 1);
  const day = formatDatePart(date.getDate());
  if (onlyDate) {
    return [ `${date.getFullYear()}`, month, day ];
  }
  const hours = formatDatePart(date.getHours());
  const minutes = formatDatePart(date.getMinutes());
  const seconds = formatDatePart(date.getSeconds());
  return [ `${date.getFullYear()}`, month, day, hours, minutes, seconds ];
}

/**
 * Access log format date. format: `moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')`
 */
export function accessLogDate(d?: Date): string {
  // 16/Apr/2013:16:40:09 +0800
  const date = d || new Date();
  const [ year, month, day, hours, minutes, seconds ] = getDateStringParts(date);
  const TIMEZONE = getTimezone(date);
  return `${day}/${MONTHS[month]}/${year}:${hours}:${minutes}:${seconds} ${TIMEZONE}`;
}

/**
 * Normal log format date. format: `moment().format('YYYY-MM-DD HH:mm:ss.SSS')`
 */
export function logDate(d?: string | Date | null, msSep?: string): string {
  let date: Date;
  let separator: string;
  if (typeof d === 'string') {
    // LogDate(msSep)
    separator = d;
    date = new Date();
  } else {
    // LogDate(d, msSep)
    date = d || new Date();
    separator = msSep || '.';
  }
  const [ year, month, day, hours, minutes, seconds ] = getDateStringParts(date);
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${separator}${milliseconds}`;
}

export const YYYYMMDDHHmmssSSS = logDate;

export interface YYYYMMDDHHmmssOptions {
  dateSep?: string;
  timeSep?: string;
}

/**
 * `moment().format('YYYY-MM-DD HH:mm:ss')` format date string.
 */
export function YYYYMMDDHHmmss(d?: Date | string | number, options?: YYYYMMDDHHmmssOptions): string {
  let date: Date;
  if (!d) {
    date = new Date();
  } else if (d instanceof Date) {
    date = d;
  } else {
    date = new Date(d);
  }
  const dateSep = options?.dateSep || '-';
  const timeSep = options?.timeSep || ':';
  const [ year, month, day, hours, minutes, seconds ] = getDateStringParts(date);
  return `${year}${dateSep}${month}${dateSep}${day} ${hours}${timeSep}${minutes}${timeSep}${seconds}`;
}

/**
 * `moment().format('YYYY-MM-DD')` format date string.
 */
export function YYYYMMDD(d?: Date | string, sep?: string): string {
  let date: Date;
  let separator: string;
  if (typeof d === 'string') {
    // YYYYMMDD(sep)
    separator = d;
    date = new Date();
  } else {
    // YYYYMMDD(d, sep)
    date = d || new Date();
    separator = typeof sep === 'string' ? sep : '-';
  }
  const [ year, month, day ] = getDateStringParts(date, true);
  return `${year}${separator}${month}${separator}${day}`;
}

export interface DateStruct {
  YYYYMMDD: number;
  H: number;
}

/**
 * Return datetime struct.
 *
 * @return {Object} date
 *  - {Number} YYYYMMDD, 20130401
 *  - {Number} H, 0, 1, 9, 12, 23
 */
export function datestruct(now?: Date): DateStruct {
  const date = now || new Date();
  return {
    YYYYMMDD: date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate(),
    H: date.getHours(),
  } satisfies DateStruct;
}

/**
 * Get Unix's timestamp in seconds.
 */
export function timestamp(t?: number | string): number | Date {
  if (t) {
    // Convert timestamp to Date
    // Timestamp(timestampValue)
    let v = typeof t === 'string' ? Number(t) : t;
    if (String(v).length === 10) {
      v *= 1000;
    }
    return new Date(v);
  }
  // Get current timestamp
  return Math.round(Date.now() / 1000);
}

/**
 * Parse timestamp to Date
 */
export function parseTimestamp(t: number | string): Date {
  return timestamp(t) as Date;
}

/**
 * Convert Date object to Unix timestamp in seconds.
 */
export function dateToUnixTimestamp(date: Date): number {
  return Math.round(date.getTime() / 1000);
}

export enum DateFormat {
  DateTimeWithTimeZone = 'DateTimeWithTimeZone',
  DateTimeWithMilliSeconds = 'DateTimeWithMilliSeconds',
  DateTimeWithSeconds = 'DateTimeWithSeconds',
  UnixTimestamp = 'UnixTimestamp',
}

/**
 * Provide milliseconds, return a formatted string.
 */
export function getDateFromMilliseconds(milliseconds: number, format?: DateFormat): string {
  if (!Number.isFinite(milliseconds)) {
    throw new Error('Invalid milliseconds value');
  }

  switch (format) {
    case DateFormat.DateTimeWithTimeZone:
      return accessLogDate(new Date(milliseconds));
    case DateFormat.DateTimeWithMilliSeconds:
      return logDate(new Date(milliseconds));
    case DateFormat.DateTimeWithSeconds:
      return YYYYMMDDHHmmss(new Date(milliseconds));
    case DateFormat.UnixTimestamp:
      return dateToUnixTimestamp(new Date(milliseconds)).toString();
    default:
      return YYYYMMDD(new Date(milliseconds));
  }
}
