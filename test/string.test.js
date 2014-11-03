/**!
 * utility - test/string.test.js
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

var utils = require('../');

describe('string.test.js', function () {
  describe('randomString()', function () {
    it('should get random string by default', function () {
      var str = utils.randomString();
      str.should.match(/^[0-9a-zA-Z]{16}$/);
    });

    it('should get number random string with a length of 16', function () {
      var str = utils.randomString(16, '0123456789');
      str.should.match(/^\d{16}$/);
    });
  });

  describe('split(), splitAlwaysOptimized()', function () {
    it('should work with default sep', function () {
      utils.split('haha, ok  ,,,,,xxx xxx ,aaa')
        .should.eql(['haha', 'ok', 'xxx xxx', 'aaa']);
      utils.splitAlwaysOptimized('haha, ok  ,,,,,xxx xxx ,aaa')
        .should.eql(['haha', 'ok', 'xxx xxx', 'aaa']);
    });

    it('should work with sep=|', function () {
      utils.split('haha|ok |xxx xxx|,aaa', '|')
        .should.eql(['haha', 'ok', 'xxx xxx', ',aaa']);
      utils.splitAlwaysOptimized('haha|ok |xxx xxx|,aaa', '|')
        .should.eql(['haha', 'ok', 'xxx xxx', ',aaa']);
    });

    it('should return []', function () {
      utils.split(',,,,').should.eql([]);
      utils.split().should.eql([]);
      utils.split(null).should.eql([]);
      utils.split('').should.eql([]);

      utils.splitAlwaysOptimized(',,,,').should.eql([]);
      utils.splitAlwaysOptimized('').should.eql([]);
      utils.splitAlwaysOptimized('', null).should.eql([]);
      utils.splitAlwaysOptimized('', null, null).should.eql([]);
    });
  });
});
