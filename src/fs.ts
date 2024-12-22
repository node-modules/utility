import { Stats } from 'node:fs';
import { stat } from 'node:fs/promises';

/**
 * Check if a file exists.
 * Returns the file stats if it exists, or `false` if it doesn't.
 */
export async function exists(file: string): Promise<Stats | false> {
  try {
    return await stat(file);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
}
