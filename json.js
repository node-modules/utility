'use strict';

var path = require('path');

var _mkdirp;
function getMkdirp() {
  if (!_mkdirp) {
    _mkdirp = require('mkdirp');
  }
  return _mkdirp;
}
var _fs;
function getFS() {
  if (!_fs) {
    _fs = require('mz/fs');
  }
  return _fs;
}

exports.strictJSONParse = function (str) {
  var obj = JSON.parse(str);
  if (!obj || typeof obj !== 'object') {
    throw new Error('JSON string is not object');
  }
  return obj;
};

exports.readJSONSync = function(filepath) {
  if (!getFS().existsSync(filepath)) {
    throw new Error(filepath + ' is not found');
  }
  return JSON.parse(getFS().readFileSync(filepath));
};

exports.writeJSONSync = function(filepath, str, options) {
  options = options || {};
  if (!('space' in options)) {
    options.space = 2;
  }

  getMkdirp().sync(path.dirname(filepath));
  if (typeof str === 'object') {
    str = JSON.stringify(str, options.replacer, options.space) + '\n';
  }

  getFS().writeFileSync(filepath, str);
};

exports.readJSON = function(filepath) {
  return getFS().exists(filepath)
    .then(function(exists) {
      if (!exists) {
        throw new Error(filepath + ' is not found');
      }
      return getFS().readFile(filepath);
    })
    .then(function(buf) {
      return JSON.parse(buf);
    });
};

exports.writeJSON = function(filepath, str, options) {
  options = options || {};
  if (!('space' in options)) {
    options.space = 2;
  }

  if (typeof str === 'object') {
    str = JSON.stringify(str, options.replacer, options.space) + '\n';
  }

  return mkdir(path.dirname(filepath))
    .then(function() {
      return getFS().writeFile(filepath, str);
    });
};

function mkdir(dir) {
  return new Promise(function(resolve, reject) {
    getMkdirp()(dir, function(err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
