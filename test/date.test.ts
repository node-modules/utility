import { strict as assert } from 'node:assert';
import moment from 'moment';
import * as utility from '../src/index.js';
import * as utils from '../src/index.js';
import { YYYYMMDDHHmmss, logDate } from '../src/index.js';

describe('test/date.test.ts', () => {
  describe('YYYYMMDDHHmmss()', () => {
    it('should return an "YYYY-MM-DD HH:mm:ss" format date string', () => {
      assert.match(utility.YYYYMMDDHHmmss(), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
      assert.match(utility.YYYYMMDDHHmmss(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 28; d++) {
          for (let h = 0; h < 24; h++) {
            const ss = parseInt(String(Math.random() * 60), 10);
            const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            const n = new Date(ds);
            assert.match(YYYYMMDDHHmmss(n), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
          }
        }
      }
    });

    it('should work with custom sep', () => {
      const date = new Date('2014-02-14 01:02:03') as Date;
      assert.equal(utility.YYYYMMDDHHmmss(date, {}), '2014-02-14 01:02:03');
      assert.equal(utility.YYYYMMDDHHmmss(date, {
        dateSep: '/',
        timeSep: ';',
      }), '2014/02/14 01;02;03');
      assert.equal(utility.YYYYMMDDHHmmss(date, {
        dateSep: '/',
        timeSep: ';',
      }), '2014/02/14 01;02;03');
    });

    it('should work with timestamp', () => {
      // timezone GMT+0800
      assert.match(utility.YYYYMMDDHHmmss(new Date('2014-02-14 01:02:03'), {}), /^2014\-02\-14 01:02:03$/);
    });

    it('should return an "YYYY-MM-DD HH:mm:ss" format date string', () => {
      assert.match(utils.YYYYMMDDHHmmss(), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
      assert.match(utils.YYYYMMDDHHmmss(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 28; d++) {
          for (let h = 0; h < 24; h++) {
            const ss = parseInt(String(Math.random() * 60), 10);
            const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            const n = new Date(ds);
            assert.match(utils.YYYYMMDDHHmmss(n), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
          }
        }
      }
    });

    it('should work with custom sep', () => {
      const date = new Date('2014-02-14 01:02:03');
      assert.equal(utils.YYYYMMDDHHmmss(date, {}), '2014-02-14 01:02:03');
      assert.equal(utils.YYYYMMDDHHmmss(date, {
        dateSep: '.',
      }), '2014.02.14 01:02:03');
      assert.equal(utils.YYYYMMDDHHmmss(date, {
        dateSep: '.',
        timeSep: ';',
      }), '2014.02.14 01;02;03');
      assert.equal(utils.YYYYMMDDHHmmss(date, {
        timeSep: ';',
      }), '2014-02-14 01;02;03');
    });

    it('should work with time string', () => {
      assert.equal(utils.YYYYMMDDHHmmss('2014-02-14 01:02:03', {
        dateSep: '.',
      }), '2014.02.14 01:02:03');
    });

    it('should work with timestamp', () => {
      // timezone GMT+0800
      assert.match(utils.YYYYMMDDHHmmss(1428894236645, {}), /^2015\-04\-13 (11|03):03:56$/);
    });
  });

  describe('YYYYMMDD()', () => {
    it('YYYYMMDD() should return an "YYYY-MM-DD" format date string', () => {
      assert.match(utility.YYYYMMDD(), /^\d{4}\-\d{2}\-\d{2}$/);
      assert.match(utility.YYYYMMDD(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2}$/);
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 28; d++) {
          for (let h = 0; h < 24; h++) {
            const ss = parseInt(String(Math.random() * 60), 10);
            const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            const n = new Date(ds);
            assert.match(utility.YYYYMMDD(n), /^\d{4}\-\d{2}\-\d{2}$/);
          }
        }
      }
    });

    it('YYYYMMDD() should return an "YYYYMMDD" format date string', () => {
      assert.match(utility.YYYYMMDD(''), /^\d{4}\d{2}\d{2}$/);
      assert.match(utility.YYYYMMDD(new Date(1372062988014), ''), /^\d{4}\d{2}\d{2}$/);
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 28; d++) {
          for (let h = 0; h < 24; h++) {
            const ss = parseInt(String(Math.random() * 60), 10);
            const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            const n = new Date(ds);
            assert.match(utility.YYYYMMDD(n, ''), /^\d{4}\d{2}\d{2}$/);
          }
        }
      }
    });

    it('YYYYMMDD() should return an "YYYY-MM-DD" format date string', () => {
      assert.match(utils.YYYYMMDD(), /^\d{4}\-\d{2}\-\d{2}$/);
      assert.match(utils.YYYYMMDD(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2}$/);
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 28; d++) {
          for (let h = 0; h < 24; h++) {
            const ss = parseInt(String(Math.random() * 60), 10);
            const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            const n = new Date(ds);
            assert.match(utils.YYYYMMDD(n), /^\d{4}\-\d{2}\-\d{2}$/);
          }
        }
      }
    });

    it('YYYYMMDD() should return an "YYYYMMDD" format date string', () => {
      assert.match(utils.YYYYMMDD(''), /^\d{4}\d{2}\d{2}$/);
      assert.match(utils.YYYYMMDD(new Date(1372062988014), ''), /^\d{4}\d{2}\d{2}$/);
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 28; d++) {
          for (let h = 0; h < 24; h++) {
            const ss = parseInt(String(Math.random() * 60), 10);
            const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            const n = new Date(ds);
            assert.match(utils.YYYYMMDD(n, ''), /^\d{4}\d{2}\d{2}$/);
          }
        }
      }
    });
  });

  describe('logDate()', () => {
    it('logDate() should return an log format date string', () => {
      assert.match(utility.logDate(','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      assert.match(utility.logDate(','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      assert.match(logDate(','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      assert.match(utility.logDate(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 28; d++) {
          for (let h = 0; h < 24; h++) {
            const ss = parseInt(String(Math.random() * 60), 10);
            const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            const n = new Date(ds);
            assert.match(utility.logDate(n), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
            assert.match(utility.logDate(n, ','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
          }
        }
      }
    });

    it('logDate() should return an log format date string', () => {
      assert.match(utils.logDate(), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
      assert.match(utils.logDate(','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      assert.match(utils.logDate(null, ','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      assert.match(utils.logDate(undefined, ','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      assert.match(utils.logDate(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 28; d++) {
          for (let h = 0; h < 24; h++) {
            const ss = parseInt(String(Math.random() * 60), 10);
            const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            const n = new Date(ds);
            assert.match(utils.logDate(n), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
            assert.match(utils.logDate(n, ','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
          }
        }
      }
    });
  });

  describe('accessLogDate()', () => {
    it('accessLogDate() should return an access log format date string', () => {
      // 16/Apr/2013:16:40:09 +0800
      assert.match(utility.accessLogDate(new Date()), /^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [\+\-]\d{4}$/);
      assert.equal(moment().format('DD/MMM/YYYY:HH:mm:ss ZZ'), utility.accessLogDate(new Date()));
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 28; d++) {
          for (let h = 0; h < 24; h++) {
            const ss = parseInt(String(Math.random() * 60), 10);
            const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            const n = new Date(ds);
            assert.equal(moment(n).format('DD/MMM/YYYY:HH:mm:ss ZZ'), utility.accessLogDate(n), ds);
          }
        }
      }
    });
  });

  describe('datestruct()', () => {
    it('datestruct() should return an date struct', () => {
      const d = utility.datestruct();
      assert.equal(d.YYYYMMDD.toString(), moment().format('YYYYMMDD'));
      for (let m = 1; m <= 12; m++) {
        for (let d = 1; d <= 28; d++) {
          for (let h = 0; h < 24; h++) {
            const ss = parseInt(String(Math.random() * 60), 10);
            const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
            const n = new Date(ds);
            const struct = utility.datestruct(n);
            assert.equal(struct.YYYYMMDD.toString(), moment(n).format('YYYYMMDD'));
            assert.equal(struct.H.toString(), moment(n).format('H'));
          }
        }
      }
    });
  });

  describe('timestamp()', () => {
    it('timestamp() should return a unix timestamp', () => {
      const ts = utility.timestamp();
      assert.equal(typeof ts, 'number');
      assert(ts as number > 1378153366);
      assert.equal(String(ts).length, 10);
      assert.equal((utility.timestamp(1385091596) as Date).getTime(), 1385091596000);
      assert.equal((utility.timestamp(1385091596000) as Date).getTime(), 1385091596000);
      assert.equal((utility.timestamp('1385091596') as Date).getTime(), 1385091596000);
      assert.equal((utility.timestamp('1385091596000') as Date).getTime(), 1385091596000);
    });
  });
});
