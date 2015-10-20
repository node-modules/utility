/**!
 * utility - test/date.test.js
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

var moment = require('moment');
var utils = require('../');

describe('date.test.js', function () {
  describe('YYYYMMDDHHmmss()', function () {
    it('should return an "YYYY-MM-DD HH:mm:ss" format date string', function () {
      utils.YYYYMMDDHHmmss().should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
      utils.YYYYMMDDHHmmss(new Date(1372062988014)).should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            utils.YYYYMMDDHHmmss(n).should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
          }
        }
      }
    });

    it('should work with custom sep', function () {
      var date = new Date('2014-02-14 01:02:03');
      utils.YYYYMMDDHHmmss(date, {}).should.equal('2014-02-14 01:02:03');
      utils.YYYYMMDDHHmmss(date, {
        dateSep: '.'
      }).should.equal('2014.02.14 01:02:03');
      utils.YYYYMMDDHHmmss(date, {
        dateSep: '.',
        timeSep: ';'
      }).should.equal('2014.02.14 01;02;03');
      utils.YYYYMMDDHHmmss(date, {
        timeSep: ';'
      }).should.equal('2014-02-14 01;02;03');
    });

    it('should work with time string', function () {
      utils.YYYYMMDDHHmmss('2014-02-14 01:02:03', {
        dateSep: '.'
      }).should.equal('2014.02.14 01:02:03');
    });

    it('should work with timestamp', function () {
      // timezone GMT+0800
      utils.YYYYMMDDHHmmss(1428894236645, {}).should.match(/^2015\-04\-13 (11|03):03:56$/);
    });
  });

  describe('YYYYMMDD()', function () {
    it('should return an "YYYY-MM-DD" format date string', function () {
      utils.YYYYMMDD().should.match(/^\d{4}\-\d{2}\-\d{2}$/);
      utils.YYYYMMDD(new Date(1372062988014)).should.match(/^\d{4}\-\d{2}\-\d{2}$/);
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            utils.YYYYMMDD(n).should.match(/^\d{4}\-\d{2}\-\d{2}$/);
          }
        }
      }
    });

    it('should return an "YYYYMMDD" format date string', function () {
      utils.YYYYMMDD('').should.match(/^\d{4}\d{2}\d{2}$/);
      utils.YYYYMMDD(new Date(1372062988014), '').should.match(/^\d{4}\d{2}\d{2}$/);
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            utils.YYYYMMDD(n, '').should.match(/^\d{4}\d{2}\d{2}$/);
          }
        }
      }
    });
  });


  describe('logDate()', function () {
    it('should return an log format date string', function () {
      utils.logDate().should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
      utils.logDate(',').should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      utils.logDate(null, ',').should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      utils.logDate(new Date(1372062988014)).should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            utils.logDate(n).should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
            utils.logDate(n, ',').should.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
          }
        }
      }
    });
  });

  describe('accessLogDate()', function () {
    it('should return an access log format date string', function () {
      // 16/Apr/2013:16:40:09 +0800
      utils.accessLogDate().should.match(/^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [\+\-]\d{4}$/);
      moment().format('DD/MMM/YYYY:HH:mm:ss ZZ').should.equal(utils.accessLogDate());
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            moment(n).format('DD/MMM/YYYY:HH:mm:ss ZZ').should.equal(utils.accessLogDate(n));
          }
        }
      }
    });
  });

  describe('datestruct()', function () {
    it('should return an date struct', function () {
      var d = utils.datestruct();
      d.YYYYMMDD.toString().should.equal(moment().format('YYYYMMDD'));
      for (var m = 1; m <= 12; m++) {
        for (var d = 1; d <= 28; d++) {
          for (var h = 0; h < 24; h++) {
            var ss = parseInt(Math.random() * 60, 10);
            var ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            var n = new Date(ds);
            var struct = utils.datestruct(n);
            struct.YYYYMMDD.toString().should.equal(moment(n).format('YYYYMMDD'));
            struct.H.toString().should.equal(moment(n).format('H'));
          }
        }
      }
    });
  });

  describe('timestamp()', function () {
    it('should return a unix timestamp', function () {
      var ts = utils.timestamp();
      ts.should.be.a.number;
      ts.should.above(1378153366);
      String(ts).should.length(10);

      utils.timestamp(1385091596).getTime().should.equal(1385091596000);
      utils.timestamp('1385091596').getTime().should.equal(1385091596000);
      utils.timestamp(1385091596000).getTime().should.equal(1385091596000);
      utils.timestamp('1385091596000').getTime().should.equal(1385091596000);
    });
  });
});
