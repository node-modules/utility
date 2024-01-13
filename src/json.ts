import { dirname } from 'node:path';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { readFile, mkdir, writeFile } from 'node:fs/promises';

export function strictJSONParse<T extends object = object>(content: string): T {
  const obj = JSON.parse(content) as T;
  if (!obj || typeof obj !== 'object') {
    throw new Error('JSON string is not object');
  }
  return obj;
}

export function readJSONSync<T = any>(filepath: string): T {
  return JSON.parse(readFileSync(filepath, 'utf8')) as T;
}

export interface JSONStringifyOptions {
  /**
   * A string or number that's used to insert white space (including indentation, line break characters, etc.)
   * into the output JSON string for readability purposes.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#space
   */
  space?: number | string;
  replacer?: (this: any, key: string, value: any) => any;
}

export function writeJSONSync(filepath: string, content: string | object, options: JSONStringifyOptions = {}) {
  options.space = options.space ?? 2;
  if (typeof content === 'object') {
    content = JSON.stringify(content, options.replacer, options.space) + '\n';
  }
  mkdirSync(dirname(filepath), { recursive: true });
  writeFileSync(filepath, content);
}

export async function readJSON<T = any>(filepath: string): Promise<T> {
  const content = await readFile(filepath, 'utf8');
  return JSON.parse(content) as T;
}

export async function writeJSON(filepath: string, content: string | object, options: JSONStringifyOptions = {}) {
  options.space = options.space ?? 2;
  if (typeof content === 'object') {
    content = JSON.stringify(content, options.replacer, options.space) + '\n';
  }
  await mkdir(dirname(filepath), { recursive: true });
  await writeFile(filepath, content, 'utf8');
}
