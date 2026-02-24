import { strict as assert } from 'node:assert';
import * as utility from '../src/index.js';

describe('test/number.test.ts', () => {
  describe('randomString()', () => {
    it('should get random string by default', () => {
      assert.match(utility.randomString(), /^[0-9a-zA-Z]{16}$/);
    });

    it('should get number random string with a length of 16', () => {
      assert.match(utility.randomString(16, '0123456789'), /^\d{16}$/);
    });
  });

  describe('split(), splitAlwaysOptimized()', () => {
    it('should work with default sep', () => {
      assert.deepEqual(utility.split('haha, ok  ,,,,,xxx xxx ,aaa'), [ 'haha', 'ok', 'xxx xxx', 'aaa' ]);
      assert.deepEqual(utility.splitAlwaysOptimized('haha, ok  ,,,,,xxx xxx ,aaa'), [ 'haha', 'ok', 'xxx xxx', 'aaa' ]);
    });

    it('should work with sep=|', () => {
      assert.deepEqual(utility.split('haha|ok |xxx xxx|,aaa', '|'), [ 'haha', 'ok', 'xxx xxx', ',aaa' ]);
      assert.deepEqual(utility.splitAlwaysOptimized('haha|ok |xxx xxx|,aaa', '|'), [ 'haha', 'ok', 'xxx xxx', ',aaa' ]);
    });

    it('should return []', () => {
      assert.deepEqual(utility.split(',,,,'), []);
      // !!! TSError
      assert.deepEqual(utility.split(), []);

      assert.deepEqual(utility.split(null as any), []);
      assert.deepEqual(utility.split(''), []);

      assert.deepEqual(utility.splitAlwaysOptimized(',,,,'), []);
      assert.deepEqual(utility.splitAlwaysOptimized(''), []);
      assert.deepEqual(utility.splitAlwaysOptimized('', null as any), []);
      assert.deepEqual((utility as any).splitAlwaysOptimized('', null, null), []);
    });
  });

  describe('replace()', () => {
    it('should replace work with special chars', () => {
      assert.equal(utility.replace('{ <body> }', '<body>', 'this is body $& $` $\' $$'), '{ this is body $& $` $\' $$ }');
      assert.equal(utility.replace('{ <body> }', '', 'this is body $& $` $\' $$'), 'this is body $& $` $\' $${ <body> }');
      assert.equal(utility.replace('{ <body> }', 'ddd', 'this is body $& $` $\' $$'), '{ <body> }');
    });

    it('should support function', () => {
      assert.equal(utility.replace('{ <body> }', '<body>', function() {
        return 'this is body $& $` $\' $$';
      }), '{ this is body $& $` $\' $$ }');
    });

    it('should support regex', () => {
      assert.equal(utility.replace('{ <body> }', /<body>/, function() {
        return 'this is body $& $` $\' $$';
      }), '{ this is body $& $` $\' $$ }');

      assert.equal(utility.replace('{ <body> }', /<body>/, 'this is body $& $` $\' $$'), '{ this is body $& $` $\' $$ }');
    });
  });

  describe('replaceInvalidHttpHeaderChar()', () => {
    it('should replace invalid char', () => {
      const s0 = '';
      const s1 = '123';
      const s2 = 'abc';
      const s3 = '!@#$%^&*()_+-=\|';
      const s4 = '你1好0';
      const s5 = '1你1好0';
      const s6 = '11你1好0';
      const s7 = '111你1好0';
      const s8 = '1111你1好0';
      const s9 = '1111----你----1----好0#啊ok的123！！end';

      assert.equal(utility.replaceInvalidHttpHeaderChar(s0).val, s0);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s0).invalid, false);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s1).val, s1);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s1).invalid, false);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s2).val, s2);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s2).invalid, false);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s3).val, s3);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s3).invalid, false);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s4).val, ' 1 0');
      assert.equal(utility.replaceInvalidHttpHeaderChar(s4).invalid, true);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s5).val, '1 1 0');
      assert.equal(utility.replaceInvalidHttpHeaderChar(s5).invalid, true);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s6).val, '11 1 0');
      assert.equal(utility.replaceInvalidHttpHeaderChar(s6).invalid, true);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s7).val, '111 1 0');
      assert.equal(utility.replaceInvalidHttpHeaderChar(s7).invalid, true);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s8).val, '1111 1 0');
      assert.equal(utility.replaceInvalidHttpHeaderChar(s8).invalid, true);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s8, '-').val, '1111-1-0');
      assert.equal(utility.replaceInvalidHttpHeaderChar(s8, '-').invalid, true);

      // support replacement function
      const result = utility.replaceInvalidHttpHeaderChar(s9, function(val) {
        return encodeURIComponent(val);
      });
      assert.equal(result.val, '1111----%E4%BD%A0----1----%E5%A5%BD0#%E5%95%8Aok%E7%9A%84123%EF%BC%81%EF%BC%81end');
      assert.equal(decodeURIComponent(result.val), s9);
      assert.equal(result.invalid, true);

      const url = 'https://foo.com/abc_%E4%BD%A0%E5%A5%BD/,.handbook-%E4%BD%A0%E5%A5%BD/foo-space-special#空间管理页面-1-你好---';
      const urlResult = utility.replaceInvalidHttpHeaderChar(url, function(c) {
        return encodeURIComponent(c);
      });
      assert.equal(urlResult.val, 'https://foo.com/abc_%E4%BD%A0%E5%A5%BD/,.handbook-%E4%BD%A0%E5%A5%BD/foo-space-special#%E7%A9%BA%E9%97%B4%E7%AE%A1%E7%90%86%E9%A1%B5%E9%9D%A2-1-%E4%BD%A0%E5%A5%BD---');
      assert.equal(urlResult.invalid, true);
    });
  });

  describe('includesInvalidHttpHeaderChar()', () => {
    it('should detect invalid chars', () => {
      const s0 = '';
      const s1 = '123';
      const s2 = 'abc';
      const s3 = '!@#$%^&*()_+-=\|';
      const s4 = '你1好0';
      const s5 = '1你1好0';
      const s6 = '11你1好0';
      const s7 = '111你1好0';
      const s8 = '1111你1好0';
      const s9 = '1111----你----1----好0#啊ok的123！！end';
      const s10 = '🚀';

      assert.equal(utility.includesInvalidHttpHeaderChar(s0), false);
      assert.equal(utility.includesInvalidHttpHeaderChar(s1), false);
      assert.equal(utility.includesInvalidHttpHeaderChar(s2), false);
      assert.equal(utility.includesInvalidHttpHeaderChar(s3), false);
      assert.equal(utility.includesInvalidHttpHeaderChar(s4), true);
      assert.equal(utility.includesInvalidHttpHeaderChar(s5), true);
      assert.equal(utility.includesInvalidHttpHeaderChar(s6), true);
      assert.equal(utility.includesInvalidHttpHeaderChar(s7), true);
      assert.equal(utility.includesInvalidHttpHeaderChar(s8), true);
      assert.equal(utility.includesInvalidHttpHeaderChar(s9), true);
      assert.equal(utility.includesInvalidHttpHeaderChar(s10), true);
    });
  });
});

