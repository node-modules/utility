/**
 * Copyright(c) node-modules and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.com)
 */

'use strict';

/**
 * Module dependencies.
 */

import test from 'ava';
import utils from '../';

test.cb('setImmediate() should work', t => {
  let count = 0;
  utils.setImmediate(function () {
    t.is(count, 1);
    t.end();
  });
  count++;
});

test.cb('setImmediate() should pass arguments work', t => {
  let count = 0;
  utils.setImmediate(function (arg) {
    t.is(count, 1);
    t.is(arg, 2);
    t.end();
  }, 2);
  count++;
});
