export function randomString(length = 16, charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
  const result: string[] = [];
  let remaining = length;

  while (remaining--) {
    result.push(charSet[Math.floor(Math.random() * charSet.length)]);
  }
  return result.join('');
}

/**
 * Split string to array
 * @param  {String} str input string
 * @param  {String} [sep] default is ','
 */
export function split(str?: string, sep?: string) {
  const s = str || '';
  const separator = sep || ',';
  const needs: string[] = [];
  for (const item of s.split(separator)) {
    const trimmed = item.trim();
    if (trimmed.length > 0) {
      needs.push(trimmed);
    }
  }
  return needs;
}
// Keep compatibility
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

// Original source https://github.com/nodejs/node/blob/v7.5.0/lib/_http_common.js#L300
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
  // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  // 16 - 31
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  // 48 - 63
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  // 112 - 127
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
  // 128 ...
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  // ... 255
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

type Replacement = (char: string) => string;

/**
 * Replace invalid http header characters with replacement
 *
 * @param {String} val input value
 * @param {String|Function} replacement - can be `function(char)`
 */
export function replaceInvalidHttpHeaderChar(val: string, replacement: string | Replacement = ' ') {
  if (!val || typeof val !== 'string') {
    return { val, invalid: false };
  }

  let chars: string[] | undefined;
  for (let i = 0; i < val.length; ++i) {
    if (!validHdrChars[val.charCodeAt(i)]) {
      // Delay create chars
      chars = chars || val.split('');
      chars[i] = typeof replacement === 'function' ? replacement(chars[i]) : replacement;
    }
  }

  return chars
    ? { val: chars.join(''), invalid: true }
    : { val, invalid: false };
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
