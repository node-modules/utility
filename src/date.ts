// only set once.
let TIMEZONE = '';
export function resetTimezone() {
  TIMEZONE = '';
  let _hourOffset = Math.floor(-(new Date().getTimezoneOffset()) / 60);
  if (_hourOffset >= 0) {
    TIMEZONE += '+';
  } else {
    TIMEZONE += '-';
  }
  _hourOffset = Math.abs(_hourOffset);
  const _hourOffsetStr = _hourOffset < 10 ? `0${_hourOffset}` : `${_hourOffset}`;
  TIMEZONE += `${_hourOffsetStr}00`;
  return TIMEZONE;
}
resetTimezone();

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

function getDateStringParts(d: Date, onlyDate?: boolean) {
  const monthNum = d.getMonth() + 1;
  const month = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
  const dateNum = d.getDate();
  const date = dateNum < 10 ? `0${dateNum}` : `${dateNum}`;
  if (onlyDate) {
    return [ `${d.getFullYear()}`, month, date ];
  }
  const hoursNum = d.getHours();
  const hours = hoursNum < 10 ? `0${hoursNum}` : `${hoursNum}`;
  const minutesNum = d.getMinutes();
  const minutes = minutesNum < 10 ? `0${minutesNum}` : `${minutesNum}`;
  const secondsNum = d.getSeconds();
  const seconds = secondsNum < 10 ? `0${secondsNum}` : `${secondsNum}`;
  return [ `${d.getFullYear()}`, month, date, hours, minutes, seconds ];
}

/**
 * Access log format date. format: `moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')`
 */
export function accessLogDate(d?: Date): string {
  // 16/Apr/2013:16:40:09 +0800
  d = d || new Date();
  const [ year, month, date, hours, minutes, seconds ] = getDateStringParts(d);
  return `${date}/${MONTHS[month]}/${year}:${hours}:${minutes}:${seconds} ${TIMEZONE}`;
}

/**
 * Normal log format date. format: `moment().format('YYYY-MM-DD HH:mm:ss.SSS')`
 */
export function logDate(msSep?: string): string;
export function logDate(d?: Date): string;
export function logDate(d?: Date | null, msSep?: string): string;
export function logDate(d?: Date | string | null, msSep?: string): string {
  if (typeof d === 'string') {
    // logDate(msSep)
    msSep = d;
    d = new Date();
  } else {
    // logDate(d, msSep)
    d = d || new Date();
  }
  const [ year, month, date, hours, minutes, seconds ] = getDateStringParts(d);
  const millisecondsNum = d.getMilliseconds();
  let milliseconds = `${millisecondsNum}`;
  if (millisecondsNum < 10) {
    milliseconds = `00${millisecondsNum}`;
  } else if (millisecondsNum < 100) {
    milliseconds = `0${millisecondsNum}`;
  }
  msSep = msSep || '.';
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}${msSep}${milliseconds}`;
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
  d = d || new Date();
  if (!(d instanceof Date)) {
    d = new Date(d);
  }

  let dateSep = '-';
  let timeSep = ':';
  if (options?.dateSep) {
    dateSep = options.dateSep;
  }
  if (options?.timeSep) {
    timeSep = options.timeSep;
  }
  const [ year, month, date, hours, minutes, seconds ] = getDateStringParts(d);
  return `${year}${dateSep}${month}${dateSep}${date} ${hours}${timeSep}${minutes}${timeSep}${seconds}`;
}

/**
 * `moment().format('YYYY-MM-DD')` format date string.
 */
export function YYYYMMDD(d?: Date | string, sep?: string): string {
  if (typeof d === 'string') {
    // YYYYMMDD(sep)
    sep = d;
    d = new Date();
  } else {
    // YYYYMMDD(d, sep)
    d = d || new Date();
    if (typeof sep !== 'string') {
      sep = '-';
    }
  }
  const [ year, month, date ] = getDateStringParts(d, true);
  return `${year}${sep}${month}${sep}${date}`;
}

export interface DateStruct {
  YYYYMMDD: number;
  H: number;
}

/**
 * return datetime struct.
 *
 * @return {Object} date
 *  - {Number} YYYYMMDD, 20130401
 *  - {Number} H, 0, 1, 9, 12, 23
 */
export function datestruct(now?: Date): DateStruct {
  now = now || new Date();
  return {
    YYYYMMDD: now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate(),
    H: now.getHours(),
  } satisfies DateStruct;
}

/**
 * Get Unix's timestamp in seconds.
 */
export function timestamp(t?: number | string): number | Date {
  if (t) {
    // convert timestamp to Date
    // timestamp(timestampValue)
    let v: number;
    if (typeof t === 'string') {
      v = Number(t);
    } else {
      v = t;
    }
    if (String(v).length === 10) {
      v *= 1000;
    }
    return new Date(v);
  }
  // get current timestamp
  return Math.round(Date.now() / 1000);
}

/**
 * Parse timestamp to Date
 */
export function parseTimestamp(t: number | string): Date {
  return timestamp(t) as Date;
}
