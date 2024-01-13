import { createHash, createHmac, BinaryToTextEncoding } from 'node:crypto';

type HashInput = string | Buffer | object;

/**
 * hash
 *
 * @param {String} method hash method, e.g.: 'md5', 'sha1'
 * @param {String|Buffer|Object} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
export function hash(method: string, s: HashInput, format?: BinaryToTextEncoding): string {
  const sum = createHash(method);
  const isBuffer = Buffer.isBuffer(s);
  if (!isBuffer && typeof s === 'object') {
    s = JSON.stringify(sortObject(s));
  }
  sum.update(s as string, isBuffer ? 'binary' : 'utf8');
  return sum.digest(format || 'hex');
}

/**
 * md5 hash
 *
 * @param {String|Buffer|Object} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
export function md5(s: HashInput, format?: BinaryToTextEncoding): string {
  return hash('md5', s, format);
}

/**
 * sha1 hash
 *
 * @param {String|Buffer|Object} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha1 hash string
 * @public
 */
export function sha1(s: HashInput, format?: BinaryToTextEncoding): string {
  return hash('sha1', s, format);
}

/**
 * sha256 hash
 *
 * @param {String|Buffer|Object} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha256 hash string
 * @public
 */
export function sha256(s: HashInput, format?: BinaryToTextEncoding): string {
  return hash('sha256', s, format);
}

/**
 * HMAC algorithm.
 *
 * Equal bash:
 *
 * ```bash
 * $ echo -n "$data" | openssl dgst -binary -$algorithm -hmac "$key" | openssl $encoding
 * ```
 *
 * @param {String} algorithm, dependent on the available algorithms supported by the version of OpenSSL on the platform.
 *   Examples are 'sha1', 'md5', 'sha256', 'sha512', etc.
 *   On recent releases, `openssl list-message-digest-algorithms` will display the available digest algorithms.
 * @param {String} key, the hmac key to be used.
 * @param {String|Buffer} data, content string.
 * @param {String} [encoding='base64']
 * @return {String} digest string.
 */
export function hmac(algorithm: string, key: string, data: string | Buffer, encoding?: BinaryToTextEncoding): string {
  encoding = encoding || 'base64';
  const hmac = createHmac(algorithm, key);
  hmac.update(data as string, Buffer.isBuffer(data) ? 'binary' : 'utf8');
  return hmac.digest(encoding);
}

/**
 * Base64 encode string.
 *
 * @param {String|Buffer} s
 * @param {Boolean} [urlSafe=false] Encode string s using a URL-safe alphabet,
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @return {String} base64 encode format string.
 */
export function base64encode(s: string | Buffer, urlSafe?: boolean): string {
  if (!Buffer.isBuffer(s)) {
    s = Buffer.from(s);
  }
  let encode = s.toString('base64');
  if (urlSafe) {
    encode = encode.replace(/\+/g, '-').replace(/\//g, '_');
  }
  return encode;
}

/**
 * Base64 string decode.
 *
 * @param {String} encodeStr base64 encoding string.
 * @param {Boolean} [urlSafe=false] Decode string s using a URL-safe alphabet,
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @param {encoding} [encoding=utf8] if encoding = buffer, will return Buffer instance
 * @return {String|Buffer} plain text.
 */
export function base64decode(encodeStr: string, urlSafe?: boolean, encoding?: BufferEncoding | 'buffer'): string | Buffer {
  if (urlSafe) {
    encodeStr = encodeStr.replace(/\-/g, '+').replace(/_/g, '/');
  }
  const buf = Buffer.from(encodeStr, 'base64');
  if (encoding === 'buffer') {
    return buf;
  }
  return buf.toString(encoding || 'utf8');
}

function sortObject(o: any) {
  if (!o || Array.isArray(o) || typeof o !== 'object') {
    return o;
  }
  const keys = Object.keys(o);
  keys.sort();
  const values: any[] = [];
  for (const k of keys) {
    values.push([ k, sortObject(o[k]) ]);
  }
  return values;
}