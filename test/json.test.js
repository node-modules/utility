/**!
 * utility - test/json.test.js
 *
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

describe('json.test.js', function () {
  describe('strictJSONParse()', function () {
    it('should parse normal json ok', function () {
      var obj = utils.strictJSONParse('{"foo": "bar"}');
      obj.should.eql({foo: 'bar'});
    });

    it('should parse error when invalid json', function () {
      (function () {
        utils.strictJSONParse('{');
      }).should.throw();
    });

    it('should parse error when non-object json', function () {
      (function () {
        utils.strictJSONParse('"hello"');
      }).should.throw();
    });

    it('should parse error when null json', function () {
      (function () {
        utils.strictJSONParse('null');
      }).should.throw();
    });
  });
});
