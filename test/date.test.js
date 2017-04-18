'use strict';

import moment from 'moment';
import test from 'ava';
import utils from '../';

test('YYYYMMDDHHmmss() should return an "YYYY-MM-DD HH:mm:ss" format date string', t => {
  t.regex(utils.YYYYMMDDHHmmss(), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
  t.regex(utils.YYYYMMDDHHmmss(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(Math.random() * 60, 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        t.regex(utils.YYYYMMDDHHmmss(n), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
      }
    }
  }
});

test('YYYYMMDDHHmmss() should work with custom sep', t => {
  const date = new Date('2014-02-14 01:02:03');
  t.is(utils.YYYYMMDDHHmmss(date, {}), '2014-02-14 01:02:03');
  t.is(utils.YYYYMMDDHHmmss(date, {
    dateSep: '.'
  }), '2014.02.14 01:02:03');
  t.is(utils.YYYYMMDDHHmmss(date, {
    dateSep: '.',
    timeSep: ';'
  }), '2014.02.14 01;02;03');
  t.is(utils.YYYYMMDDHHmmss(date, {
    timeSep: ';'
  }), '2014-02-14 01;02;03');
});

test('YYYYMMDDHHmmss() should work with time string', t => {
  t.is(utils.YYYYMMDDHHmmss('2014-02-14 01:02:03', {
    dateSep: '.'
  }), '2014.02.14 01:02:03');
});


test('YYYYMMDDHHmmss() should work with timestamp', t => {
  // timezone GMT+0800
  t.regex(utils.YYYYMMDDHHmmss(1428894236645, {}), /^2015\-04\-13 (11|03):03:56$/);
});

test('YYYYMMDD() should return an "YYYY-MM-DD" format date string', t => {
  t.regex(utils.YYYYMMDD(), /^\d{4}\-\d{2}\-\d{2}$/);
  t.regex(utils.YYYYMMDD(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2}$/);
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(Math.random() * 60, 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        t.regex(utils.YYYYMMDD(n), /^\d{4}\-\d{2}\-\d{2}$/);
      }
    }
  }
});

test('YYYYMMDD() should return an "YYYYMMDD" format date string', t => {
  t.regex(utils.YYYYMMDD(''), /^\d{4}\d{2}\d{2}$/);
  t.regex(utils.YYYYMMDD(new Date(1372062988014), ''), /^\d{4}\d{2}\d{2}$/);
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(Math.random() * 60, 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        t.regex(utils.YYYYMMDD(n, ''), /^\d{4}\d{2}\d{2}$/);
      }
    }
  }
});

test('logDate() should return an log format date string', t => {
  t.regex(utils.logDate(), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
  t.regex(utils.logDate(','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
  t.regex(utils.logDate(null, ','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
  t.regex(utils.logDate(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(Math.random() * 60, 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        t.regex(utils.logDate(n), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
        t.regex(utils.logDate(n, ','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      }
    }
  }
});

test('accessLogDate() should return an access log format date string', t => {
  // 16/Apr/2013:16:40:09 +0800
  t.regex(utils.accessLogDate(), /^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [\+\-]\d{4}$/);
  t.is(moment().format('DD/MMM/YYYY:HH:mm:ss ZZ'), utils.accessLogDate());
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(Math.random() * 60, 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        t.is(moment(n).format('DD/MMM/YYYY:HH:mm:ss ZZ'), utils.accessLogDate(n));
      }
    }
  }
});

test('datestruct() should return an date struct', t => {
  const d = utils.datestruct();
  t.is(d.YYYYMMDD.toString(), moment().format('YYYYMMDD'));
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(Math.random() * 60, 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        const struct = utils.datestruct(n);
        t.is(struct.YYYYMMDD.toString(), moment(n).format('YYYYMMDD'));
        t.is(struct.H.toString(), moment(n).format('H'));
      }
    }
  }
});

test('timestamp() should return a unix timestamp', t => {
  const ts = utils.timestamp();
  t.is(typeof ts, 'number');
  t.true(ts > 1378153366);
  t.is(String(ts).length, 10);

  t.is(utils.timestamp(1385091596).getTime(), 1385091596000);
  t.is(utils.timestamp('1385091596').getTime(), 1385091596000);
  t.is(utils.timestamp(1385091596000).getTime(), 1385091596000);
  t.is(utils.timestamp('1385091596000').getTime(), 1385091596000);
});
