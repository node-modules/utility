/*!
 * utility - lib/crypto.js
 *
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

function throwNotObject() {
  throw new Error('JSON string is not object');
}

exports.strictJSONParse = function (str) {
  if (typeof str !== 'string' || str === '') {
    return throwNotObject();
  }

  str = str.trim();

  if (str[0] !== '{') {
    return throwNotObject();
  }

  var obj = JSON.parse(str);

  return obj;
};
