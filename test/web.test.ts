/* eslint-disable no-multi-str */
import { strict as assert } from 'node:assert';
import * as utility from '../src/index.js';
import { escape } from '../src/index.js';

describe('test/web.test.ts', () => {
  describe('escape()', () => {
    it('escape() should return html safe string', () => {
      const safe = '&lt;script src=&quot;foo.js&quot;&gt;&quot;&quot;&quot;&lt;/script&gt;&#39;&quot;&quot;&quot;\
      $ &amp; &amp;amp; &amp;&amp; &amp;&amp;nbsp;\
      ';
      const unsafe = '<script src="foo.js">"""</script>\'"""\
      $ & &amp; && &&nbsp;\
      ';
      assert.equal(escape(unsafe), safe);
    });
  });

  describe('escape()', () => {
    it('unescape() should return html unsafe string', () => {
      const safe = '&lt;script src=&quot;foo.js&quot;&gt;&quot;&quot;&quot;&lt;/script&gt;&#39;&quot;&quot;&quot;\
      $ &amp; &amp;amp; &amp;&amp; &amp;&amp;nbsp;\
      ';
      const unsafe = '<script src="foo.js">"""</script>\'"""\
      $ & &amp; && &&nbsp;\
      ';
      assert.equal(utility.unescape(safe), unsafe);
    });
  });

  describe('encodeURIComponent(), decodeURIComponent()', () => {
    it('should encode and decode success', () => {
      const texts = [
        'foo', '中文', '数字',
        '%',
        String.fromCharCode(0xDFFF), // http://cnodejs.org/topic/4fd6b7ba839e1e581407aac8
        123, 0, 1, Math.pow(2, 53),
        null, undefined,
        Buffer.from('中文水电费'), Buffer.alloc(100),
      ];
      texts.forEach(text => {
        if (typeof text === 'string') {
          assert.equal(utility.decodeURIComponent(utility.encodeURIComponent(text)), text);
        } else {
          assert.equal(utility.decodeURIComponent(utility.encodeURIComponent(text as any)), String(text));
        }
      });
    });

    it('should return source string when decode error', () => {
      assert.equal(utility.decodeURIComponent('%'), '%');
    });
  });
});

