/**!
 * utility - test/optimized.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var optimized = require('optimized');
var utils = require('../');

/**
 * split
 */

optimized(utils.splitAlwaysOptimized, ['foo,bar', ',']).should.equal(true);
utils.splitAlwaysOptimized('foo,bar');
optimized.detect(utils.splitAlwaysOptimized).optimized.should.equal(true);
optimized(utils.splitAlwaysOptimized, ['foo,bar']).should.equal(true);
utils.splitAlwaysOptimized('foo.bar', '.');
optimized.detect(utils.splitAlwaysOptimized).optimized.should.equal(true);
optimized(utils.splitAlwaysOptimized, ['foo.bar', '.']).should.equal(true);
utils.splitAlwaysOptimized('foo,bar', ',');
optimized.detect(utils.splitAlwaysOptimized).optimized.should.equal(true);
utils.splitAlwaysOptimized('foo,bar');
optimized.detect(utils.splitAlwaysOptimized).optimized.should.equal(true);
utils.splitAlwaysOptimized();
optimized.detect(utils.splitAlwaysOptimized).optimized.should.equal(true);

optimized(utils.split).should.equal(true);
utils.split('foo,bar');
optimized.detect(utils.split).optimized.should.equal(false);
optimized(utils.split, ['foo,bar']).should.equal(true);
utils.split('foo.bar', '.');
optimized.detect(utils.split).optimized.should.equal(false);
optimized(utils.split, ['foo.bar', '.']).should.equal(true);
utils.split('foo,bar', ',');
optimized.detect(utils.split).optimized.should.equal(true);
utils.split('foo,bar');
optimized.detect(utils.split).optimized.should.equal(true);
utils.split();
optimized.detect(utils.split).optimized.should.equal(true);
