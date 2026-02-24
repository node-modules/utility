export function randomString(length?: number, charSet?: string) {
  const result: string[] = [];
  length = length || 16;
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  while (length--) {
    result.push(charSet[Math.floor(Math.random() * charSet.length)]);
  }
  return result.join('');
}

/**
 * split string to array
 * @param  {String} str input string
 * @param  {String} [sep] default is ','
 */
export function split(str?: string, sep?: string) {
  str = str || '';
  sep = sep || ',';
  const needs: string[] = [];
  for (const item of str.split(sep)) {
    const s = item.trim();
    if (s.length > 0) {
      needs.push(s);
    }
  }
  return needs;
}
// keep compatibility
export const splitAlwaysOptimized = split;

type StringReplacer = (substring: string, ...args: any[]) => string;

/**
 * Replace string
 */
export function replace(str: string, substr: string | RegExp, newSubstr: string | StringReplacer) {
  if (typeof newSubstr === 'string') {
    return str.replace(substr, () => { return newSubstr; });
  }
  return str.replace(substr, newSubstr);
}

// original source https://github.com/nodejs/node/blob/v7.5.0/lib/_http_common.js#L300
/**
 * True if val contains an invalid field-vchar
 *  field-value    = *( field-content / obs-fold )
 *  field-content  = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 *  field-vchar    = VCHAR / obs-text
 *
 * checkInvalidHeaderChar() is currently designed to be inlinable by v8,
 * so take care when making changes to the implementation so that the source
 * code size does not exceed v8's default max_inlined_source_size setting.
 **/
const validHdrChars = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 48 - 63
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 112 - 127
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 128 ...
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // ... 255
];

type Replacement = (char: string) => string;

/**
 * Replace invalid http header characters with replacement
 *
 * @param {String} val input value
 * @param {String|Function} replacement - can be `function(char)`
 */
export function replaceInvalidHttpHeaderChar(val: string, replacement?: string | Replacement) {
  replacement = replacement || ' ';
  let invalid = false;

  if (!val || typeof val !== 'string') {
    return {
      val,
      invalid,
    };
  }

  let chars: string[] | undefined;
  for (let i = 0; i < val.length; ++i) {
    if (!validHdrChars[val.charCodeAt(i)]) {
      // delay create chars
      chars = chars || val.split('');
      if (typeof replacement === 'function') {
        chars[i] = replacement(chars[i]);
      } else {
        chars[i] = replacement;
      }
    }
  }

  if (chars) {
    val = chars.join('');
    invalid = true;
  }

  return {
    val,
    invalid,
  };
}

/**
 * Detect invalid http header characters in a string
 */
export function includesInvalidHttpHeaderChar(val: string) {
  if (!val || typeof val !== 'string') {
    return false;
  }

  for (let i = 0; i < val.length; ++i) {
    if (!validHdrChars[val.charCodeAt(i)]) {
      return true;
    }
  }

  return false;
}
