'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

exports.strictJSONParse = function (str) {
  var obj = JSON.parse(str);
  if (!obj || typeof obj !== 'object') {
    throw new Error('JSON string is not object');
  }
  return obj;
};

exports.readJSON = function(filepath) {
  if (!fs.existsSync(filepath)) {
    throw new Error(filepath + ' is not found');
  }
  return JSON.parse(fs.readFileSync(filepath));
};

exports.writeJSON = function(filepath, str) {
  mkdirp.sync(path.dirname(filepath));
  if (typeof str === 'object') {
    str = JSON.stringify(str, null, 2) + '\n';
  }
  fs.writeFileSync(filepath, str);
};
