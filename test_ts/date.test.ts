import test from 'ava';
import * as moment from 'moment';
import * as utility from '../';

test('YYYYMMDDHHmmss() should return an "YYYY-MM-DD HH:mm:ss" format date string', t => {

  // !!! TSError
  // t.regex(utility.YYYYMMDDHHmmss(), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);

  t.regex(utility.YYYYMMDDHHmmss(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(String(Math.random() * 60), 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        t.regex(utility.YYYYMMDDHHmmss(n), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/);
      }
    }
  }
});

test('YYYYMMDDHHmmss() should work with custom sep', t => {
  const date = new Date('2014-02-14 01:02:03') as Date;

  t.is(utility.YYYYMMDDHHmmss(date, {}), '2014-02-14 01:02:03');
  t.is(utility.YYYYMMDDHHmmss(date, {
    dateSep: '/',
    timeSep: ';',
  }), '2014/02/14 01;02;03');
  t.is(utility.YYYYMMDDHHmmss(date, {
    dateSep: '/',
    timeSep: ';'
  }), '2014/02/14 01;02;03');
});

test('YYYYMMDDHHmmss() should work with timestamp', t => {
  // timezone GMT+0800
  t.regex(utility.YYYYMMDDHHmmss(new Date('2014-02-14 01:02:03'), {}), /^2014\-02\-14 01:02:03$/);
});

test('YYYYMMDD() should return an "YYYY-MM-DD" format date string', t => {

  // ! TSError
  // t.regex(utility.YYYYMMDD(), /^\d{4}\-\d{2}\-\d{2}$/);

  t.regex(utility.YYYYMMDD(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2}$/);
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(String(Math.random() * 60), 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        t.regex(utility.YYYYMMDD(n), /^\d{4}\-\d{2}\-\d{2}$/);
      }
    }
  }
});

test('YYYYMMDD() should return an "YYYYMMDD" format date string', t => {
  t.regex(utility.YYYYMMDD(''), /^\d{4}\d{2}\d{2}$/);
  t.regex(utility.YYYYMMDD(new Date(1372062988014), ''), /^\d{4}\d{2}\d{2}$/);
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(String(Math.random() * 60), 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        t.regex(utility.YYYYMMDD(n, ''), /^\d{4}\d{2}\d{2}$/);
      }
    }
  }
});


test('logDate() should return an log format date string', t => {

  // !!! TSError
  // t.regex(utility.logDate(), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
  // t.regex(utility.logDate(null, ','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);

  t.regex(utility.logDate(','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
  t.regex(utility.logDate(new Date(1372062988014)), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(String(Math.random() * 60), 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        t.regex(utility.logDate(n), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
        t.regex(utility.logDate(n, ','), /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}$/);
      }
    }
  }
});


test('accessLogDate() should return an access log format date string', t => {
  // 16/Apr/2013:16:40:09 +0800

  // !!! TSError
  t.regex(utility.accessLogDate(new Date()), /^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [\+\-]\d{4}$/);
  t.is(moment().format('DD/MMM/YYYY:HH:mm:ss ZZ'), utility.accessLogDate(new Date()));
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(String(Math.random() * 60), 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        t.is(moment(n).format('DD/MMM/YYYY:HH:mm:ss ZZ'), utility.accessLogDate(n), ds);
      }
    }
  }
});


test('datestruct() should return an date struct', t => {
  const d = utility.datestruct();
  t.is(d.YYYYMMDD.toString(), moment().format('YYYYMMDD'));
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      for (let h = 0; h < 24; h++) {
        const ss = parseInt(String(Math.random() * 60), 10);
        const ds = '2013-' + m + '-' + d + ' ' + h + ':' + ss + ':' + ss;
        const n = new Date(ds);
        const struct = utility.datestruct(n);
        t.is(struct.YYYYMMDD.toString(), moment(n).format('YYYYMMDD'));
        t.is(struct.H.toString(), moment(n).format('H'));
      }
    }
  }
});


test('timestamp() should return a unix timestamp', t => {
  const ts = utility.timestamp();
  t.is(typeof ts, 'number');
  t.true(ts as any > 1378153366);
  t.is(String(ts).length, 10);

  t.is((utility.timestamp(1385091596) as Date).getTime(), 1385091596000);
  t.is((utility.timestamp(1385091596000) as Date).getTime(), 1385091596000);
  t.is((utility.timestamp('1385091596') as Date).getTime(), 1385091596000);
  t.is((utility.timestamp('1385091596000') as Date).getTime(), 1385091596000);
});

