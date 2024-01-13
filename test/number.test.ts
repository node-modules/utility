import { strict as assert } from 'node:assert';
import * as utility from '../src/index.js';
import { toSafeNumber } from '../src/index.js';

describe('test/number.test.ts', () => {
  describe('isSafeNumberString(), toSafeNumber()', () => {
    it('should detect number string success', () => {
      const numbers = [
        // str, safe or not
        [ String(utility.MAX_SAFE_INTEGER), true ],
        [ String(utility.MIN_SAFE_INTEGER), true ],
        [ String(utility.MAX_SAFE_INTEGER + 10), false ],
        [ String(utility.MIN_SAFE_INTEGER - 10), false ],
        [ '9007199254740991', true ],
        [ '-9007199254740991', true ],
        [ '9007199254740992', false ],
        [ '-9007199254740992', false ],
        [ '9007199254740993', false ],
        [ '-9007199254740993', false ],
        [ '9007199254740992123', false ],
        [ '18014398509481984', false ],
        [ '2251799813685248', true ],
        [ '-2251799813685248', true ],
        [ '-9007199254740992', false ],
        [ '-9007199254740990', true ],
        [ '90071992547409', true ],
        [ '-2251799813685248', true ],
        [ '0', true ],
        [ '1', true ],
        [ '-1', true ],
        [ '1000000', true ],
        [ '-10000000000', true ],
      ];
      numbers.forEach(item => {
        assert.equal(utility.isSafeNumberString(item[0] as string), item[1]);
        if (item[1]) {
          assert.equal(utility.toSafeNumber(item[0] as string), Number(item[0]));
        } else {
          assert.equal(toSafeNumber(item[0] as string), item[0] as string);
        }
      });
    });

    it('should convert number to number work', () => {
      assert.equal(utility.toSafeNumber(123), 123);
      assert.equal(utility.toSafeNumber(9007199254740992), 9007199254740992);
    });
  });

  describe('random()', () => {
    it('random() should return zero when no arguments are given', () => {
      assert.equal(utility.random(), 0);
    });

    it('random(max) should return an integer between `0` and `max`', () => {
      const numbers = [ 100, 5, 5.6, 1000 ];
      numbers.forEach(num => {
        const int = utility.random(num);
        assert(int >= 0);
        assert(int < num);
      });
    });

    it('random(min, max) should return an integer between `min` and `max`', () => {
      const cases = [
        [ 0, 100 ],
        [ 5, 10 ],
        [ -5, 5 ],
        [ 10000, 100000 ],
      ];
      cases.forEach(item => {
        const int = utility.random(item[0], item[1]);
        assert(int >= item[0]);
        assert(int < item[1]);
      });
    });

    it('random(max, min) should return an integer between `min` and `max`', () => {
      const cases = [
        [ 100, 0 ],
        [ 10, 5 ],
        [ 5, -5 ],
        [ 100000, 10000 ],
      ];
      cases.forEach(item => {
        const int = utility.random(item[0], item[1]);
        assert(int >= item[1]);
        assert(int < item[0]);
      });
    });
  });
});

