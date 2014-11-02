/*!
 * utility - lib/polyfill.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

exports.setImmediate = function (callback) {
  _setImmediate(callback);
};

var _setImmediate = typeof setImmediate === 'function' ? setImmediate : process.nextTick;
