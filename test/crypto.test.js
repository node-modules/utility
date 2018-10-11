'use strict';

import test from 'ava';
import utils from '../';

test('md5() should return md5 string', t => {
  t.is(utils.md5('mk2'), 'a683090976ec0f04dca81f6db9ca7484');
  t.is(utils.md5(Buffer.from('')), 'd41d8cd98f00b204e9800998ecf8427e');
  t.is(utils.md5(Buffer.from('')), utils.md5(''));
  t.is(utils.md5('苏千'), '5f733c47c58a077d61257102b2d44481');
  t.is(utils.md5(Buffer.from('苏千')), '5f733c47c58a077d61257102b2d44481');
  t.is(utils.md5('苏千', 'base64'), 'X3M8R8WKB31hJXECstREgQ==');
  t.is(utils.md5('123', 'base64'), 'ICy5YqxZB1uWSwcVLSNLcA==');
  t.is(utils.md5('', 'base64'), '1B2M2Y8AsgTpgAmY7PhCfg==');
  t.is(utils.md5({foo: 'bar', bar: 'foo'}), '63a9d72936c6f7366fa5e72fa0cac8b4');
  t.is(utils.md5({foo: 'bar', bar: 'foo'}), utils.md5({bar: 'foo', foo: 'bar'}));
  t.is(utils.md5({foo: 'bar', bar: 'foo', v: [1, 2, 3]}), utils.md5({v: [1, 2, 3], bar: 'foo', foo: 'bar'}));
  t.is(utils.md5({foo: 'bar', bar: 'foo', args: {age: 1, name: 'foo'}, args2: {haha:'哈哈', bi: 'boo'}, v: [1, 2, 3]}),
    utils.md5({v: [1, 2, 3], bar: 'foo', foo: 'bar', args2: {bi: 'boo', haha:'哈哈'}, args: {name: 'foo', age: 1}}));
});

test('sha1() should return sha1 string', t => {
  t.is(utils.sha1('mk2'), '0b1765f5e21e9d8a6da828ee59ce159c7d1a733e');
  t.is(utils.sha1(Buffer.from('')), 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
  t.is(utils.sha1(Buffer.from('')), utils.sha1(''));
  t.is(utils.sha1('苏千'), '0a4aff6bab634b9c2f99b71f25e976921fcde5a5');
  t.is(utils.sha1(Buffer.from('苏千')), '0a4aff6bab634b9c2f99b71f25e976921fcde5a5');
  t.is(utils.sha1('苏千', 'base64'), 'Ckr/a6tjS5wvmbcfJel2kh/N5aU=');
  t.is(utils.sha1('123', 'base64'), 'QL0AFWMIX8NRZTKeof9cXsvbvu8=');
  t.is(utils.sha1('', 'base64'), '2jmj7l5rSw0yVb/vlWAYkK/YBwk=');

  t.is(utils.sha1({foo: 'bar', bar: 'foo'}), '91bb58051ed80d841941730c1f1399c9e0d8701b');
  t.is(utils.sha1({foo: 'bar', bar: 'foo'}), utils.sha1({bar: 'foo', foo: 'bar'}));
  t.is(utils.sha1({foo: 'bar', bar: 'foo', v: [1, 2, 3]}), utils.sha1({v: [1, 2, 3], bar: 'foo', foo: 'bar'}));
  t.is(utils.sha1({foo: 'bar', bar: 'foo', args: {age: 1, name: 'foo'},
    args2: {haha:'哈哈', bi: 'boo'}, v: [1, 2, 3]}),
    utils.sha1({v: [1, 2, 3], bar: 'foo', foo: 'bar',
      args2: {bi: 'boo', haha:'哈哈'}, args: {name: 'foo', age: 1}}));
});

test('sha256() should return sha256 hex string', t => {
  t.is(utils.sha256(''), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  t.is(utils.sha256('123'), 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
  t.is(utils.sha256('哈哈中文'), '0f9d15321510b57fc25b712de846c59cc541de89d47fcd06f6bfe1cd5ff2d7e3');
  t.is(utils.sha256(Buffer.from('')), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  t.is(utils.sha256(Buffer.from('123')), 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
  t.is(utils.sha256(Buffer.from('哈哈中文')), '0f9d15321510b57fc25b712de846c59cc541de89d47fcd06f6bfe1cd5ff2d7e3');
  t.is(utils.sha256(Buffer.from('@Python发烧友')), '80ddd84d1453c994af764bf558c4b96adaced9dd8d7d2194705fe58e1b3162df');
  t.is(utils.sha256(Buffer.from('苏千')), '75dd03e3fcdbba7d5bec07900bae740cc8e361d77e7df8949de421d3df5d3635');
});

test('hmac() should return hmac-sha1', t => {
  // $ echo -n "hello world" | openssl dgst -binary -sha1 -hmac "I am a key" | openssl base64
  // > pO6J0LKDxRRkvSECSEdxwKx84L0=
  t.is(utils.hmac('sha1', 'I am a key', 'hello world'), 'pO6J0LKDxRRkvSECSEdxwKx84L0=');
  // $ echo -n "中文，你好" | openssl dgst -binary -sha1 -hmac "I am a key" | openssl base64
  // > 4Vnqz+LV0qMMt/a81E+EURcQMrI=
  t.is(utils.hmac('sha1', 'I am a key', '中文，你好', 'base64'), '4Vnqz+LV0qMMt/a81E+EURcQMrI=');

  // should work with buffer data
  t.is(utils.hmac('sha1', 'I am a key', '中文，你好'), utils.hmac('sha1', 'I am a key', Buffer.from('中文，你好')));
});

test('base64encode(), base64decode() should encode and decode', t => {
  const text = utils.base64encode('哈哈中文 ok', true);
  const buf = utils.base64decode(text, true, 'buffer');
  t.true(Buffer.isBuffer(buf));
  t.is(buf.toString(), utils.base64decode(text, true));
  t.is(buf.toString(), utils.base64decode(text, true, 'utf8'));
});
