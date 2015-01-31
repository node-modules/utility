/*!
 * utility - lib/string.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

exports.randomString = function randomString(length, charSet) {
  var result = [];
  length = length || 16;
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  while (length--) {
    result.push(charSet[Math.floor(Math.random() * charSet.length)]);
  }
  return result.join('');
};

/**
 * split string to array
 * @param  {String} str
 * @param  {String} [sep] default is ','
 * @return {Array}
 */
exports.split = function split(str, sep) {
  str = str || '';
  sep = sep || ',';
  var items = str.split(sep);
  var needs = [];
  for (var i = 0; i < items.length; i++) {
    var s = items[i].trim();
    if (s.length > 0) {
      needs.push(s);
    }
  }
  return needs;
};

// always optimized
exports.splitAlwaysOptimized = function splitAlwaysOptimized() {
  var str = '';
  var sep = ',';
  if (arguments.length === 1) {
    str = arguments[0] || '';
  } else if (arguments.length === 2) {
    str = arguments[0] || '';
    sep = arguments[1] || ',';
  }
  var items = str.split(sep);
  var needs = [];
  for (var i = 0; i < items.length; i++) {
    var s = items[i].trim();
    if (s.length > 0) {
      needs.push(s);
    }
  }
  return needs;
};

/**
 * Replace string
 *
 * @param  {String} str
 * @param  {String|RegExp} substr
 * @param  {String|Function} newSubstr
 * @return {String}
 */
exports.replace = function replace(str, substr, newSubstr) {
  var replaceFunction = newSubstr;
  if (typeof replaceFunction !== 'function') {
    replaceFunction = function () {
      return newSubstr;
    };
  }
  return str.replace(substr, replaceFunction);
};
