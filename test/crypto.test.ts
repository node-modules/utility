import { strict as assert } from 'node:assert';
import * as utility from '../src/index.js';
import { md5 } from '../src/index.js';

describe('test/crypto.test.ts', () => {
  describe('md5()', () => {
    it('should return md5 string', () => {
      assert.equal(utility.md5('mk2'), 'a683090976ec0f04dca81f6db9ca7484');
      assert.equal(utility.md5(Buffer.from('')), 'd41d8cd98f00b204e9800998ecf8427e');
      assert.equal(utility.md5(Buffer.from('')), utility.md5(''));
      assert.equal(utility.md5('zhaoyang_duan'), 'b5ff61890cb5b27e3fd9e396e32fccc3');
      assert.equal(utility.md5(Buffer.from('zhaoyang_duan')), 'b5ff61890cb5b27e3fd9e396e32fccc3');
      assert.equal(utility.md5('zhaoyang_duan', 'base64'), 'tf9hiQy1sn4/2eOW4y/Mww==');
      assert.equal(utility.md5('123', 'base64'), 'ICy5YqxZB1uWSwcVLSNLcA==');
      assert.equal(utility.md5('', 'base64'), '1B2M2Y8AsgTpgAmY7PhCfg==');
      assert.equal(utility.md5({ foo: 'bar', bar: 'foo' }), '63a9d72936c6f7366fa5e72fa0cac8b4');
      assert.equal(utility.md5({ foo: 'bar', bar: 'foo' }), utility.md5({ bar: 'foo', foo: 'bar' }));
      assert.equal(utility.md5({ foo: 'bar', bar: 'foo', v: [ 1, 2, 3 ] }), utility.md5({ v: [ 1, 2, 3 ], bar: 'foo', foo: 'bar' }));
      assert.equal(utility.md5({ foo: 'bar', bar: 'foo', args: { age: 1, name: 'foo' }, args2: { haha: '哈哈', bi: 'boo' }, v: [ 1, 2, 3 ] }),
        utility.md5({ v: [ 1, 2, 3 ], bar: 'foo', foo: 'bar', args2: { bi: 'boo', haha: '哈哈' }, args: { name: 'foo', age: 1 } }));
    });

    it('should work on utf-8 string', () => {
      assert.equal(md5('mk2'), 'a683090976ec0f04dca81f6db9ca7484');
      assert.equal(md5(Buffer.from('')), 'd41d8cd98f00b204e9800998ecf8427e');
      assert.equal(md5(Buffer.from('')), md5(''));
      assert.equal(md5('苏千'), '5f733c47c58a077d61257102b2d44481');
      assert.equal(md5(Buffer.from('苏千')), '5f733c47c58a077d61257102b2d44481');
      assert.equal(md5('苏千', 'base64'), 'X3M8R8WKB31hJXECstREgQ==');
      assert.equal(md5('123', 'base64'), 'ICy5YqxZB1uWSwcVLSNLcA==');
      assert.equal(md5('', 'base64'), '1B2M2Y8AsgTpgAmY7PhCfg==');
      assert.equal(md5({ foo: 'bar', bar: 'foo' }), '63a9d72936c6f7366fa5e72fa0cac8b4');
      assert.equal(md5({ foo: 'bar', bar: 'foo' }), md5({ bar: 'foo', foo: 'bar' }));
      assert.equal(md5({ foo: 'bar', bar: 'foo', v: [ 1, 2, 3 ] }), md5({ v: [ 1, 2, 3 ], bar: 'foo', foo: 'bar' }));
      assert.equal(md5({ foo: 'bar', bar: 'foo', args: { age: 1, name: 'foo' }, args2: { haha: '哈哈', bi: 'boo' }, v: [ 1, 2, 3 ] }),
        md5({ v: [ 1, 2, 3 ], bar: 'foo', foo: 'bar', args2: { bi: 'boo', haha: '哈哈' }, args: { name: 'foo', age: 1 } }));
    });

    it('should work on ArrayBuffer, TypedArray, DateView', () => {
      const nodeBuffer = Buffer.from('中文');
      const arrayBuffer = nodeBuffer.buffer.slice(nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.length);
      const uintBytes = new Uint8Array(nodeBuffer.length);
      for (let i = 0; i < nodeBuffer.byteLength; ++i) {
        uintBytes[i] = nodeBuffer[i];
      }
      const dataview = new DataView(arrayBuffer);
      assert.equal(md5(nodeBuffer), 'a7bac2239fcdcb3a067903d8077c4a07');
      assert.equal(md5(arrayBuffer), 'a7bac2239fcdcb3a067903d8077c4a07', 'ArrayBuffer md5 invalid');
      assert.equal(md5(dataview), 'a7bac2239fcdcb3a067903d8077c4a07', 'DataView md5 invalid');
      assert.equal(md5(uintBytes), 'a7bac2239fcdcb3a067903d8077c4a07', 'Int32Array md5 invalid');
    });
  });

  describe('sha1()', () => {
    it('should return sha1 string', () => {
      assert.equal(utility.sha1('mk2'), '0b1765f5e21e9d8a6da828ee59ce159c7d1a733e');
      assert.equal(utility.sha1(Buffer.from('')), 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
      assert.equal(utility.sha1(Buffer.from('')), utility.sha1(''));
      assert.equal(utility.sha1('苏千'), '0a4aff6bab634b9c2f99b71f25e976921fcde5a5');
      assert.equal(utility.sha1(Buffer.from('苏千')), '0a4aff6bab634b9c2f99b71f25e976921fcde5a5');
      assert.equal(utility.sha1('苏千', 'base64'), 'Ckr/a6tjS5wvmbcfJel2kh/N5aU=');
      assert.equal(utility.sha1('123', 'base64'), 'QL0AFWMIX8NRZTKeof9cXsvbvu8=');
      assert.equal(utility.sha1('', 'base64'), '2jmj7l5rSw0yVb/vlWAYkK/YBwk=');

      assert.equal(utility.sha1({ foo: 'bar', bar: 'foo' }), '91bb58051ed80d841941730c1f1399c9e0d8701b');
      assert.equal(utility.sha1({ foo: 'bar', bar: 'foo' }), utility.sha1({ bar: 'foo', foo: 'bar' }));
      assert.equal(utility.sha1({ foo: 'bar', bar: 'foo', v: [ 1, 2, 3 ] }), utility.sha1({ v: [ 1, 2, 3 ], bar: 'foo', foo: 'bar' }));
      assert.equal(utility.sha1({ foo: 'bar', bar: 'foo', args: { age: 1, name: 'foo' },
        args2: { haha: '哈哈', bi: 'boo' }, v: [ 1, 2, 3 ] }),
      utility.sha1({ v: [ 1, 2, 3 ], bar: 'foo', foo: 'bar',
        args2: { bi: 'boo', haha: '哈哈' }, args: { name: 'foo', age: 1 } }));
    });
  });

  describe('sha256()', () => {
    it('should return sha256 hex string', () => {
      assert.equal(utility.sha256(''), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
      assert.equal(utility.sha256('123'), 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
      assert.equal(utility.sha256('哈哈中文'), '0f9d15321510b57fc25b712de846c59cc541de89d47fcd06f6bfe1cd5ff2d7e3');
      assert.equal(utility.sha256(Buffer.from('')), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
      assert.equal(utility.sha256(Buffer.from('123')), 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
      assert.equal(utility.sha256(Buffer.from('哈哈中文')), '0f9d15321510b57fc25b712de846c59cc541de89d47fcd06f6bfe1cd5ff2d7e3');
      assert.equal(utility.sha256(Buffer.from('@Python发烧友')), '80ddd84d1453c994af764bf558c4b96adaced9dd8d7d2194705fe58e1b3162df');
      assert.equal(utility.sha256(Buffer.from('苏千')), '75dd03e3fcdbba7d5bec07900bae740cc8e361d77e7df8949de421d3df5d3635');
    });
  });

  describe('sha512()', () => {
    it('should return sha512 hex string', () => {
      assert.equal(utility.sha512(''), 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e');
      assert.equal(utility.sha512('123'), '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');
      assert.equal(utility.sha512('哈哈中文'), '648c07b8103f2c9600163fccccdb0268fd98e0aedf002d0a29b270190d0d3ad44ca9484f8a11711672abe704e97f26b55e3a090a1969aeba052b9b783c4eff6c');
      assert.equal(utility.sha512(Buffer.from('')), 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e');
      assert.equal(utility.sha512(Buffer.from('123')), '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');
      assert.equal(utility.sha512(Buffer.from('哈哈中文')), '648c07b8103f2c9600163fccccdb0268fd98e0aedf002d0a29b270190d0d3ad44ca9484f8a11711672abe704e97f26b55e3a090a1969aeba052b9b783c4eff6c');
      assert.equal(utility.sha512(Buffer.from('@Python发烧友')), 'e387db347ab42a7e44aebc8f165e0b6e42941692efa38fa82d0bea6844cf80d060fa3df7c9eafc2accecca436a6c3fa905920d130b6e1cc8f5a80f1a514f358f');
      assert.equal(utility.sha512(Buffer.from('苏千')), '913e9b219f70541725a6ed721b42ae88e79f7ea1c7aec53be80ab277d4704b556df265cc4235f942f9dfbbbbd88e02ba2e18f60b217853835aeb362fb1830016');
    });
  });

  describe('hmac()', () => {
    it('should return hmac-sha1', () => {
      // $ echo -n "hello world" | openssl dgst -binary -sha1 -hmac "I am a key" | openssl base64
      // > pO6J0LKDxRRkvSECSEdxwKx84L0=
      assert.equal(utility.hmac('sha1', 'I am a key', 'hello world'), 'pO6J0LKDxRRkvSECSEdxwKx84L0=');
      // $ echo -n "中文，你好" | openssl dgst -binary -sha1 -hmac "I am a key" | openssl base64
      // > 4Vnqz+LV0qMMt/a81E+EURcQMrI=
      assert.equal(utility.hmac('sha1', 'I am a key', '中文，你好', 'base64'), '4Vnqz+LV0qMMt/a81E+EURcQMrI=');

      // should work with buffer data
      assert.equal(utility.hmac('sha1', 'I am a key', '中文，你好'), utility.hmac('sha1', 'I am a key', Buffer.from('中文，你好')));
    });
  });

  describe('base64encode(), base64decode()', () => {
    it('should encode and decode', () => {
      const text = utility.base64encode('哈哈中文 ok', true);
      const buf = utility.base64decode(text, true, 'buffer');
      assert(Buffer.isBuffer(buf));
      assert.equal(buf.toString(), utility.base64decode(text, true));
      assert.equal(buf.toString(), utility.base64decode(text, true, 'utf8'));
    });

    it('base64encode() and base64decode() should return base64 encode string', () => {
      // eslint-disable-next-line no-multi-str
      const s = '你好￥啊!@#)(_ +/\/\\\
""\u0063  / 认购渣打银行代客境外理财全球基金系 列产品,同品牌基金转换0收费. \
len1 YQ a\
len2 YWE aa\
len3 YWFh aaa\
no_padding YWJj abc\
padding YQ a\
hyphen fn5- ~~~\
underscore Pz8_ ???\
# this should fail and print out\
on_purpose_failure YQ b\
Encode string s using a URL-safe alphabet, which substitutes - instead of + and _ instead of / in the standard Base64 alphabet. The result can still contain =.';
      const expect = '5L2g5aW977+l5ZWKIUAjKShfICsvL1wiImMgIC8g6K6k6LSt5rij5omT6ZO26KGM5Luj5a6i5aKD5aSW55CG6LSi5YWo55CD5Z+66YeR57O7IOWIl+S6p+WTgSzlkIzlk4HniYzln7rph5HovazmjaIw5pS26LS5LiBsZW4xIFlRIGFsZW4yIFlXRSBhYWxlbjMgWVdGaCBhYWFub19wYWRkaW5nIFlXSmogYWJjcGFkZGluZyBZUSBhaHlwaGVuIGZuNS0gfn5+dW5kZXJzY29yZSBQejhfID8/PyMgdGhpcyBzaG91bGQgZmFpbCBhbmQgcHJpbnQgb3V0b25fcHVycG9zZV9mYWlsdXJlIFlRIGJFbmNvZGUgc3RyaW5nIHMgdXNpbmcgYSBVUkwtc2FmZSBhbHBoYWJldCwgd2hpY2ggc3Vic3RpdHV0ZXMgLSBpbnN0ZWFkIG9mICsgYW5kIF8gaW5zdGVhZCBvZiAvIGluIHRoZSBzdGFuZGFyZCBCYXNlNjQgYWxwaGFiZXQuIFRoZSByZXN1bHQgY2FuIHN0aWxsIGNvbnRhaW4gPS4=';
      assert.equal(utility.base64encode(s), expect);
      assert.equal(utility.base64encode(Buffer.from(s)), expect);
      assert.equal(utility.base64decode(expect), s);

      assert.equal(utility.base64decode(utility.base64encode(s)), s);
      assert.match(utility.base64encode(s), /\+/);
      assert.match(utility.base64encode(s), /\//);

      // urlSafe
      assert.equal(utility.base64decode(utility.base64encode(s, true), true), s);
      assert.match(utility.base64encode(s, true), /[^+]/);
      assert.match(utility.base64encode(s, true), /[^\/]/);
    });
  });
});
