/**
 * optimize try catch
 */
export function tryCatch<T = any>(fn: () => T) {
  const res: {
    error: Error | undefined,
    value: T | undefined,
  } = {
    error: undefined,
    value: undefined,
  };

  try {
    res.value = fn();
  } catch (err) {
    res.error = err instanceof Error
      ? err
      : new Error(err as string);
  }

  return res;
}

/**
 * @description Deal with typescript
 */
export const UNSTABLE_METHOD = {
  try: tryCatch,
};

/**
 * avoid if (a && a.b && a.b.c)
 */
export function dig(obj?: any, ...keys: string[]) {
  if (!obj) {
    return;
  }
  if (keys.length === 0) {
    return obj;
  }

  let value = obj[keys[0]];
  for (let i = 1; i < keys.length; i++) {
    if (!value) {
      break;
    }
    value = value[keys[i]];
  }

  return value;
}

/**
 * optimize arguments to array
 */
export function argumentsToArray(args: any[]) {
  const res = new Array(args.length);
  for (let i = 0; i < args.length; i++) {
    res[i] = args[i];
  }
  return res;
}
