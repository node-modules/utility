export class TimeoutError extends Error {
  timeout: number;

  constructor(timeout: number) {
    super(`Timed out after ${timeout}ms`);
    this.name = this.constructor.name;
    this.timeout = timeout;
    Error.captureStackTrace(this, this.constructor);
  }
}

// https://betterstack.com/community/guides/scaling-nodejs/nodejs-timeouts/
export async function promiseTimeout<T>(
  promiseArg: Promise<T>,
  timeout: number,
): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new TimeoutError(timeout));
    }, timeout);
  });

  try {
    return await Promise.race([ promiseArg, timeoutPromise ]);
  } finally {
    clearTimeout(timer!);
  }
}

export async function runWithTimeout<T>(
  scope: () => Promise<T>,
  timeout: number,
): Promise<T> {
  return await promiseTimeout(scope(), timeout);
}

