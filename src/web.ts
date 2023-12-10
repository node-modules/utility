import escapeHTML from 'escape-html';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _unescape from 'unescape';

/**
 * Escape the given string of `html`.
 *
 * @param {String} html the html need to escape
 * @return {String} escape html
 * @public
 */
export function escape(html: string): string {
  return escapeHTML(html);
}

/**
 * Unescape the given string from html
 * @public
 */
export function unescape(html: string, type?: string): string {
  return _unescape(html, type);
}

/**
 * Safe encodeURIComponent, won't throw any error.
 * If `encodeURIComponent` error happen, just return the original value.
 *
 * @param {String} text input text
 * @return {String} URL encode string.
 */
export function encodeURIComponent(text: string): string {
  try {
    return global.encodeURIComponent(text);
  } catch {
    return text;
  }
}

/**
 * Safe decodeURIComponent, won't throw any error.
 * If `decodeURIComponent` error happen, just return the original value.
 *
 * @param {String} encodeText encode text
 * @return {String} URL decode original string.
 */
export function decodeURIComponent(encodeText: string): string {
  try {
    return global.decodeURIComponent(encodeText);
  } catch {
    return encodeText;
  }
}
