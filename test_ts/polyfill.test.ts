import test from 'ava';
import * as utility from '../src';

test.cb('setImmediate() should work', t => {
  let count = 0;
  utility.setImmediate(function () {
    t.is(count, 1);
    t.end();
  });
  count++;
});

test.cb('setImmediate() should pass arguments work', t => {
  let count = 0;
  utility.setImmediate(function (arg) {
    t.is(count, 1);
    t.is(arg, 2);
    t.end();
  }, 2);
  count++;
});
