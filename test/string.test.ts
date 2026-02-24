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
    it('should keep empty and simple strings unchanged', () => {
      assert.equal(utility.replaceInvalidHttpHeaderChar('').val, '');
      assert.equal(utility.replaceInvalidHttpHeaderChar('').invalid, false);
      assert.equal(utility.replaceInvalidHttpHeaderChar('123').val, '123');
      assert.equal(utility.replaceInvalidHttpHeaderChar('123').invalid, false);
      assert.equal(utility.replaceInvalidHttpHeaderChar('abc').val, 'abc');
      assert.equal(utility.replaceInvalidHttpHeaderChar('abc').invalid, false);
    });

    it('should keep special chars valid', () => {
      const s3 = '!@#$%^&*()_+-=\|';
      assert.equal(utility.replaceInvalidHttpHeaderChar(s3).val, s3);
      assert.equal(utility.replaceInvalidHttpHeaderChar(s3).invalid, false);
    });

    it('should replace chinese chars with default replacement', () => {
      assert.equal(utility.replaceInvalidHttpHeaderChar('你1好0').val, ' 1 0');
      assert.equal(utility.replaceInvalidHttpHeaderChar('你1好0').invalid, true);
      assert.equal(utility.replaceInvalidHttpHeaderChar('1你1好0').val, '1 1 0');
      assert.equal(utility.replaceInvalidHttpHeaderChar('1你1好0').invalid, true);
      assert.equal(utility.replaceInvalidHttpHeaderChar('11你1好0').val, '11 1 0');
      assert.equal(utility.replaceInvalidHttpHeaderChar('11你1好0').invalid, true);
    });

    it('should replace with longer prefix strings', () => {
      assert.equal(utility.replaceInvalidHttpHeaderChar('111你1好0').val, '111 1 0');
      assert.equal(utility.replaceInvalidHttpHeaderChar('111你1好0').invalid, true);
      assert.equal(utility.replaceInvalidHttpHeaderChar('1111你1好0').val, '1111 1 0');
      assert.equal(utility.replaceInvalidHttpHeaderChar('1111你1好0').invalid, true);
    });

    it('should replace with custom string replacement', () => {
      const s8 = '1111你1好0';
      assert.equal(utility.replaceInvalidHttpHeaderChar(s8, '-').val, '1111-1-0');
      assert.equal(utility.replaceInvalidHttpHeaderChar(s8, '-').invalid, true);
    });

    it('should replace with function replacement', () => {
      const s9 = '1111----你----1----好0#啊ok的123！！end';
      // Support replacement function
      const result = utility.replaceInvalidHttpHeaderChar(s9, function(val) {
        return encodeURIComponent(val);
      });
      assert.equal(result.val, '1111----%E4%BD%A0----1----%E5%A5%BD0#%E5%95%8Aok%E7%9A%84123%EF%BC%81%EF%BC%81end');
      assert.equal(decodeURIComponent(result.val), s9);
      assert.equal(result.invalid, true);
    });

    it('should handle URL with invalid chars', () => {
      const url = 'https://foo.com/abc_%E4%BD%A0%E5%A5%BD/,.handbook-%E4%BD%A0%E5%A5%BD/foo-space-special#空间管理页面-1-你好---';
      const urlResult = utility.replaceInvalidHttpHeaderChar(url, function(c) {
        return encodeURIComponent(c);
      });
      assert.equal(urlResult.val, 'https://foo.com/abc_%E4%BD%A0%E5%A5%BD/,.handbook-%E4%BD%A0%E5%A5%BD/foo-space-special#%E7%A9%BA%E9%97%B4%E7%AE%A1%E7%90%86%E9%A1%B5%E9%9D%A2-1-%E4%BD%A0%E5%A5%BD---');
      assert.equal(urlResult.invalid, true);
    });
  });

  describe('includesInvalidHttpHeaderChar()', () => {
    it('should return false for valid chars', () => {
      assert.equal(utility.includesInvalidHttpHeaderChar(''), false);
      assert.equal(utility.includesInvalidHttpHeaderChar('123'), false);
      assert.equal(utility.includesInvalidHttpHeaderChar('abc'), false);
      assert.equal(utility.includesInvalidHttpHeaderChar('!@#$%^&*()_+-=\|'), false);
    });

    it('should detect invalid chars', () => {
      assert.equal(utility.includesInvalidHttpHeaderChar('你1好0'), true);
      assert.equal(utility.includesInvalidHttpHeaderChar('1你1好0'), true);
      assert.equal(utility.includesInvalidHttpHeaderChar('11你1好0'), true);
      assert.equal(utility.includesInvalidHttpHeaderChar('111你1好0'), true);
      assert.equal(utility.includesInvalidHttpHeaderChar('1111你1好0'), true);
      assert.equal(utility.includesInvalidHttpHeaderChar('1111----你----1----好0#啊ok的123！！end'), true);
      assert.equal(utility.includesInvalidHttpHeaderChar('🚀'), true);
    });
  });
});

