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
 * @param {String} s
 * @return {String} md5 hash string
 * @public
 */
exports.md5 = function (s) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(s, Buffer.isBuffer(s) ? 'binary' : 'utf8');
  return md5sum.digest('hex');
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
