import test from 'ava';
import * as utility from '../';


test('md5() should return md5 string', (t)=> {
  t.is(utility.md5('mk2'), 'a683090976ec0f04dca81f6db9ca7484');
  t.is(utility.md5(new Buffer('')), 'd41d8cd98f00b204e9800998ecf8427e');
  t.is(utility.md5(new Buffer('')), utility.md5(''));
  t.is(utility.md5('zhaoyang_duan'), '5f733c47c58a077d61257102b2d44481');
  t.is(utility.md5(new Buffer('zhaoyang_duan')), '5f733c47c58a077d61257102b2d44481');
  t.is(utility.md5('zhaoyang_duan', 'base64'), 'X3M8R8WKB31hJXECstREgQ==');
  t.is(utility.md5('123', 'base64'), 'ICy5YqxZB1uWSwcVLSNLcA==');
  t.is(utility.md5('', 'base64'), '1B2M2Y8AsgTpgAmY7PhCfg==');


  // !!! TS: ERROR
/*
  t.is(utility.md5({foo: 'bar', bar: 'foo'}), '63a9d72936c6f7366fa5e72fa0cac8b4');
  t.is(utility.md5({foo: 'bar', bar: 'foo'}), utility.md5({bar: 'foo', foo: 'bar'}));
  t.is(utility.md5({foo: 'bar', bar: 'foo', v: [1, 2, 3]}), utility.md5({v: [1, 2, 3], bar: 'foo', foo: 'bar'}));
  t.is(utility.md5({foo: 'bar', bar: 'foo', args: {age: 1, name: 'foo'}, args2: {haha:'哈哈', bi: 'boo'}, v: [1, 2, 3]}),
    utility.md5({v: [1, 2, 3], bar: 'foo', foo: 'bar', args2: {bi: 'boo', haha:'哈哈'}, args: {name: 'foo', age: 1}})); */
});
