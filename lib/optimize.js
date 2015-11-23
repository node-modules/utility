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

/**
 * avoid if (a && a.b && a.b.c)
 * @param {Object} obj
 * @param {...String} keys
 * @return {Object}
 */
exports.dig = function (obj) {
  if (!obj) {
    return;
  }
  if (arguments.length <= 1) {
    return obj;
  }

  var value = obj[arguments[1]];
  for (var i = 2; i < arguments.length; i++) {
    if (!value) {
      break;
    }
    value = value[arguments[i]];
  }

  return value;
};
