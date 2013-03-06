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
