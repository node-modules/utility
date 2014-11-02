/*!
 * utility - lib/optimize.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * optimize try catch
 * @param {Function} fn
 * @return {Object}
 *   - {Error} error
 *   - {Mix} value
 */
exports.try = function (fn) {
  var res = {
    error: undefined,
    value: undefined
  };

  try {
    res.value = fn();
  } catch (err) {
    res.error = err instanceof Error
      ? err
      : new Error(err);
  }

  return res;
};
