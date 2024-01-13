/**
 * High performance assign before node6
 * @param {Object} target - target object
 * @param {Object | Array} objects - object assign from
 * @return {Object} - return target object
 */
export function assign(target: any, objects: any | any[]): any {
  if (!Array.isArray(objects)) {
    objects = [ objects ];
  }

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    if (obj) {
      const keys = Object.keys(obj);
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        target[key] = obj[key];
      }
    }
  }
  return target;
}

export function has(obj: object, prop: string) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Get all enumerable and ownership of property names
 * @param {Object} obj - detect object
 * @param {Boolean} [ignoreNull] - ignore null, undefined or NaN property
 * @return {Array<String>} property names
 */
export function getOwnEnumerables(obj: any, ignoreNull?: boolean): Array<string> {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return [];
  }
  return Object.keys(obj).filter(function(key) {
    if (ignoreNull) {
      const value = obj[key];
      if (value === null || value === undefined || Number.isNaN(value)) {
        return false;
      }
    }
    return has(obj, key);
  });
}

// faster way like `Object.create(null)` to get a 'clean' empty object
// https://github.com/nodejs/node/blob/master/lib/events.js#L5
// https://cnodejs.org/topic/571e0c445a26c4a841ecbcf1
function EmptyObject() {}
EmptyObject.prototype = Object.create(null);

/**
 * generate a real map object(clean object), no constructor, no __proto__
 * @param {Object} [obj] - init object, optional
 */
export function map(obj?: any): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const newObj = new EmptyObject() as Record<string, any>;
  if (!obj) {
    return newObj;
  }

  for (const key in obj) {
    newObj[key] = obj[key];
  }
  return newObj;
}
