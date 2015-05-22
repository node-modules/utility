/*!
 * utility - lib/utility.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var copy = require('copy-to');

copy(require('./function'))
.and(require('./polyfill'))
.and(require('./optimize'))
.and(require('./crypto'))
.and(require('./number'))
.and(require('./string'))
.and(require('./array'))
.and(require('./json'))
.and(require('./date'))
.and(require('./map'))
.and(require('./web'))
.to(module.exports);
