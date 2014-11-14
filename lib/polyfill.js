/*!
 * utility - lib/polyfill.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

exports.setImmediate = typeof setImmediate === 'function'
  ? setImmediate
  : function(fn){
    process.nextTick(fn.bind.apply(fn, arguments));
  };
