/*!
 * utility - lib/map.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

exports.has = function has(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

/**
 * generate a real map object, no constructor, no __proto__
 * @param {Object} [obj], init object, optional
 * @return {Object}
 */
exports.map = function map(obj) {
  var map = Object.create(null);
  if (!obj) {
    return map;
  }

  for (var key in obj) {
    map[key] = obj[key];
  }
  return map;
};
