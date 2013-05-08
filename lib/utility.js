/*!
 * utility - lib/utility.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var crypto = require('crypto');

/**
 * A empty function.
 * 
 * @return {Function}
 * @public
 */
exports.noop = function () {};

/**
 * md5 hash
 *
 * @param {String|Buffer} s
 * @return {String} md5 hash string
 * @public
 */
exports.md5 = function (s) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(s, Buffer.isBuffer(s) ? 'binary' : 'utf8');
  return md5sum.digest('hex');
};

/**
 * HMAC algorithm.
 *
 * Equal bash:
 * 
 * ```bash
 * $ echo -n "$data" | openssl dgst -binary -$algorithm -hmac "$key" | openssl $encoding
 * ```
 * 
 * @param {String} algorithm, dependent on the available algorithms supported by the version of OpenSSL on the platform. 
 *   Examples are 'sha1', 'md5', 'sha256', 'sha512', etc. 
 *   On recent releases, `openssl list-message-digest-algorithms` will display the available digest algorithms.
 * @param {String} key, the hmac key to be used.
 * @param {String|Buffer} data, content string.
 * @param {String} [encoding='base64']
 * @return {String} digest string.
 */
exports.hmac = function (algorithm, key, data, encoding) {
  encoding = encoding || 'base64';
  var hmac = crypto.createHmac(algorithm, key);
  hmac.update(data, Buffer.isBuffer(data) ? 'binary' : 'utf8');
  return hmac.digest(encoding);
};

/**
 * Base64 encode string.
 * 
 * @param {String|Buffer} s
 * @param {Boolean} [urlsafe=false] Encode string s using a URL-safe alphabet, 
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @return {String} base64 encode format string.
 */
exports.base64encode = function (s, urlsafe) {
  if (!Buffer.isBuffer(s)) {
    s = new Buffer(s);
  }
  var encode = s.toString('base64');
  if (urlsafe) {
    encode = encode.replace(/\+/g, '-').replace(/\//g, '_');
  }
  return encode;
};

/**
 * Base64 string decode.
 * 
 * @param {String} encode, base64 encoding string.
 * @param {Boolean} [urlsafe=false] Decode string s using a URL-safe alphabet, 
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @return {String} plain text.
 */
exports.base64decode = function (encode, urlsafe) {
  if (urlsafe) {
    encode = encode.replace(/\-/g, '+').replace(/_/g, '/');
  }
  encode = new Buffer(encode, 'base64');
  return encode.toString();
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @public
 */
exports.escape = function (html) {
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Array random slice with items count.
 * @param {Array} arr
 * @param {Number} num, number of sub items.
 * @return {Array}
 */
exports.randomSlice = function (arr, num) {
  if (!num || num >= arr.length) {
    return arr.slice();
  }
  var index = Math.floor(Math.random() * arr.length);
  var a = [];
  for (var i = 0, j = index; i < num; i++) {
    a.push(arr[j++]);
    if (j === arr.length) {
      j = 0;
    }
  }
  return a;
};

/**
 * Safe encodeURIComponent, won't throw any error.
 * If `encodeURIComponent` error happen, just return the original value.
 * 
 * @param {String} text
 * @return {String} URL encode string.
 */
exports.encodeURIComponent = function (text) {
  try {
    return encodeURIComponent(text);
  } catch (e) {
    return text;
  }
};

/**
 * Safe decodeURIComponent, won't throw any error.
 * If `decodeURIComponent` error happen, just return the original value.
 * 
 * @param {String} encodeText
 * @return {String} URL decode original string.
 */
exports.decodeURIComponent = function (encodeText) {
  try {
    return decodeURIComponent(encodeText);
  } catch (e) {
    return encodeText;
  }
};

var MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// only set once.
var TIMEZONE = ' ';
var _hourOffset = parseInt(-(new Date().getTimezoneOffset()) / 60, 10);
if (_hourOffset >= 0) {
  TIMEZONE += '+';
} else {
  TIMEZONE += '-';
}
_hourOffset = Math.abs(_hourOffset);
if (_hourOffset < 10) {
  _hourOffset = '0' + _hourOffset;
}
TIMEZONE += _hourOffset + '00';

/**
 * Access log format date. format: `moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')`
 * 
 * @return {String}
 */
exports.accessLogDate = function (d) {
  // 16/Apr/2013:16:40:09 +0800
  d = d || new Date();
  var date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var hours = d.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var mintues = d.getMinutes();
  if (mintues < 10) {
    mintues = '0' + mintues;
  }
  var seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return date + '/' + MONTHS[d.getMonth()] + '/' + d.getFullYear() + 
    ':' + hours + ':' + mintues + ':' + seconds + TIMEZONE;
};

/**
 * Normal log format date. format: `moment().format('YYYY-MM-DD HH:mm:ss.SSS')`
 * 
 * @return {String}
 */
exports.logDate = function (d) {
  d = d || new Date();
  var date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  var hours = d.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var mintues = d.getMinutes();
  if (mintues < 10) {
    mintues = '0' + mintues;
  }
  var seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  var milliseconds = d.getMilliseconds();
  if (milliseconds < 10) {
    milliseconds = '00' + milliseconds;
  } else if (milliseconds < 100) {
    milliseconds = '0' + milliseconds;
  }
  return d.getFullYear() + '-' + month + '-' + date + ' ' + 
    hours + ':' + mintues + ':' + seconds + '.' + milliseconds;
};

/**
 * return datetime struct.
 * 
 * @return {Object} date
 *  - {Number} YYYYMMDD, 20130401
 *  - {Number} H, 0, 1, 9, 12, 23
 */
exports.datestruct = function (now) {
  now = now || new Date();
  return {
    YYYYMMDD: now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate(),
    H: now.getHours() 
  };
};
