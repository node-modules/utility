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
